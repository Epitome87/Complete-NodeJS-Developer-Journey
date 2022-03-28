const name = 'Andrew';
const userAge = 27;

const user = {
  name: name,
  age: userAge,
  location: 'Redlands',
};

// Object property shorthand -- property comes from a variable with the same name ('name', in this case)
const anotherUser = {
  name,
  age: userAge,
  location: 'Riverside',
};

console.log(user);
console.log(anotherUser);

// Object destructuring
const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// No! With ES6 we can shorten this!
// const label = product.label;
// const stock = product.stock;
// const price = product.price;

// So much shorter; heck yeah!
const { label, price, stock } = product;
console.log(label, price, stock);

// Can rename the variable, too!
// Useful if a variable name is already taken but we want to destructure
const { label: productLabel } = product;
console.log(productLabel);

// Useful for setting up default values, too!
// There is no rating property on product, so we set it up with an initial value, rather than undefined!
// Obviously default value is not used if a value already exists on the object
const { rating = 5 } = product;
console.log(rating);

// const transaction = (type, myProduct) => {
//   const { label, price } = myProduct;
//   console.log(label, price);
//
// };

// transaction('order', product);

// OR, we can destructure myProduct in the argument list itself
// const transaction = (type, { label, price }) => {
//   console.log(label, price);
// };

// transaction('order', product);

// We can also use the spread operator!
const transaction = (type, { label, price, ...theRest }) => {
  console.log('Label', label);
  console.log('Price', price);

  // The rest contains stock: 201 and salesPrice: undefined!
  console.log('The Rest', theRest);
};

transaction('order', product);
