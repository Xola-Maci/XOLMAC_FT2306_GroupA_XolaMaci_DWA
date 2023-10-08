/** 
 * @type {HTMLFormElement} - HTML form element
 */
const form = document.querySelector("[data-form]");

/**
 * @type {HTMLElement} - HTML section where the results of the whole app division will be displayed
 */
const result = document.querySelector("[data-result]");

/**
 * A handler that perfoms divison
 * @typedef {Object} FormDataEntry
 * @property {string} dividend - value from dividend section in the form.
 * @property {string} divider - value from divider section the form.
 * @param {Event} event - The form submission event.
 */

try {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);
    
      const resultsDiv = dividend / divider;
      result.innerText = resultsDiv;
  
    // check if either entries are empty
    if(dividend === '' || divider === ''){
     result.innerText = "Division not perfomed. Both values are required in inputs. Try again";
     console.error(new Error('Invalid input'));
     
    }else if(isNaN(dividend) || isNaN(divider)){ //when user enters characters other than numbers in the entries
      document.body.innerHTML = "Something critical went wrong. Please reload the page";
      console.error(new Error('Invalid dividend or divider entered'));
  
    }else if(divider < 0){ // check if the divider is less than zero
      result.innerText = "Division not perfomed. Invalid number provided. Try again.";
      console.error(new Error("Invalid divider provided."))
     }else {
    // converts decimals to a single whole number
        result.innerText = Math.floor(resultsDiv);
     }
  
  });
} catch (error) {
  result.innerText = error.message;
}
