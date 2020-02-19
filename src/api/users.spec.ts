import * as expect from 'chai'
import * as app from '../index';
import * as request from 'supertest'

import {userRepository} from './users'
import {User} from '../entity/User'
import {createConnection} from 'typeorm'

describe('User routes', () => {
  beforeEach(() => {
    return createConnection({
      synchronize: true
    })
  })

  describe('/api/users/', () => {
    const codysEmail = new User({
      email: "cody@puppybook.com",
    })



    beforeEach(() => {

      return codysEmail.save({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
