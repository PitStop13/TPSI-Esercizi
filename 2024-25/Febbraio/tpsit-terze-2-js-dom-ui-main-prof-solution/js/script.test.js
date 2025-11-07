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

describe("Tests - Fibonacci List", function() {
  it("Paragraph content", function() {
    const number_pills = document.getElementById("number-pills");
    expect(number_pills, "<p> should exist").not.to.be.null;

    const expected = "1 volte";
    expect(expected, "Should have correct text").to.be.equal(number_pills.innerText);
  });
});

describe("Tests - Tower of Pills", function() {
  it("List content", function() {
    const tower_of_pills = document.getElementById("tower-two-pills");
    expect(tower_of_pills, "<ol> should exist").not.to.be.null;

    const { children } = tower_of_pills;
    const expected_pills = ["○○", "○○○○", "○○○○○○○○○○○○○○○○"];
    expect(expected_pills.length, "Should have 3 elements").to.be.equal(children.length);

    for (let i = 0; i < children.length; i++) {
      expect(expected_pills[i], `Element ${i + 1} should have correct content`).to.be.equal(children[i].innerText);
    }
  });
});