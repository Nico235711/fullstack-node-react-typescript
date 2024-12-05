import { Link } from "react-router-dom";

export default function NewProduct() {

  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-3xl font-bold">Crear Producto</h2>
        <p className="text-gray-600 text-lg">Llena el formulario para crear un nuevo producto</p>
      </div>
      <Link to="/">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase transition-all"
        >Volver a Productos</button>
      </Link>
    </div>
  )
}
