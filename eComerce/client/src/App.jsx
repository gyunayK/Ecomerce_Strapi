import "./App.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import Products from "./pages/Products/Products.jsx";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/login/Login.jsx";
import SignUp from "./pages/Auth/signup/SignUp";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
