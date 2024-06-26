import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom"
import Error from "../components/Error"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({ request }: ActionFunctionArgs ) {

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

const NewProduct = () => {

  const error = useActionData() as string

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

        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}

export default NewProduct