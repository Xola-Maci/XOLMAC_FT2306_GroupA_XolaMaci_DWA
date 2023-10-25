// Exercise 1 - Using 'forEach' to log names

const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

names.forEach(name => {
  console.log(name);
});

//Exercise 2 -  Using forEach to log names with matching provinces

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];

names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

//Exercise 3 - Using `map` to convert province names to uppercase

const provincesUpperCase = provinces.map(province => province.toUpperCase());
console.log(provincesUpperCase);

//Exercise 4 - Using `map` to create an array with character counts in names

const characterCounts = names.map(name => name.length);
console.log(characterCounts); 

//Exercise 5: Using `sort` to sort provinces alphabetically

const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Exercise 6 - Using `filter` to remove provinces with "Cape" and counting

const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
console.log(filteredProvinces.length); 

//Exercise 7: Using `map` and `some` to create a boolean array

const hasSCharacter = names.map(name => name.split('').some(char => char.toLowerCase() === 's'));
console.log(hasSCharacter);

//Exercise 8: Using `reduce` to create an object with name-province pairs

const nameProvinceObject = names.reduce((result, name, index) => {
    result[name] = provinces[index];
    return result;
  }, {});
  console.log(nameProvinceObject);

/*ADDITIONAL EXERCISES*/

//Exercise 9: Using `forEach` to log product names

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  products.forEach(product => {
    console.log(product.product);
  });

//Exercise 10: Using `filter` to filter out products with names longer than 5 characters

const filteredProducts = products.filter(product => product.product.length <= 5);
console.log(filteredProducts);

//Exercise 11: Using `filter`, `map`, and `reduce` to manipulate and calculate prices

const totalPrice = products
  .filter(product => product.price !== '' && !isNaN(product.price))
  .map(product => Number(product.price))
  .reduce((acc, price) => acc + price, 0);

console.log(totalPrice);

//Exercise 12: Using `reduce` to concatenate product names

const concatenatedNames = products.reduce((result, product) => {
    if (result === '') return product.product;
    return result + ', ' + product.product;
  }, '');
  
  console.log(concatenatedNames);

//Exercise 13: Using `reduce` to find the highest and lowest priced items

const { highest, lowest, highestName, lowestName } = products.reduce((acc, product) => {
    const price = Number(product.price);
    if (price > acc.highest) {
      acc.highest = price;
      acc.highestName = product.product;
    }
    if (price < acc.lowest) {
      acc.lowest = price;
      acc.lowestName = product.product;
    }
    return acc;
  }, { highest: -Infinity, lowest: Infinity });
  
  console.log(`Highest: ${highestName}. Lowest: ${lowestName}`);

//Exercise 14: Using `Object.entries` and `reduce` to modify object keys

const modifiedProducts = products.map(product => {
    const modifiedProduct = Object.entries(product).reduce((acc, [key, value]) => {
      if (key === 'product') {
        acc['name'] = value;
      } else if (key === 'price') {
        acc['cost'] = value;
      }
      return acc;
    }, {});
    return modifiedProduct;
  });
  
  console.log(modifiedProducts);
  