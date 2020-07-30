/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const Scene = require('telegraf/scenes/base');
const { stockObj } = require('./info/parse');
// console.log(stockObj.get('amzn'));

class ScenesGenerator {
  GenStockScene() {
    const stock = new Scene('stock');
    stock.enter(async (ctx) => {
      await ctx.reply('Which company price?');
    });
    stock.on('text', async (ctx) => {
      const companyName = ctx.message.text.toLowerCase();
      // console.log(typeof companyName);
      let tmp;
      if (companyName && (typeof companyName === 'string')) {
        Object.values(stockObj).forEach(el=> {
          if (el.includes(companyName)){
            console.log(1);
          }
        });

        }
        // console.log(tmp);

      
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
