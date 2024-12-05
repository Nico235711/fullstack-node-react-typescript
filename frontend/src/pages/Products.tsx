import { Link } from "react-router-dom";

export default function Products() {

  return (
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Productos</h2>
      <Link to="/newProduct">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
        >Crear Producto</button>
      </Link>
    </div>
  )
}
