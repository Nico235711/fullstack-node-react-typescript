import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader() {

  const products = await getProducts()
  return products
}

export async function action({ request }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

const Products = () => {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-slate-500">Productos</h2>
        <Link
          to="/productos/nuevo"
          className="px-2 py-1 text-lg font-bold text-white transition-all bg-indigo-800 rounded-md hover:bg-indigo-900"
        >Agregar Producto</Link>
      </div>
      {
        products.length ? (
          <>
            <div className="p-2">
              <table className="w-full mt-5 table-auto">
                <thead className="text-white bg-slate-800">
                  <tr>
                    <th className="p-2">Producto</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Disponibilidad</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <ProductDetails
                      key={product.id}
                      product={product}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="mt-5 font-bold">No hay productos para mostrar, empiece a agregar productos y <span className="text-slate-500">aparecerán aquí</span></p>
        )
      }
    </>
  )
}

export default Products