import { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {

  const isAvailable = product.availability

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
      </td>
    </tr>
  )
}

export default ProductDetails