/**
 * towerOfTwo returns the N-th elements of the tower of two series.
 * @note Courtesy of the professor to better do the excercises!
 * @param {number} n The N used to stop and return
 * @returns {number} The N-th elements of the fibonacci series
 */
function towerOfTwo(n) {
  let risultato = 1;
  if (n > 0) {
    risultato = 2;
    for(let i = 1; i < n; i++)
    {
      risultato = Math.pow(risultato, 2);
    }
  }

  return risultato;
}

/**
 * repeatCharacter repeats the specified character N times. Returns
 * generated string.
 * example:
 * repeatCharacter("○", 4) = "○○○○"
 * @param {String} character The character to repeat.
 * @param {number} n The number of repetitions. 
 * @returns {String} The string made of n times of character.
 */
function repeatCharacter(character, n) {
  let characters = character.repeat(n);
  return characters;
}

/**
 * countPills counts the number of pills of a particular string.
 * examples:
 * countPills("○○○○") = 4
 * countPills("") = 0
 * countPills("A good pill: ○") = 1
 * @param {HTMLElement} element The HTML element to inspect.
 * @returns The number of "○" characters in that element.
 */
function countPills(element) {
  let number = 0;
  for(let i = 0; i < element.length; i++)
    {
      if(element.indexOf('○', [i]))
      {
        number++;
      }
    }
    return number;
}

/**
 * towerOfPills creates a series of <li> elements with content from
 * towerOfTwo function, in pills ("○"). 
 * @param {String} list_id The ID of the list to attach the elements to.
 * @param {number} n The number of <li> generated.
 */
function towerOfPills(list_id, n) {
  let temp = "";
  for(let i = 1; i <= n; i++)
  {
    let risultato = towerOfTwo(i);
    let pills = repeatCharacter('○', risultato);
    temp += "<li>" + pills + "</li>";
  }
  const list = document.getElementById(list_id);
  list.innerHTML = temp;
}

// other code run on page load

// const fibo_list = ???
// const pills = countPills(element);
// fibo_list.??? = pills + ???

// towerOfPills("????", 3);