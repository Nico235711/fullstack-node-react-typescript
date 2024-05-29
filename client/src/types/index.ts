import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number()
})

const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean()
})
export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>