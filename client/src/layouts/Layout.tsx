import { Outlet } from "react-router-dom"

const Layout = () => {

  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-5">
          <h1 className="font-extrabold text-4xl text-white">Administrador de Productos</h1>
        </div>
      </header>

      {/* inyecta el contenido manteniendo el div */}
      <main className="mt-10 mx-auto max-w-6xl bg-white shadow p-10">
        <Outlet />
      </main>
    </>
  )
}

export default Layout