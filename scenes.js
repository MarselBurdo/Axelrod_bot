/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
require('dotenv').config();
const Scene = require('telegraf/scenes/base');
const fetch = require('node-fetch');
const {stockObj} = require('./info/parse');
const regex = /[a-z]/gi;
// console.log(stockObj);

class ScenesGenerator {
  GenStockScene() {
    const stock = new Scene('stock');
    stock.enter(async (ctx) => {
      await ctx.reply('Which company price?(english)');
    });
    stock.on('text', async (ctx) => {
      const companyName = ctx.message.text.toLowerCase();
      let tmp;
      console.log(companyName.search(regex));
      if (companyName.search(regex)!== -1) {
        for (const key in stockObj) {
          if (key.includes(companyName)) {
            tmp= key;
          }
        }
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockObj[tmp]}&apikey=${process.env.API_KEY}`);
        const result = await response.json();
        // console.log(result);
        ctx.reply(
            `Company name:   "${companyName.toUpperCase()}"
Symbol in Nasdaq:     ${result['Meta Data']['2. Symbol'].toUpperCase()}
`);
      } else {
        ctx.reply('Please, write company name in English')
      }
    });
    stock.on('message', (ctx) => ctx.reply(' Please, write company name!'));
    return stock;
  }
  GenNameScene() {
    const name = new Scene('name');
    name.enter((ctx) => ctx.reply('What you name?'));
    name.on('text', async (ctx) => {
      const name = ctx.message.text;
      if (name) {
        await ctx.reply(`Hello sweety, ${name}`);
        await ctx.scene.leave();
      } else {
        await ctx.reply('Forgot your name? You idiot?');
        await ctx.reenter();
      }
    });
    name.on('message', (ctx) => ctx.reply('Forgot your name? You idiot?'));
    return name;
  }
}

module.exports = ScenesGenerator;
