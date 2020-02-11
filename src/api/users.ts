const router = require('express').Router()
import {User} from '../entity/User'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

const userRepository = getRepository(User)

// router.use('*', (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let userId = Number(req.params['0'].slice(1))
//     console.log('REQUEST IN USER ROUTE', req.sessionStore)
//     if (req.sessionStore.sessionID === userId) {
//       next()
//     } else {
//       res.json().status(403)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.find({
      select: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const user = await userRepository.findOne({
      where: {
        id: id
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

