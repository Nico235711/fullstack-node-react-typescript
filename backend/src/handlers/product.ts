import { Request, Response } from "express";
import Product from "../models/Product.model";

const CODE_NOT_FOUND = 404
const CODE_CREATED = 201

export const createProduct = async (req: Request, res: Response) => {

  try {
    // const product = new Product(req.body)
    // const savedProduct = await product.save()

    const product = await Product.create(req.body);
    res.status(CODE_CREATED).json({ data: product });
  } catch (error) {
    console.log(error);

  }
};

export const getAllProducts = async (req: Request, res: Response) => {

  try {

    const product = await Product.findAll();
    res.json({ data: product });
  } catch (error) {
    console.log(error);

  }
};

export const getProductById = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      res.status(CODE_NOT_FOUND).json({ error: "Producto no encontrado" })
      return
    }
    await product.destroy()
    res.json({ data: product })

  } catch (error) {
    console.log(error);

  }
};

export const updateProductById = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      res.status(CODE_NOT_FOUND).json({ error: "Producto no encontrado" })
      return
    }
    // actualizo
    product.update(req.body)
    res.json({ data: product })

  } catch (error) {
    console.log(error);

  }
};

export const updateAvailability = async (req: Request, res: Response) => {

  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      res.status(CODE_NOT_FOUND).json({ error: "Producto no encontrado" })
      return
    }
    // actualizo
    product.availability = !product.dataValues.availability
    await product.save()
    
    res.json({ data: product })

  } catch (error) {
    console.log(error);

  }
};
