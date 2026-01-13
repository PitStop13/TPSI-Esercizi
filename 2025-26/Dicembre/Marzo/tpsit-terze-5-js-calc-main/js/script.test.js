/**
 * @author Alessandro Sanino <alessandro.sanino@vallauri.edu>
 * THIS FILE CANNOT BE TOUCHED, IT CONTAINS THE TESTS MADE BY
 * THE PROFESSOR.
 */

// Mock chai expect function for code readibility.
mocha.setup("bdd");
mocha.checkLeaks();

const expect = chai.expect;

window.addEventListener("load", function() {
  const test_button = document.getElementById("tests-executor-btn");
  test_button.addEventListener("click", function() {
    mocha.run();
  });
});

const operations = Object.freeze(["+", "-", "*", "/"]);
const numbers = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

function testOperation(operation, first, second, result) {
  return async function() {
    const txt_display = document.querySelector("#txt-display");
    const first_button = Array.from(document.querySelectorAll(".number")).find(btn => btn.innerText === first.toString());
    const second_button = Array.from(document.querySelectorAll(".number")).find(btn => btn.innerText === second.toString());
    const operation_button = Array.from(document.querySelectorAll(".operation")).find(btn => btn.innerText === operation.toString());
    const result_button = Array.from(document.querySelectorAll(".operation")).find(btn => btn.innerText === "=");
    const cancel_button = Array.from(document.querySelectorAll(".operation")).find(btn => btn.innerText === "C");

    expect(txt_display, "Should be able to get txt display").not.to.be.null;
    expect(first_button, "Should be able to get first button").not.to.be.null;
    expect(second_button, "Should be able to get second button").not.to.be.null;
    expect(operation_button, "Should be able to get operation button").not.to.be.null;
    expect(result_button, "Should be able to get result button").not.to.be.null;
    expect(cancel_button, "Should be able to get cancel button").not.to.be.null;

    await simulateClickSequence(first_button, operation_button, second_button, result_button);

    expect(txt_display.value, `${first} ${operation} ${second} should be = ${result}`).to.be.equal(result.toString());

    await simulateClick(cancel_button);
  }
}

function testAdd(first, second) {
  return testOperation("+", first, second, first + second);
}

function testSubstract(first, second) {
  return testOperation("-", first, second, first - second);
}

function testMultiply(first, second) {
  return testOperation("*", first, second, first * second);
}

function testDivide(first, second) {
  return testOperation("/", first, second, first / second);
}

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
    const fake_click = new Event("click");
    element.dispatchEvent(fake_click);
    setTimeout(resolve, 5);
  });
}

describe("Test Addition", function() {
  it("2 + 2 = 4", testAdd(2, 2));
  it("1 + 3 = 4", testAdd(1, 3));
  it("2 + 5 = 7", testAdd(2, 5));
  it("1 + 2 = 3", testAdd(1, 2));
  it("9 + 9 = 18", testAdd(9, 9));
});

describe("Test Substraction", function() {
  it("2 - 2 = 0", testSubstract(2, 2));
  it("1 - 3 = -2", testSubstract(1, 3));
  it("2 - 5 = -3", testSubstract(2, 5));
  it("1 - 2 = -1", testSubstract(1, 2));
  it("9 - 8 = 1", testSubstract(9, 8));
});

describe("Test Multiply", function() {
  it("2 * 2 = 4", testMultiply(2, 2));
  it("1 * 3 = 3", testMultiply(1, 3));
  it("2 * 5 = 10", testMultiply(2, 5));
  it("1 * 2 = 2", testMultiply(1, 2));
  it("9 * 9 = 81", testMultiply(9, 9));
});

describe("Test Division", function() {
  it("2 / 2 = 1", testDivide(2, 2));
  it("1 / 3 = 0.3333", testDivide(1, 3));
  it("2 / 5 = 0.4", testDivide(2, 5));
  it("1 / 2 = 0.5", testDivide(1, 2));
  it("9 / 9 = 1", testDivide(9, 9));
});
