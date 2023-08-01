// NODEJS SERVER API WITH ROUTES (OLD WAY)
const { lookupService } = require('dns/promises');
const fs = require('fs');
const http = require('http');
const url = require('url');

// Function to Fill out the corresponding template (cards.html,
// product.html, etc) and replace the placeholders.
// /g (Global) means it will replace all occurrences of the
// placeholders and not just the first one.
// We created a new "output" variable because its not a good practice to
// directly manipulate and change the value of the arguments that we
// pass into a function
const replaceTemplate = (template, product) => {
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

// ********************************************************
// READ HTML TEMPLATES and DATA.JSON FILE AND PARSE IT
// ********************************************************
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

// DATA.JSON - String ARRAY of all the products and their detail info
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

// Converts data (type string) into an array of objects
const dataObj = JSON.parse(data);

// ********************************************************
// CREATE SERVER
// ********************************************************
const server = http.createServer((req, res) => {
  // REQ.URL contains the current path in your browser.
  // URL.PARSE gives us access to REQ.URL properties, like
  // query, pathname, etc.
  // TRUE parses the query property into an object
  console.log(url.parse(req.url, true));

  // Create the query and pathname variables by Destructuring
  // the REQ.URL object properties with the same name.
  const { query, pathname } = url.parse(req.url, true);

  // ********************************************************
  // ROUTES
  // ********************************************************
  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // MAP-Loop to fill out the CARDS HTML TEMPLATE
    // We are looping over dataObj array with 5 elements
    // For each element we will return something and it
    // will be put into the same position in cardsHtml array
    // .join('') - We use it because cardsHtml is an array, and
    // we dont want an array, we want one big STRING containig
    // all of the HTML. Wii join all elements intoa string.
    const cardsHtml = dataObj
      .map(element => replaceTemplate(tempCard, element))
      .join('');

    // Replace the PRODUCT_CARDS placeholder with the cardsHtml we created
    const newOutput = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    // Send HTML to screen
    res.end(newOutput);

    // ********************************************************
    // PRODUCT PAGE
    // ********************************************************
  } else if (pathname === '/product') {
    console.log(`QUERY:`, query);

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // dataObj[query.id] array element contains the product id we want
    // id: '0'- Avocado, id: '1'- Cheese, etc
    const product = dataObj[query.id];

    // Call function to fill out placeholders for values
    const newOutput = replaceTemplate(tempProduct, product);

    // Send HTML to screen
    res.end(newOutput);

    // *************************************************
    // API
    // *************************************************
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      // 'Content-Type': 'text/plain',
      'my-own-header': 'Hello World',
    });
    res.end('<h1>Page not Found</h1>');
  }
});

// ********************************************************
server.listen(3000, () => console.log('Listening on port 3000'));
