/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const fs = require('fs');


const tmp = fs.readFileSync('./info/cmp.csv', 'utf-8')
    .split('\n')
    .map((el)=> el.replace(/"/g, '')
        .split(','))
    .map((el)=>el.slice(0, 2).reverse());
const stockObj = new Map(tmp);
// return stockObj;
module.exports = {stockObj};
