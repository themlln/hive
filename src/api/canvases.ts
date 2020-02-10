const router = require('express').Router()
import {Canvas} from '../entity/Canvas'
import { getRepository } from 'typeorm'
import { Request, NextFunction } from 'express'
module.exports = router

const canvasRepository = getRepository(Canvas)

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
  try {
    const canvas = new Canvas();
    await canvasRepository.save(canvas)
    console.log("LINE13 CANVAS", canvas.id)
    res.json(canvas.id);
  } catch (err) {
    next(err)
  }
})
