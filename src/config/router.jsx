import { createBrowserRouter, Link } from "react-router-dom";
import RootLayout from "../modules/common/layouts/RootLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductListing from "../modules/product/pages/ProductListing";
import ProductDetail from "../modules/product/pages/ProductDetail";
import ProductAdd from "../modules/product/pages/ProductAdd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: "products",
        element: <ProductListing/>
      },
      {
        path: "products/:productId",
        element: <ProductDetail/>
      },
      {
        path: "products/new",
        element: <ProductAdd/>
      }
      
    ]
  },
]);

export default router;
