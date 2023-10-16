import "./App.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import Products from "./pages/Products/Products.jsx";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/login/Login";
import SignUp from "./pages/Auth/signup/SignUp";
import Profile from "./pages/Profile/Profile";
import Favorites from "./pages/Favorites/Favorites";
import {
  ProtectedRoute,
  GuestRoute,
} from "./components/ProtectedRoutes/ProtectedRoutes";

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
    path: "/signin",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <GuestRoute>
        <SignUp />
      </GuestRoute>
    ),
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
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:title",
        element: <Products />,
      },
      {
        path: "/product/:title",
        element: <Product />,
      },

      {
        path: "/favorites",
        element: <Favorites />,
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
