import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // el index es el path "/"
        element: <Products />,
      },
      {
        path: "/newProduct",
        element: <NewProduct />,
      },
    ],
  }
]);