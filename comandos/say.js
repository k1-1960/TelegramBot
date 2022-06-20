const fs = require('fs');

module.exports = {
  name: 'say',
  alias: [],
  async run (ctx, args) {
    ctx.reply(args.join(' '));
    ctx.deleteMessage();
  }
}