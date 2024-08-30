import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom"
import Error from "../components/Error"
import { getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id)
    if (!product) return redirect("/")
    return product
  }
return {}
}

export async function action({ request, params }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  let error = ""
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios"
  }

  if (error.length) {
    return error
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id)
    return redirect("/")
  }
}

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

const EditProduct = () => {

  const error = useActionData() as string
  const product = useLoaderData() as Product

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="px-2 py-1 text-lg font-bold text-white transition-all bg-blue-800 rounded-md hover:bg-blue-900"
        >Volver a Productos</Link>
      </div>

      <Form
        className="mt-10"
        method="POST"
      >
        {error && <Error>{error}</Error>}

        <ProductForm 
          product={product}
        />
        
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="block w-full p-3 mt-2 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Guardar Cambios"
        />
      </Form>
    </>
  )
}

export default EditProduct