/**
 * Module dependencies.
 */

 import render from './lib/render'
 import logger from 'koa-logger'
 import * as route  from 'koa-route'
 import parse  from 'co-body'
 import convert from 'koa-convert'
 import Koa    from 'koa'

 const app = new Koa();


 // database

 const posts = []

 // middleware

 app.use(convert(logger()))

 // route middleware

app.use(route.get('/', list))
app.use(route.get('/post/new', add))
app.use(route.get('/post/:id', show))
app.use(route.post('/post', create))

// route defintions

/**
  * Post listing.
  */

async function list(ctx, next) {
  ctx.body = await render('list', { posts: posts})
}

/**
  * Show creation form
  */

async function add() {
  this.body = await render('new')
}

/**
  * Show post :id
  */

async function show(ctx, id, next) {
  const post = posts[id]
  if(!post) {
    this.throw(404, 'invalid post id')
  }
  this.body = await render('show', {post: post})
}

/**
  * Create a post
  */

async function create() {
  const post = await parse(this)
  const id = posts.push(post) -1
  post.created_at = new Date()
  post.id = id
  this.redirect('/')
}

// listen

if (!module.parent) {
  app.listen(3000, () => console.log('server running at 3000 port'))
}

export default app
