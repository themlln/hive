import { Request, NextFunction } from "express"
import { getRepository } from "typeorm"

const router = require('express').Router()
const {User} = require('../entity/User')
module.exports = router


const userRepository = getRepository(User)

router.post('/login', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user = await userRepository.find({
      email: req.body.email
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user = await userRepository.create(req.body);
    await userRepository.save(user);
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req: Request, res:Response) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req: Request, res:Response) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
