import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import Products, { loader as produtsLoader } from "./pages/Products";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./pages/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // el index es el path "/"
        element: <Products />,
        loader: produtsLoader
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction
      },
    ],
  }
]);