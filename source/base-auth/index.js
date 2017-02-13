import Koa from 'koa'
import auth from 'koa-basic-auth'
import convert from 'koa-convert'

const app = new Koa()

app.use( async (ctx, next) => {
  try {
    await next()
  } catch (err) {

    if(401 == err.status) {
      ctx.status = 401;
      ctx.set("WWW-Authenticate", "Basic");
      ctx.body = "cant haz that"
    } else {
      throw err
    }

  }

})

app.use(convert(auth({name:'tim',pass:'abc123'})))

app.use( async ctx => {
  ctx.body = "secret"
})

if(!module.parent) {
  app.listen(3000, () => console.log("server is running at 3000 port"))
}

export default app
