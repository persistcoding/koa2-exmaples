const app = require('./index.js')
const request = require('supertest').agent(app.listen())

describe('Body Parsing', () => {
  describe('POST /uppercase', () => {

    describe('with JSON', () => {
      it('should work', done => {
        request.post('/uppercase')
        .send({name: 'james'})
        .expect(200)
        .expect({name: 'JAMES'},done)
      })
    })

    describe('with urlencoded', () => {
      it('should work', done => {
        request
        .post('/uppercase')
        .send('name=po')
        .expect(200)
        .expect({name: 'PO'}, done);
      })
    })

    describe('when length > limit', () => {
      it('should 413', done => {
        request
        .post('/uppercase')
        .send({name: Array(5000).join('a')})
        .expect(413, done)
      })
    })

    describe('when no name is sent', () => {
      it('should 400', done => {
        request
        .post('/uppercase')
        .send('age=10')
        .expect(400, done)
      })
    })

  })
})
