import ProductDetails from "@/components/ProductDetails";
import { getAllProducts, updateAvailability } from "@/services/ProductService";
import type { Products } from "@/types";
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const products = await getAllProducts()
  if (products) {
    return products
  }
}

export async function action({ request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(Number(data.id))
}

export default function Products() {

  const products: Products = useLoaderData()

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-slate-600">Productos</h2>
        <Link to="products/new">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
          >Crear Producto</button>
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <ProductDetails key={product.id} product={product} />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
