import { Request, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from '../entity/User'


const router = require('express').Router()
module.exports = router


const userRepository = getRepository(User)

router.post('/login', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user: User = await userRepository.findOne({
      email: req.body.email
    })
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      const modifiedUser = {id: user.id, email: user.email, username: user.username, profileImage: user.profileImage}
      user.sessionId = req.sessionID
      const guestUser: User = await userRepository.findOne({
        where: {
          sessionId: req.sessionID,
          email: null
        }
      })
      await userRepository.remove(guestUser);
      await userRepository.save(user);
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

router.put('/username', async (req: Request, res:Response, next: NextFunction) => {
  try {
    console.log("REQUEST", req)
  } catch (err) {
      next(err)
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
