import { formatCurrency } from "@/helpers/formatCurrency";
import { deletProductById } from "@/services/ProductService";
import { Product } from "@/types";
import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

type ProductDetailsProps = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs) {
  
  if (params.id !== undefined) {
    toast.error("Producto eliminado con exito");
    await deletProductById(Number(params.id))
    return redirect("/")
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  const isAvailable = product.availability ? "Disponible" : "No disponible"

  return (
    <tr className="border-b text-center">
    <td className="p-3 text-lg text-gray-800">
      {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
      {formatCurrency(product.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
      <button
        className={`${product.availability ? "text-green-600 border-green-300" : "text-red-600 border-red-300"} border-2 py-1 px-2 rounded`}
        // onClick={() => updateAvailability(product.id)}
      >
          {isAvailable}
        </button>
    </td>
    <td className="p-3 text-lg text-gray-800 ">
      <div className="flex justify-center gap-2">
        <Link to={`/products/edit/${product.id}`}>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
          >Editar</button>
        </Link>
        <Form method="post" action={`/products/delete/${product.id}`}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
          >Eliminar</button>
        </Form>
      </div>
    </td>
</tr> 
  )
}
