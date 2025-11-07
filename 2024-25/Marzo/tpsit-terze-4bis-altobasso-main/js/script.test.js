/**
 * @author Luca Giusiano <luca.giusiano@vallauri.edu>
 * THIS FILE CANNOT BE TOUCHED, IT CONTAINS THE TESTS MADE BY
 * THE PROFESSOR.
 */

// Mock chai expect function for code readibility.
mocha.setup("bdd");
mocha.checkLeaks();

const expect = chai.expect;

window.addEventListener("load", function() {
  const testButton = document.getElementById("btn-tests-executor");
  testButton.addEventListener("click", function() {
    if (confirm("Attenzione! Lanciando i test perderai il tentativo corrente")) {
      mocha.run();
    }
  });
});

/** 
 * simulateClickSequence simulates a sequence of clicks.
 */
async function simulateClickSequence(...buttons) {
  for (const button of buttons) {
    await simulateClick(button);
  }
}

/** 
 * simulateClick simulates a click event.
 * @param {HTMLElement} element the element to send the fake click to.
 * @returns {Promise<void>} The promise when the event is sent and fulfilled.
 */
function simulateClick(element) {
  return new Promise((resolve) => {
    const fakeClick = new Event("click");
    element.dispatchEvent(fakeClick);
    setTimeout(resolve, 5);
  });
}

/** 
 * testBeforeGeneration tests if the page is correctly
 * formatted before the generation of the secret number
*/
function testBeforeGeneration() {
  return async function() {
    const txtNumber = document.getElementById("txt-number");
    expect(txtNumber.disabled, "Textbox txt-number not disabled").to.be.true;

    const btnPlay = document.getElementById("btn-play");
    expect(btnPlay.disabled, "Button btn-play not disabled").to.be.true;
  };
}

/** 
 * testGenerateNumber tests if the generation of the secret number is correct.
 */
function testGenerateNumber() {
  return async function() {
    const btnGenerate = document.getElementById("btn-generate");
    await simulateClick(btnGenerate);

    const secretNumber = parseInt(document.getElementById("txt-secret-number").value);

    expect(secretNumber, "Secret number not valid").to.be.finite;
    expect(secretNumber, "Expected secret number be between 1 and 100").to.be.within(1, 100);
  };
}

/** 
 * testAfterGeneration tests if the page is correctly
 * formatted after the generation of the secret number
*/
function testAfterGeneration() {
  return async function() {
    const txtNumber = document.getElementById("txt-number");
    expect(txtNumber.disabled, "Textbox txt-number disabled").to.be.false;
    expect(txtNumber.value, "Textbox txt-number not empty").to.be.equal("");

    const btnPlay = document.getElementById("btn-play");
    expect(btnPlay.disabled, "Button btn-play disabled").to.be.false;

    const pResult = document.getElementById("p-result");
    expect(pResult.innerText, "Paragraph p-result not empty").to.be.equal("");
  };
}

/** 
 * testAttemptsGeneration tests if the number of attempts is 
 * correct after the generation of the secret number
*/
function testAttemptsGeneration() {
  return async function() {
    const pAttempts = document.getElementById("p-attempts");
    const attempts = parseInt(pAttempts.innerText.split(":")[1].trim());

    expect(attempts, "Expect number of attempts be equal to 10").to.be.equal(10);
  };
}

/**
 * testErrorsGame() tests all the possible input errors
 */
function testErrorsGame(value, expectedMessage) {
  return async function() {
    const txtNumber = document.getElementById("txt-number");
    const pAttempts = document.getElementById("p-attempts");

    const oldAttempts = parseInt(pAttempts.innerText.split(":")[1].trim());

    txtNumber.value = value;

    const btnPlay = document.getElementById("btn-play");
    await simulateClick(btnPlay);

    const pResult = document.getElementById("p-result");
    expect(pResult.innerText, "Content of paragraph p-result not correct").to.be.equal(expectedMessage);

    const actualAttempts = parseInt(pAttempts.innerText.split(":")[1].trim());
    expect(oldAttempts, "Number of attempts remaining should not change").to.be.equal(actualAttempts);
  };
}

/**
 * testGameWithFixedSecret() tests the game trying cases contained in the parameter
 * attemptTestCases with a secret number passed as a parameter. Tests also if the
 * textbox txt-number and the button btn-play are disabled.
 */
function testGameWithFixedSecret(fixedSecret, attemptTestCases, isFinishedGame = true) {
  if (fixedSecret < 1 || fixedSecret > 100) {
    throw new Error("Invalid fixed secret provided: a value between 1 and 100");
  }

  if (attemptTestCases.length > 10) {
    throw new Error("Invalid attempts length: expecting max 10 attemps in the array");
  }

  return async function() {
    const txtSecretNumber = document.getElementById("txt-secret-number");
    const txtNumber = document.getElementById("txt-number");
    const pResult = document.getElementById("p-result");
    const pAttempts = document.getElementById("p-attempts");
    const btnPlay = document.getElementById("btn-play");
    let attempts = 10;

    const oldSecretValue = txtSecretNumber.value;

    // mock secret
    txtSecretNumber.value = fixedSecret;

    for (const [numberTried, expectedMessage] of attemptTestCases) {
      txtNumber.value = numberTried;

      await simulateClick(btnPlay);
      attempts--;

      expect(pResult.innerText).to.be.equal(expectedMessage);
      expect(pAttempts.innerText).to.be.equal(`Tentativi rimasti: ${attempts}`);
    }

    if (isFinishedGame) {
      const txtNumber = document.getElementById("txt-number");
      expect(txtNumber.disabled, "Textbox txt-number not disabled").to.be.true;

      const btnPlay = document.getElementById("btn-play");
      expect(btnPlay.disabled, "Button btn-play not disabled").to.be.true;
    }

    // restore initial situation
    pAttempts.value = "10";
    txtNumber.value = "";
    pResult.innerText = "";

    txtSecretNumber.value = oldSecretValue;

    // we simulate a click on the reset button to reset the attempts
    const btnGenerate = document.getElementById("btn-generate");
    await simulateClick(btnGenerate);
  }
}

describe("Generation", function() {
  it("Page format before generation", testBeforeGeneration());
  it("Number generation", testGenerateNumber());
  it("Correct number of attempts after number generation", testAttemptsGeneration());
  it("Page format after generation", testAfterGeneration());
});

describe("Not correct inputs", function() {
  it("Input empty string", testErrorsGame("", "Inserisci un numero"));
  it("Input string with only white spaces", testErrorsGame("    ", "Inserisci un numero"));
  it("Input string Nan", testErrorsGame(" ciao ", "Inserisci un numero"));
  it("Input number not between 1 and 100 - 1", testErrorsGame("101", "Inserisci un numero compreso fra 1 e 100"));
  it("Input number not between 1 and 100 - 2", testErrorsGame("0", "Inserisci un numero compreso fra 1 e 100"));
  it("Input number not between 1 and 100 - 3", testErrorsGame("-50", "Inserisci un numero compreso fra 1 e 100"));
  it("Input number not between 1 and 100 - 4", testErrorsGame("-1", "Inserisci un numero compreso fra 1 e 100"));
});

describe("Test Plays", function() {
  it("Test game - 1", testGameWithFixedSecret(100, [
    [10, "Basso"],
    [1, "Basso"],
    [100, "Numero indovinato in 3 tentativi!"],
  ]));
  it("Test game - 2", testGameWithFixedSecret(50, [
    [10, "Basso"],
    [1, "Basso"],
    [100, "Alto"],
    [49, "Basso"],
    [50, "Numero indovinato in 5 tentativi!"]
  ]));
  it("Test game - 3", testGameWithFixedSecret(37, [
    [100, "Alto"],
    [1, "Basso"],
    [100, "Alto"],
    [50, "Alto"],
    [25, "Basso"],
    [30, "Basso"],
    [35, "Basso"],
    [40, "Alto"],
    [37, "Numero indovinato in 9 tentativi!"],
  ]));
  it("Test game - 4", testGameWithFixedSecret(11, [
    [100, "Alto"],
    [1, "Basso"],
    [99, "Alto"],
    [50, "Alto"],
    [25, "Alto"],
    [13, "Alto"],
    [7, "Basso"],
    [12, "Alto"],
    [6, "Basso"],
    [11, "Numero indovinato in 10 tentativi!"],
  ]));
  it("Test game - 5", testGameWithFixedSecret(11, [
    [100, "Alto"],
    [1, "Basso"],
    [99, "Alto"],
    [50, "Alto"],
    [25, "Alto"],
    [13, "Alto"],
    [7, "Basso"],
    [12, "Alto"],
    [6, "Basso"],
    [22, "Hai perso!"],
  ]));
  it("Test game - 6 (non terminal)", testGameWithFixedSecret(11, [
    [100, "Alto"],
    [1, "Basso"],
    [99, "Alto"],
    [50, "Alto"]
  ], false));
});