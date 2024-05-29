import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // carga el contenido del hijo cuando visito la página principal
        element: <Products />
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />
      }
    ]
  }
])