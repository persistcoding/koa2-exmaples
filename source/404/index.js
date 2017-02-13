import Koa from 'koa'

const app = new Koa()

app.use( async (ctx, next) => {
  if(404 != ctx.status) {
    // console.log("here is not 404")
    return;
  }

  // we need to explicityly set 404 here
  // so that koa doesn't assign 200 on body
  ctx.status = 404;

  const acceptType = ctx.accepts('html', 'json');


  switch(acceptType) {
    case 'html':
      ctx.type = "html";
      ctx.body = "<p>Page Not Found</p>";
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      }
      break;
    default:
      ctx.type = "text";
      ctx.body = "Page Not Found";
  }

})


if(!module.parent) {
  app.listen(3000, () => console.log('server is running at 3000 port'))
}

export default app
