
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Number(Object.fromEntries(entries));
  
  //try {
    const resultsDiv = dividend / divider;

  if(dividend === '' || divider === ''){
    alert('Division not performed. Both values are required in inputs. Try again')
    throw new Error ('Invalid input');
   }

 if(!Number.isInteger(resultsDiv)){
  result.innerText = Math.floor(resultsDiv);
  return;
 }

 if(divider <= 0 || divider < 0){
  alert('Division not performed. Invalid number provided. Try again');
  throw new Error('Number is less or equal to zero');
 }

 if(isNaN(dividend) || isNaN(divider)){
  alert('Something critical went wrong. Please reload the page!')
  throw new Error('Invalid input: input entereed is not a numerical character')
 }

 result.innerText = resultsDiv;
  /**} catch (error) {
    result.innerText = error.message;

    if(error.message === 'Division not performed. Invalid number provided. Try again'){
      console.error(error, error.stack);
    }else if(error.message === 'Something critical went wrong. Please reload the page!'){
      document.body.innerHTML = `<h1>${error.message}</h1>`
    }
  }*/
  
});
