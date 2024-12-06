import { formatCurrency } from "@/helpers/formatCurrency";
import { Product } from "@/types";

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {

  const availabilityStyle = {
    color: product.availability ? "green-600" : "red-600"
  }

  return (
    <tr className="border-b text-center">
    <td className="p-3 text-lg text-gray-800">
      {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
      {formatCurrency(product.price)}
    </td>
    <td className="p-3 text-lg text-gray-800">
      <button className={`text-${availabilityStyle.color}`}>{product.availability ? "Disponible" : "No disponible"}</button>
    </td>
    <td className="p-3 text-lg text-gray-800 ">

    </td>
</tr> 
  )
}
