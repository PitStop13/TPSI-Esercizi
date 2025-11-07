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
 * throwOnScriptInjection detects if a script tag is inserted inside an element and
 * throws an error, failing automatically the test if necessary.
 * @param {HTMLElement} element The element to test for injection.
 */
function throwOnScriptInjection(element) {
  if (element.innerHTML.includes("script"))
    throw new Error("<script> injection detected");
}

describe(`paragraphWithEvenRows(table_id, column, new_paragraph_id)`, function() {
  it(`paragraphWithEvenRows("example-table", "Studente", "test-1")`, function() {
    paragraphWithEvenRows("example-table", "Studente", "test-1");

    const expected = "Gianluca Giaccardi<br>Giorno Giovanna<br>Giacomo Poretti<br>";
    const created_paragraph = document.getElementById("test-1");

    expect(created_paragraph, "Expecting to have created the element").to.be.not.null;
    expect(throwOnScriptInjection(created_paragraph), "Should not have script tags inside").to.not.throw;
    expect(created_paragraph.innerHTML, "Content in the paragraph is different than expected").to.equal(expected);
  });
});

describe(`createTextInput(input_id)`, function() {
  it(`createTextInput("test-input-1")`, function() {
    const test_input = "test-input-1";

    createTextInput(test_input);

    const created_input = document.getElementById(test_input);

    expect(created_input, "Expecting to have created the element").to.be.not.null;
    expect(created_input.tagName, "should be an input tag").to.equal("INPUT");
    expect(created_input.getAttribute("type"), "should be an input tag").to.equal("text");
  });
});

describe(`createCustomizableButton(input_id, button_id)`, function() {
  it(`createCustomizableButton("test-input-1", "test-button-1")`, function() {
    const test_input = "test-input-1";
    const test_button = "test-button-1";

    const source_input = document.getElementById(test_input);
    source_input.value = "testing";

    createCustomizableButton(test_input, test_button);

    const created_button = document.getElementById(test_button);

    expect(created_button, "Expecting to have created the element").to.be.not.null;
    expect(created_button.tagName, "should be a button tag").to.equal("BUTTON");
    expect(source_input.value, "should have correct value").to.equal(created_button.innerText);
  });
});

describe(`createTable(table_id, columns, rows)`, function() {
  it(`createTable("new-table", ["example-1", "example-2"], [[1, 2], [3, 4]])`, function() {
    const table_id = "new-table";
    const columns = ["example-1", "example-2"];
    const rows = [[1, 2], [3, 4]];

    createTable(table_id, columns, rows);

    const created_table = document.getElementById(table_id);
    console.log(created_table.querySelectorAll("th"))
    expect(created_table, "Expecting to have created the element").to.be.not.null;

    const actual_column_headers = [...created_table.querySelectorAll("th")].map(th => th.innerText);
    expect(columns, "Should have inserted the column headers").to.eql(actual_column_headers);

    const actual_rows = [...created_table.querySelectorAll("tr")].slice(1).map(tr => {
      return [...tr.querySelectorAll("td")].map(td => td.innerText);
    });
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        expect(rows[i][j], `Wrong value at position row=${i + 1} column=${j + 1}`).to.eql(parseInt(actual_rows[i][j]))
      }
    }
  });
});
