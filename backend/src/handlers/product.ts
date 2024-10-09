import { Request, Response } from "express";
import Product from "../models/Product.model";

const notFoundStatus = 404

export const createProduct = async (req: Request, res: Response) => {

  try {
    // const product = new Product(req.body)
    // const savedProduct = await product.save()

    const product = await Product.create(req.body);
    res.json({ data: product });
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
      res.status(notFoundStatus).json({ error: "Producto no encontrado" })
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
      res.status(notFoundStatus).json({ error: "Producto no encontrado" })
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
      res.status(notFoundStatus).json({ error: "Producto no encontrado" })
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
