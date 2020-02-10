import { Request, NextFunction } from "express"

const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/canvases', require('./canvases'))


router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
