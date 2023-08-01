// Function to Fill out the corresponding template (cards.html,
// product.html, etc) and replace the placeholders.
// /g (Global) means it will replace all occurrences of the
// placeholders and not just the first one.
// We created a new "output" variable because its not a good practice to
// directly manipulate and change the value of the arguments that we
// pass into a function

module.exports = (template, product) => {
  let output = template;
  output = output.replace('{%PRODUCTNAME%}', product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  // organic is missing above because organic is boolean
  // not-organic is a class name
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};
