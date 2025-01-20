import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Products from "./pages/ProductsHome";
import RootLayout from "./components/layouts/Root";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetail";
import AuthLayout from "./components/layouts/Auth";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import CartPage from "./pages/Cart";
import AdminLayout from "./components/layouts/Admin";
import NewProductPage from "./pages/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" />,
      },
      {
        path: "products",
        element: <Products />,
        children: [
          {path: "cart", element: <CartPage /> }
        ],
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      // { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Admin Layout for admin-specific pages
    children: [
      { path: "new", element: <NewProductPage /> }, // Route for adding new products
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
