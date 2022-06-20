const empty = {};
empty.create({
  name: 'test',
  async run (ctx, message) {
    ctx.reply('hola!')
  }
})

console.log(empty)