const { Telegraf } = require('telegraf')
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => {
  ctx.reply('hola')
});
// Command handler.
const commandFiles = fs.readdirSync(path.join(process.cwd() + "/comandos")).filter(file => file.endsWith('.js'));
bot.commands = [];

for(const file of commandFiles) {
  const comand = require(path.join(process.cwd() + "/comandos/" + file));
  
  bot.commands.push(comand);
}

console.log(bot.commands)

bot.on('message', function (ctx) {
  const message = ctx.update.message;
  
  if(message.from.is_bot === true) return;
  if(!message.text.startsWith('!')) return;
  
  const args = message.text
    .slice("!".length)
    .trim()
    .split(/ +/g);
    
    const command = args
    .shift()
    .toLowerCase();
    
    let cmd = bot.commands.find(c => c.name === command || (c.alias && c.alias.includes(command)));
    
    if(cmd) try {
      cmd.run(ctx, args);
    } catch (e) {
      console.log(e)
    }
});
bot.launch();

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))