const router = require('express').Router()
import {User} from '../entity/User'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

const userRepository = getRepository(User)

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const users = await userRepository.find({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      select: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
