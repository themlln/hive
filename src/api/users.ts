const router = require('express').Router()
import {User} from '../entity/User'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

export const userRepository = getRepository(User)


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

