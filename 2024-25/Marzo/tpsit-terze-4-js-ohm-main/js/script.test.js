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

/** 
 * testResistance is a generic resistance test.
 */
function testResistance(result_text, band_indexes) {
  return async function() {
    const bands = [1, 2, 3, 4, 5].map(n => document.getElementById(`band-${n}`));

    expect(band_indexes.length, "Should have put correct number of indexes in test").to.be.equal(bands.length);

    for (let i = 0; i < bands.length; i++) {
      expect(bands[i], `Should be able to get band-${i}`).not.to.be.null;
    }

    for (let i = 0; i < band_indexes.length; i++) {
      bands[i].selectedIndex = band_indexes[i];
    }

    const calculate_button = document.getElementById("calculate-button");
    await simulateClick(calculate_button);

    const result_text_p = document.getElementById("result-text");
    expect(result_text_p.innerText, "Should have correct text").to.be.equal(result_text);

    result_text_p.innerText = "";
  };
}

describe("Resistance tests", function() {
  it("brown, black, black, brown, brown = 1000 ohm + 1%", testResistance("1000 ohm - Tolleranza 1%", [1, 0, 0, 1, 0]));
  it("brown, black, black, brown, red = 1000 ohm + 2%", testResistance("1000 ohm - Tolleranza 2%", [1, 0, 0, 1, 1]));
  it("brown, black, black, brown, green = 1000 ohm + 0.5%", testResistance("1000 ohm - Tolleranza 0.5%", [1, 0, 0, 1, 2]));
  it("brown, black, black, brown, blue = 1000 ohm + 0.25%", testResistance("1000 ohm - Tolleranza 0.25%", [1, 0, 0, 1, 3]));
  it("red, brown, blue, brown, silver = 2160 ohm - 10%", testResistance("2160 ohm - Tolleranza 10%", [2, 1, 6, 1, 6]));
  it("brown, brown, brown, brown, blue = 1110 ohm - 0.25%", testResistance("1110 ohm - Tolleranza 0.25%", [1, 1, 1, 1, 3]));
  it("red, red, red, red, gold = 22200 ohm - 5%", testResistance("22200 ohm - Tolleranza 5%", [2, 2, 2, 2, 7]));
  it("brown, red, orange, yellow, gray = 1230000 ohm - 0.05%", testResistance("1230000 ohm - Tolleranza 0.05%", [1, 2, 3, 4, 5]));
  it("yellow, yellow, yellow, yellow, purple = 4440000 ohm - 0.1%", testResistance("4440000 ohm - Tolleranza 0.1%", [4, 4, 4, 4, 4]));
  it("green, green, green, green, gray = 55500000 ohm - 0.05%", testResistance("55500000 ohm - Tolleranza 0.05%", [5, 5, 5, 5, 5]));
  it("blue, blue, blue, blue, silver = 666000000 ohm - 10%", testResistance("666000000 ohm - Tolleranza 10%", [6, 6, 6, 6, 6]));
  it("orange, brown, purple, orange, blue = 317000 ohm - 0.25%", testResistance("317000 ohm - Tolleranza 0.25%", [3, 1, 7, 3, 3]));
  it("red, red, black, green, brown = 22000000 ohm - 1%", testResistance("22000000 ohm - Tolleranza 1%", [2, 2, 0, 5, 0]));
  it("blue, red, brown, black, brown = 621 ohm - 1%", testResistance("621 ohm - Tolleranza 1%", [6, 2, 1, 0, 0]));
  it("brown, red, brown, brown, green = 1210 ohm - 0.5%", testResistance("1210 ohm - Tolleranza 0.5%", [1, 2, 1, 1, 2]));
})