import { Link } from "react-router-dom"

const NewProduct = () => {

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-slate-500">Registrar Producto</h2>
        <Link
          to="/"
          className="bg-blue-800 py-1 px-2 text-lg text-white font-bold rounded-md hover:bg-blue-900 transition-all"
        >Volver</Link>
      </div>
    </>
  )
}

export default NewProduct