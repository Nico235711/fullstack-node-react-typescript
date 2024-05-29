import { Request, Response } from "express"
import Product from "../models/Product.model"

// debe ser asincrona la petición a la BD
export const getProducts = async (req: Request, res: Response) => {
  try {
    // obtengo mis productos
    const products = await Product.findAll()
    res.json({ data: products })

  } catch (error) {
    console.log(error);
  }
}

// debe ser asincrona la petición a la BD
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    // no hay producto
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ data: product })

  } catch (error) {
    console.log(error);
  }
}

// debe ser asincrona la petición a la BD
export const createProduct = async (req: Request, res: Response) => {
  try {
    // crea la instacia y me almacena en la BD en un solo paso
    const product = await Product.create(req.body)
    res.status(201).json({ data: product })

  } catch (error) {
    console.log(error);

  }
}

// debe ser asincrona la petición a la BD
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    // no hay producto
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    // actualizo
    await product.update(req.body)
    await product.save()
    res.json({ data: product })

  } catch (error) {
    console.log(error);
    
  }
}

// debe ser asincrona la petición a la BD
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    // no hay producto
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    await product.destroy()
    res.json({ data: "Producto Eliminado" })

  } catch (error) {
    console.log(error);
    
  }
}
