import { Outlet } from "react-router-dom";

export default function Layout() {

  return (
    <>
      <header className="bg-slate-800">
        <div className="max-w-6xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-white">Administrador de Productos</h1>
        </div>

      </header>
      <main className="max-w-6xl mx-auto mt-10 bg-white shadow p-10">
        <Outlet />
      </main>
    </>
  )
}
