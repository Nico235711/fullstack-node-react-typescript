import Error from "@/components/Error";
import ProductForm from "@/components/ProductForm";
import { addProduct } from "@/services/ProductService";
import { ActionFunctionArgs, redirect, useActionData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { toast } from "react-toastify";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  // console.log(data);

  let error = ""
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios"
  }
  if (error) {
    return error
  }
  toast.success("Producto creado con exito");
  await addProduct(data)
  return redirect("/")
}

export default function NewProduct() {

  const error = useActionData()

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-600">Crear Producto</h2>
          <p className="text-gray-600 text-lg">Llena el formulario para crear un nuevo producto</p>
        </div>
        <Link to="/">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
          >Volver a Productos</button>
        </Link>
      </div>

      <Form className="mt-10" method="post">
        {error && <Error>{error}</Error>}
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-blue-500 hover:bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded transition-all"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
