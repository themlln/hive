const router = require('express').Router()
import {Message} from '../entity/Message'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

const messageRepository = getRepository(Message)

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await messageRepository.find()
    res.json(messages)
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

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await messageRepository.findOne(req.params.id)
    if (message) {
      await messageRepository.merge(message, req.body)
      const updatedMessage = await messageRepository.save(message)
      res.json(updatedMessage)
    } else {
      throw Error('Message not found')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messageId = req.params.id
    const messageToDelete = await messageRepository.findOne({where: {
      id: messageId
    }})
    if (!messageToDelete) {
      throw Error('Message not found')
    } else {
      await messageRepository.remove(messageToDelete)
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
})
