import './App.scss'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoutes'
import Login from './pages/Auth/login/Login'
import SignUp from './pages/Auth/signup/SignUp'
import Cancel from './pages/Cancel/Cancel'
import Checkout from './pages/Checkout/Checkout'
import Favorites from './pages/Favorites/Favorites'
import Home from './pages/Home/Home.jsx'
import Product from './pages/Product/Product.jsx'
import Products from './pages/Products/Products.jsx'
import Profile from './pages/Profile/Profile'

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="topNavMr"></div>
      <Outlet />
      <Footer />
    </div>
  )
}

const Router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    )
  },
  {
    path: '/success/:session_id',
    element: (
      <div className="app">
        <Navbar />
        <div className="topNavMr"></div>
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
        <Footer />
      </div>
    )
  },
  {
    path: '/cancel/',
    element: (
      <div className="app">
        <Navbar />
        <div className="topNavMr"></div>
        <ProtectedRoute>
          <Cancel />
        </ProtectedRoute>
        <Footer />
      </div>
    )
  },
  {
    path: '/signup',
    element: (
      <GuestRoute>
        <SignUp />
      </GuestRoute>
    )
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/products/:title',
        element: <Products />
      },
      {
        path: '/product/:title',
        element: <Product />
      },
      {
        path: '/favorites',
        element: <Favorites />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={Router} />
}
