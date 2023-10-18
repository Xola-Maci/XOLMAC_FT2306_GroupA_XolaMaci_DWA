/**
 * displays maximum count number
 * displays minimum counting number
 * Step amount is the number the tally counts in and in this case its one
 * @type {number} MAX_NUMBER
 */
const MAX_NUMBER = 10
const MIN_NUMBER = 0
const STEP_AMOUNT = 1

/**
 * @type {HTMLInputElement} - element where the count input goes in
 * @type {HTMLButtonElement} - button for subtracting
 * @type {HTMLButtonElement} - button for adding the counter
 * @type {HTMLButtonElement} - button for resetting
 * @type {HTMLElement} - the popup element
 */

const number = document.querySelector('[data-key="number"]')
const subtract = document.querySelector('[data-key="subtract"]')
const add = document.querySelector('[data-key="add"]')
const reset = document.querySelector('[data-key="reset"]')
const popup = document.getElementById('popup');

/**
 * Handler for handling the subtraction button
 * @typedef {object} subtractHandler
 */

const subtractHandler = () => {
    const newValue = parseInt(number.value) - 1
  number.value = newValue

  if(add.disabled === true){
    add.disabled = false
}

  if(newValue <= MIN_NUMBER){
    subtract.disabled = true
}
}

/**
 * Handler for handling the addition button
 * @typedef {object} addHandler
 */
const addHandler = () => {
const newValue = parseInt(number.value) + 1
number.value = newValue

if(subtract.disabled === true){
    subtract.disabled = false
}

if(newValue >= MAX_NUMBER){
    add.disabled = true
}

}

/**
 * Handler for handling the reset button
 * @typedef {object} resetHandler
 */
const resetHandler = () => {
  number.value = '0';
  subtract.disabled = false;
  add.disabled = false;
  displayPopup();
};

/**
 * Handler for displaying the popup
 * @typedef {object} showPopup
 */
const showPopup = () => {
  popup.style.display = 'block';

  setTimeout(() => {
      hidePopup();
  }, 5000);
};

/**
 * Handler for closing the popup
 * @typedef {object} closePopup
 */
const closePopup = () => {
  popup.style.display = 'none';
};

subtract.addEventListener('click', subtractHandler)
add.addEventListener('click', addHandler)
reset.addEventListener('click',resetHandler)