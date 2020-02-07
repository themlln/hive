const router = require('express').Router()
import {Message} from '../entity/Message'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

const messageRepository = getRepository(Message)

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const messages = await messageRepository.find()
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messageId: string = req.params.id
    const message = await messageRepository.findOneOrFail(messageId)
    res.json(message)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMessage = await messageRepository.create(req.body)
    const newMessageSaved = await messageRepository.save(newMessage)
    res.json(newMessageSaved).status(201)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const messageToDelete = await messageRepository.delete(req.params.id)
  res.json(messageToDelete)
})
