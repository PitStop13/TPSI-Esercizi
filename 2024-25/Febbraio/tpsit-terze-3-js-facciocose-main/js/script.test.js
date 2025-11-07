/**
 * @author Alessandro Sanino <alessandro.sanino@vallauri.edu>
 * THIS FILE CANNOT BE TOUCHED, IT CONTAINS THE TESTS MADE BY
 * THE PROFESSOR.
 */

// Mock chai expect function for code readibility.
mocha.setup("bdd");
mocha.checkLeaks();
mocha.cleanReferencesAfterRun(false);

const expect = chai.expect;

window.addEventListener("load", function() {
  const test_button = document.getElementById("tests-executor-btn");
  test_button.addEventListener("click", function() {
    mocha.run();
  });
});

describe("Adding a new todo", function() {
  it("Should add a new todo from button click", function(done) {
    const btn_add_todo = document.getElementById("btn-add-todo");
    const text_input = document.getElementById("new-todo");
    const todo_list = document.getElementById("todo-list");

    const todo_list_elements = todo_list.children.length;
    const expected_item_value = text_input.value = "test";

    const fake_click = new Event("click");
    btn_add_todo.dispatchEvent(fake_click);

    setTimeout(function() {
      try {
        text_input.value = "";
        
        const todo_list_after = document.getElementById("todo-list");
        const actual_child_elements = todo_list_after.children;

        expect(actual_child_elements.length, "Expect to have one more element").to.be.equal(todo_list_elements + 1);

        const last_child = actual_child_elements[actual_child_elements.length - 1];
        expect(last_child.tagName, "Expect element to be <li>").to.be.equal("LI");
        expect(last_child.innerHTML, "Expect to have correct content").to.be.equal(expected_item_value);

        done();
      } catch (error) {
        done(error);
      }
    }, 200);
  });
});

describe("Reset todo list", function() {
  it("Should reset todo list from button click", function(done) {
    const btn_reset_list = document.getElementById("btn-reset-todo-list");
    const todo_list = document.getElementById("todo-list");

    const fake_click = new Event("click");
    btn_reset_list.dispatchEvent(fake_click);

    setTimeout(function() {
      try {        
        const todo_list_after = document.getElementById("todo-list");
        expect(todo_list_after.innerHTML, "Expect list to be empty").to.be.equal("");

        done();
      } catch (error) {
        done(error);
      }
    }, 200);
  });
});