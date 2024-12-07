import Error from "@/components/Error";
import { getProductById, updateProductById } from "@/services/ProductService";
import { Product } from "@/types";
import { ActionFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    return await getProductById(Number(params.id))
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = Number(params.id)
  const data = Object.fromEntries(await request.formData());
  // console.log(data);

  let error = ""
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios"
  }
  if (error) {
    return error
  }
  toast.success("Producto editado con exito");
  await updateProductById(id, data)
  return redirect("/")
}

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

export default function NewProduct() {

  const product: Product = useLoaderData()
  const error = useActionData()

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-600">Registrar Producto</h2>
          <p className="text-gray-600 text-lg">Llena el formulario para editar un producto</p>
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
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name"
          >Nombre Producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-slate-100"
            placeholder="Wireless Headphones"
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
            className="mt-2 block w-full p-3 bg-slate-100"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
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
          className="mt-5 w-full bg-blue-500 hover:bg-blue-700 p-2 text-white font-bold text-lg cursor-pointer rounded transition-all"
          value="Guardar Cambios"
        />
      </Form>
    </>
  )
}
