import { Request, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from '../entity/User'


const router = require('express').Router()
module.exports = router


const userRepository = getRepository(User)

const modifyUser = (user: User) => {
  return {
    sessionId: user.sessionID || user.sessionId,
    email: user.email,
    id: user.id,
    username: user.username,
    profileImage: user.profileImage
  }
}

router.post('/login', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user: User = await userRepository.findOneOrFail({
      email: req.body.email
    })
    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      user.sessionId = req.sessionID
      const guestUser: User = await userRepository.findOne({
        where: {
          sessionId: req.sessionID,
          email: null
        }
      })
      await userRepository.remove(guestUser);
      await userRepository.save(user);
      const modifiedUser = modifyUser(user);
      req.login(modifiedUser, err => (err ? next(err) : res.json(modifiedUser)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req: Request, res:Response, next: NextFunction) => {
  try {
    const user: User = userRepository.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      sessionId: req.sessionID
    })
    await userRepository.save(user);
    const modifiedUser = modifyUser(user);
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
    const user: User = await userRepository.findOneOrFail({
      sessionId: req.sessionID
    })
    // update the username on database
    user.username = req.body.username
    // update the username on the session
    req.session.user.username = req.body.username
    const modifiedUser = modifyUser(user)
    await userRepository.save(modifiedUser);
    res.status(202).json(user)
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
  const modifiedUser = modifyUser(req.session.user)
  res.json(modifiedUser)
})

router.use('/google', require('./google'))
