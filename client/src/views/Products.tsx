import { Link } from "react-router-dom"

const Products = () => {

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-slate-500">Productos</h2>
        <Link
          to="/productos/nuevo"
          className="bg-blue-800 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-blue-900 transition-all"
        >Agregar Producto</Link>
      </div>
    </>
  )
}

export default Products