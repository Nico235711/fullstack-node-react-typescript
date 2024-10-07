import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {

  // const product = new Product(req.body)
  // const savedProduct = await product.save()

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    const status = res.status(400).json({errors: errors.array})
    return status
  }
  const product = await Product.create(req.body);
  res.json({ data: product });
};
