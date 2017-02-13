import app from './index'
import supertest from 'supertest'

const request = supertest.agent(app.listen())

describe("hello-world", () => {
  it("should say 'Hello World'", done => {
    request.get('/')
    .expect(200)
    .expect("Hello World", done)
  })
})
