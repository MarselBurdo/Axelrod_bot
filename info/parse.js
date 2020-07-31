/* eslint-disable no-new-object */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const fs = require('fs');


const tmp = fs.readFileSync('./info/cmp.csv', 'utf-8')
    .toLowerCase()
    .split('\n')
    .map((el)=> el.replace(/"/g, '')
        .split(','))
    .map((el)=>el.slice(0, 2).reverse())
const last= tmp.pop()
console.log(last);
// .forEach(el=> el.map(elem=> elem.toUpperCase()))
const stockObj = Object.fromEntries(tmp);

module.exports = {stockObj};
