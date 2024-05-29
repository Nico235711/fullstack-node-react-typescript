import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom"
import Error from "../components/Error"
import { addProduct, getProductById } from "../services/ProductService"
import { Product } from "../types"

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id)
    if (!product) return redirect("/")
    return product
  }
  
}

export async function action({ request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  let error = ""
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios"
  }

  if (error.length) {
    return error
  }

  await addProduct(data)
  return redirect("/")
}

const EditProduct = () => {

  const error = useActionData() as string
  const product = useLoaderData() as Product

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-slate-500">Registrar Producto</h2>
        <Link
          to="/"
          className="bg-blue-800 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-blue-900 transition-all"
        >Volver a Productos</Link>
      </div>

      <Form
        className="mt-10"
        method="POST"
      >
        {error && <Error>{error}</Error>}

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name"
          >Nombre Producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50 border"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="price"
          >Precio:</label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50 border"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}

export default EditProduct