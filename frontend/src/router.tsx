import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import Products, { loader as produtsLoader, action as updateAvailabityAction } from "./pages/Products";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";
import Spinner from "./components/Spinner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // el index es el path "/"
        element: <Products />,
        loader: produtsLoader,
        action: updateAvailabityAction,
        hydrateFallbackElement: <Spinner />,
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
        action: editProductAction,
      },
      {
        path: "products/delete/:id",
        action: deleteProductAction
      },
    ],
  }
]);