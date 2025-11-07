/**
 * towerOfTwo returns the N-th elements of the tower of two series.
 * @note Courtesy of the professor to better do the excercises!
 * @param {number} n The N used to stop and return
 * @returns {number} The N-th elements of the fibonacci series
 */
function towerOfTwo(n) {
  if (n <= 0) {
    return 1;
  }

  let result = 2;

  while (n > 1) {
    result = result * result;

    n--;
  }

  return result;
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
  let s = "";
  for(let i = 0; i < n; i++)
  {
    s += character;
  }
  return s;
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
function countPills(element) {//element è già un elemnto HTML, quindi non serve il document.getElementBy
  let s = element.innerText;//prendo il contenuto di element
  let cont = 0;
  for(let i = 0; i < s.length; i++)
  {
    if(s[i] == "○")
    {
      cont++;
    }
  }
  return cont;
}

/**
 * towerOfPills creates a series of <li> elements with content from
 * towerOfTwo function, in pills ("○"). 
 * @param {String} list_id The ID of the list to attach the elements to.
 * @param {number} n The number of <li> generated.
 */
function towerOfPills(list_id, n) {
  //recupero oggetto con id = list_id
  const list = document.getElementById(list_id);

  let s = "";
  for(let i = 1; i <= n; i++)
  {
    const pills_string = repeatCharacter("○", towerOfTwo(i));

    //Cero l'elemnto <li> da aggiungere
    s+= "<li>" + pills_string + "</li>";
  }
  list.innerHTML = s;
}

// other code run on page load

// const fibo_list = ???
// const pills = countPills(element);
// fibo_list.??? = pills + ???

// towerOfPills("????", 3);

//Recupero il terzo elemento della lista fibonacci
const third_element = document.getElementById("third-element");

//Conto quante pillole ci sono nel terzo elemento
const n_pills = countPills(third_element);

//Recupero il paragrafo da modificare e ne modifico il contenuto
const number_pills = document.getElementById("number-pills");
number_pills.innerText = n_pills + " volte";
//number_pills.innerText = countPills(third_element); + " volte";

//genero la torre di pillole
towerOfPills("tower-two-pills", 3);