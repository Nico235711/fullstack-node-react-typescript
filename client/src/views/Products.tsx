import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader() {

  const products = await getProducts()
  return products
}

const Products = () => {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-slate-500">Productos</h2>
        <Link
          to="/productos/nuevo"
          className="bg-indigo-800 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-indigo-900 transition-all"
        >Agregar Producto</Link>
      </div>
      {
        products.length ? (
          <>
            <div className="p-2">
              <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-2">Producto</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Disponibilidad</th>
                    <th className="p-2">Acci  ones</th>
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