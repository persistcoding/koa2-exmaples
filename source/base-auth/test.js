import app from './index'
import supertest from 'supertest'

const request = supertest.agent(app.listen())


// superagent 很强大，直接提供了 basic auth的Api： auth
// console.log('request.get("/")')
// console.log(request.get("/").auth.toString())
// console.log('request.get("/")')


describe('Koa Basic Auth', () => {
  describe('with no credentials', () => {
    it('should "throw" 401', done => {
      request.get("/")
      .expect(401, done)
    })
  })
})


describe("with invalid credentials", () => {
  it("should 'throw' 401", done => {
    request.get("/")
    .auth("user", "invalid password")
    .expect(401, done)
  })
})


describe("with valid credentials", () => {
  it("should call the next middleware", done => {
    request.get("/")
    .auth("tim", "abc123")
    .expect(200)
    .expect("secret", done)
  })
})
