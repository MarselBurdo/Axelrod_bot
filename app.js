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

bot.command('start', (ctx)=> ctx.reply('How are you?'));
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

// const Telegraf = require('telegraf')
// const session = require('telegraf/session')
// const Stage = require('telegraf/stage')
// const Scene = require('telegraf/scenes/base')

// // Handler factoriess
// const { enter, leave } = Stage

// // Greeter scene
// const greeterScene = new Scene('greeter')
// greeterScene.enter((ctx) => ctx.reply('Hi'))
// greeterScene.leave((ctx) => ctx.reply('Bye'))
// greeterScene.hears('hi', enter('greeter'))
// greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

// // Echo scene
// const echoScene = new Scene('echo')
// echoScene.enter((ctx) => ctx.reply('echo scene'))
// echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
// echoScene.command('back', leave())
// echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
// echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

// const bot = new Telegraf(process.env.BOT_TOKEN)
// const stage = new Stage([greeterScene, echoScene], { ttl: 10 })
// bot.use(session())
// bot.use(stage.middleware())
// bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
// bot.command('echo', (ctx) => ctx.scene.enter('echo'))
// bot.on('message', (ctx) => ctx.reply('Try /echo or /greeter'))
// bot.launch()
