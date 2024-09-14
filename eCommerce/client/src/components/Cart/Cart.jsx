import './Cart.scss'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import DeleteIcon from '@mui/icons-material/Delete'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { removeItem, resetCart } from '@/redux/cartReducer'
import { loadStripe } from '@stripe/stripe-js'
import { Link } from 'react-router-dom'

const Cart = React.forwardRef((props, ref) => {
  const [userJWT, setUserJWT] = useState('')

  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)

  const api = import.meta.env.VITE_APP_URL_API
  const token = import.meta.env.VITE_STRAPI_TOKEN
  const stripePK = import.meta.env.VITE_STIPE_PUBLISHABLE_KEY

  const totalPrice = products
    .reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
    .toFixed(2)

  const stripePromise = loadStripe(stripePK)
  const handlePayment = async () => {
    if (!userJWT) {
      window.location.href = '/login'
      return
    }

    try {
      const stripeInstance = await stripePromise

      const res = await axios.post(
        `${api}/orders`,
        { products },
        {
          headers: {
            Authorization: `Bearer ${userJWT ? userJWT : token}`,
          },
        }
      )
      await stripeInstance.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setUserJWT(JSON.parse(localStorage.getItem('UserJWT')))
  }, [])

  return (
    <div className="cart" ref={ref}>
      <h1>
        {products.length === 0 ? 'Your cart is empty' : 'Products in your cart'}
        <HighlightOffIcon
          className="cancelIcon"
          onClick={() => props.setIsOpen(false)}
        />
      </h1>
      <div className="mapWrap">
        {products.map((item) => (
          <div key={item.id} className="itemWrapper">
            <Link to={`/product/${item.title}`} className="item">
              <img src={item.img} alt={item.title} />
              <div className="details">
                <div>
                  <h1>{item.title}</h1>
                  <h1 className="price">
                    {item.quantity} x ${item.price}
                  </h1>
                </div>
              </div>
            </Link>
            <DeleteIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        ))}
      </div>
      <div className="cartBottomWrapper">
        <div className="total">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
        <div className="checkout">
          <button onClick={handlePayment}>Checkout</button>
          <span onClick={() => dispatch(resetCart())}>Reset</span>
        </div>
      </div>
    </div>
  )
})

Cart.displayName = 'Cart'

Cart.propTypes = {
  setIsOpen: PropTypes.func.isRequired
}

export default Cart
