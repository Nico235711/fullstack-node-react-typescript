import { Outlet } from "react-router-dom"

const Layout = () => {

  return (
    <>
      <div>Desde Layout</div>

      {/* inyecta el contenido manteniendo el div */}
      <Outlet />
    </>
  )
}

export default Layout