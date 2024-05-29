import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";
import axios from "axios";

type addProductProps = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: addProductProps) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price
    })
    
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`
      const { data: dataProduct } = await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      })
      console.log(dataProduct);
      
    }
    else throw new Error("Datos no válidos");
    

  } catch (error) {
    console.log(error);
    
  }
}