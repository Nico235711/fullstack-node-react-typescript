import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const errorStatus = 400

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  console.log("Desde middleware...");
  next()
  
}