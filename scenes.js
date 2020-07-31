/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
require('dotenv').config();
const Telegraf = require('telegraf');
const {Extra, Markup, session} = Telegraf;
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
      if (companyName.search(regex)!== -1) {
        for (const key in stockObj) {
          if (key.includes(companyName)) {
            tmp= key;
          } else {
          };
        }
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockObj[tmp]}&apikey=${process.env.API_KEY}`);
        const result = await response.json();
        // console.log(result);
        if (result['Global Quote']['01. symbol']) {
          await ctx.reply(` ${ctx.message.chat.first_name} you wanted information about "${companyName.toUpperCase()}" company  
Symbol in Nasdaq:     ${result['Global Quote']['01. symbol'].toUpperCase()}
Open price:  ${result['Global Quote']['02. open']}$
Change per day:  ${result['Global Quote']['09. change']}$
Change percent:  ${result['Global Quote']['10. change percent']}
            `);
          await ctx.scene.enter('name');
        } else {
          await ctx.scene.reenter();
        }
      } else {
        ctx.reply('Please, write company name in English');
      }
    });
    stock.on('message', (ctx) => ctx.reply(' Please, write company name!'));
    return stock;
  }
  GenNameScene() {
    const name = new Scene('name');
    name.enter((ctx) => ctx.reply(`${ctx.message.chat.first_name}, now I hope you enjoy the Super Axe Bot.
Please, write your opinion: `));
    name.on('text', async (ctx) => {
      const name = ctx.message.text;
      if (name) {
        await ctx.reply(`Thank you for comment: ${name}`);
        await ctx.scene.leave();
      } else {
        await ctx.reply('Really?');
        await ctx.reenter();
      }
    });
    name.on('message', (ctx) => ctx.reply('REally?'));
    return name;
  }
}

module.exports = ScenesGenerator;
