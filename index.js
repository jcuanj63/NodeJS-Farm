// NODEJS
// MANIPULATING FILES IN LOCAL COMPUTER

const fs = require('fs');
const http = require('http');
const url = require('url');

// ************************************************************
// READ/WRITE FILE - SYNCHRONOUS BLOCKING WAY (Dont have Call back)
// ************************************************************
// READ FILE input.txt
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about avocados: ${textIn}. \n Created on ${Date.now()}`;
console.log(textOut);

// WRITE FILE output.txt
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written');

// *********************************************************************
// Read file data.json and execute a callback function Asyncronous
// *********************************************************************
fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
  // Detructuring data array
  // const [a, b, c, d, e, f] = JSON.parse(data);
  const dataObj = JSON.parse(data);

  // console.log(`dataObj: ${data}`);

  // console.log(dataObj[4]);
  console.log(dataObj);
});

// ************************************************************
// READ/WRITE A FILE - ASYNCHRONOUS NON-BLOCKING WAY
// ************************************************************
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('ERROR');

  console.log(`data1 ${data1}`);
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(`data2 ${data2}`);
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(`data3 ${data3}`);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('Your file has been written ');
      });
    });
  });
});

console.log('Reading data');
