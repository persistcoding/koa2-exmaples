import Koa from 'koa'
import parse from 'co-body'

const app = new Koa()

app.use(async (ctx, next) => {

  if('POST' != ctx.method) {
    return await next()
  }

  const body = await parse(ctx, {limit: '1kb'})

  if(!body.name) {
    ctx.throw(400, '.name required')
  }

  ctx.body = { name: body.name.toUpperCase() }

})

if(!module.parent) {
  app.listen(3000, () => console.log('server running at 3000 port'))
}

module.exports = app
