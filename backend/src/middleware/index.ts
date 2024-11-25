import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const CODE_BAD_REQUEST = 400

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(CODE_BAD_REQUEST).json({errors: errors.array()})
    return
  }
  next()
  
}