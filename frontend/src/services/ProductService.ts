import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "@/types";
import axios from "axios";
import { safeParse } from "valibot";

type ProductData = {
  [k: string]: FormDataEntryValue;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price),
    });

    if (result.success) {
      const url = `${backendUrl}/api/products`;
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
    const url = `${backendUrl}/api/products`;
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data); // es data es un array de objetos
    if (result.success) {
      return result.output
    }

  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${backendUrl}/api/products/${id}`;
    const { data } = await axios(url)
    // console.log(data);
    
    const result = safeParse(ProductSchema, data.data); // es data es un array de objetos
    if (result.success) {
      return result.output
    }

  } catch (error) {
    console.log(error);
  }
}

export async function updateProductById(id: Product["id"], formData: ProductData) {
  try {

    const url = `${backendUrl}/api/products/${id}`;
    await axios.put(url, formData)
    // console.log(data);

  } catch (error) {
    console.log(error);
  }
}

export async function updateAvailability(id: Product["id"]) {
  try {
    const url = `${backendUrl}/api/products/${id}`;
    await axios.patch(url)

  } catch (error) {
    console.log(error);
  }
}

export async function deletProductById(id: Product["id"]) {
  try {
    const url = `${backendUrl}/api/products/${id}`;
    await axios.delete(url)

  } catch (error) {
    console.log(error);
  }
}
