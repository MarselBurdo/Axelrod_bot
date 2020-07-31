/* eslint-disable linebreak-style */
const Telegraf = require('telegraf');
const {Extra, Markup, Stage, session} = Telegraf;
require('dotenv').config();
const {stockObj} = require('./info/parse');
const SceneGenerator = require('./scenes');
const currentScene = new SceneGenerator;
const stockScene = currentScene.GenStockScene()
const nameScene = currentScene.GenNameScene()
// console.log(stockObj);

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Stage ([stockScene,nameScene])
bot.use(Telegraf.log());

bot.use(session())
bot.use(stage.middleware())

bot.start( (ctx)=> ctx.reply('How are you?'));
// bot.on('text', (ctx)=>ctx.reply(`We don't care, what you say!`))
// bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.command('echo', (ctx)=> ctx.reply('Echo'))
bot.command('scenes', async (ctx)=> {
    ctx.scene.enter('stock')
})

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();


// const Telegraf = require('telegraf');
// const Extra = require('telegraf/extra');
// const Markup = require('telegraf/markup');

// const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.use(Telegraf.log());

// bot.command('start', (ctx)=> ctx.reply('How are you?'));

// bot.command('q', ({reply}) => {
//   return reply('Custom buttons keyboard', Markup
//       .keyboard([
//         ['🔍 Search', '📞 Feedback'],
//       ])
//       .oneTime()
//       .resize()
//       .extra(),
//   );
// });

// bot.hears('🔍 Search', (ctx) => ctx.reply('Yay!'));
// bot.hears('📞 Feedback', (ctx) => ctx.reply(
//   `Contact email:
//         burdo.marsel@gmail.com
//   Donate:
//         8-921-900-33-63`));


// bot.launch();


