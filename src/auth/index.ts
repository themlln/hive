import { Request, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from '../entity/User'


const router = require('express').Router()
module.exports = router


const userRepository = getRepository(User)

router.post('/login', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user: User = await userRepository.findOneOrFail({
      email: req.body.email
    })
    user.sessionId = req.sessionID
    await userRepository.save(user)

    if (!user) {
      res.json('Wrong username and/or password').status(401)
    } else if (!user.correctPassword(req.body.password)) {
      res.json('Invalid password').status(401)
    } else {
      const modifiedUser = {id: user.id, email: user.email, username: user.username, profileImage: user.profileImage}

      req.login(modifiedUser, err => (err ? next(err) : res.json(modifiedUser)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user: User = await userRepository.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      sessionId: req.sessionID
    })
    await userRepository.save(user);

    const modifiedUser: object = {id: user.id, email: user.email, name: user.username, profileImage: user.profileImage}
    req.login(modifiedUser, err => (err ? next(err) : res.json(modifiedUser)))
  } catch (err) {
    if (err.name === 'TypeORMUniqueConstraintError') {
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

router.get('/loggingin', (req: Request, res:Response) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
