import { DraftProductSchema, ProductsSchema } from "@/types";
import axios from "axios";
import { safeParse } from "valibot";

type ProductData = {
  [k: string]: FormDataEntryValue;
}

const env = import.meta.env.VITE_BACKEND_URL

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price),
    });

    if (result.success) {
      const url = `${env}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      })
    }
    else {
      throw new Error("Datos no válidos");

    }

  } catch (error) {
    console.log(error);

  }
}

export async function getAllProducts() {
  try {
    const url = `${env}/api/products`;
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data); // es data es un array de objetos
    if (result.success) {
      return result.output
    }

  } catch (error) {
    console.log(error);
  }
}
