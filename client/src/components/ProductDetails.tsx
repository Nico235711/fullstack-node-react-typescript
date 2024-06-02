import { ActionFunctionArgs, Form, redirect, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs ) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect("/")
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {

  const isAvailable = product.availability
  const navigate = useNavigate()

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800 text-center">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <form method="post">
          <button
            type="button"
            name="availability"
            value={product.availability.toString()}
            className={`${isAvailable ? "text-green-500" : "text-red-600"} rounded-md w-full font-bold border border-black-100`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-3 justify-evenly">
          <button
            type="button"
            className="bg-indigo-600 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-blue-700 transition-all"
            onClick={() => navigate(`productos/${product.id}/editar`)}
          >Editar</button>

          <Form
            method="post"
            action={`productos/${product.id}/eliminar`}
            onSubmit={e => {
              if (!confirm("Desea eliminar?"))
                e.preventDefault()
            }}
          >
            <button
              type="submit"
              className="bg-red-600 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-red-700 transition-all"
            >Eliminar</button>
          </Form>
        </div>
      </td>
    </tr>
  )
}

export default ProductDetails