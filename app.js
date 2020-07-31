/* eslint-disable linebreak-style */
const Telegraf = require('telegraf');
const {Extra, Markup, Stage, session} = Telegraf;
require('dotenv').config();
const {stockObj} = require('./info/parse');
const SceneGenerator = require('./scenes');
const currentScene = new SceneGenerator;
const stockScene = currentScene.GenStockScene();
const nameScene = currentScene.GenNameScene();
// console.log(stockObj);

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage([stockScene, nameScene]);
bot.use(Telegraf.log());

bot.use(session());
bot.use(stage.middleware());

bot.start( (ctx)=> ctx.reply('How are you?'));
bot.help((ctx) => ctx.reply(`
This bot search stock price in Nasdaq.
When you you need this information click or write /stock .

/etc`));
bot.command('echo', (ctx)=> ctx.reply('Echo'));
bot.command('stock', async (ctx)=> {
  ctx.scene.enter('stock');
});
bot.command('etc', ({reply}) => {
  return reply('Custom buttons keyboard', Markup
      .keyboard([
        ['🤡 Funny image', '📞 Feedback'],
      ])
      .oneTime()
      .resize()
      .extra(),
  );
});

bot.hears('🤡 Funny image', (ctx) => {
  ctx.reply('Yay!')});
bot.hears('📞 Feedback', (ctx) => ctx.reply(
  `Contact email:
        burdo.marsel@gmail.com
  Donate:
        8-921-900-33-63`));

bot.on('text', (ctx)=>ctx.reply(`We don't care, what you say!
Press /help`));
bot.on('sticker', (ctx) => ctx.reply('👏'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
