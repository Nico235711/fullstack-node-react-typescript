import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";

type addProductProps = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: addProductProps) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price
    })
    
    if (result.success) return result
    else throw new Error("Datos no válidos");
    

  } catch (error) {
    console.log(error);
    
  }
}