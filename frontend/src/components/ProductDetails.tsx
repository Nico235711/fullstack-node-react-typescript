import { formatCurrency } from "@/helpers/formatCurrency";
import { Product } from "@/types";
import { Link } from "react-router-dom";

type ProductDetailsProps = {
  product: Product
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
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
        >Eliminar</button>
      </div>
    </td>
</tr> 
  )
}
