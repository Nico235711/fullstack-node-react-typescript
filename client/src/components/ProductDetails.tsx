import { useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
  product: Product
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
        {isAvailable ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-3 justify-evenly">
          <button
            type="button"
            className="bg-indigo-600 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-blue-700 transition-all"
            onClick={() => navigate(`productos/${product.id}/editar`)}
          >Editar</button>
          <button
            type="button"
            className="bg-red-600 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-red-700 transition-all">Eliminar</button>
        </div>
      </td>
    </tr>
  )
}

export default ProductDetails