import "./Cart.scss";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "@/redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

const Cart = React.forwardRef((props, ref) => {
  const [userJWT, setUserJWT] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  const api = import.meta.env.VITE_APP_URL_API;
  const token = import.meta.env.VITE_STRAPI_TOKEN;
  const stripePK = import.meta.env.VITE_STIPE_PUBLISHABLE_KEY;

  const totalPrice = products
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const stripePromise = loadStripe(stripePK);
  const handlePayment = async () => {
    try {
      const stripeInstance = await stripePromise;

      const res = await axios.post(
        `${api}/orders`,
        { products },
        {
          headers: {
            Authorization: `Bearer ${userJWT ? userJWT : token}`,
          },
        }
      );
      console.log("Sending these products:", products);

      await stripeInstance.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserJWT(JSON.parse(localStorage.getItem("UserJWT")));
  }, []);

  return (
    <div className="cart" ref={ref}>
      <h1>
        {products.length === 0 ? "Your cart is empty" : "Products in your cart"}
      </h1>
      {products.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="itemWrapper">
          <div className="item" key={item.id}>
            <img src={item.img} alt={item.title} />
            <div className="details">
              <div>
                <h1>{item.title}</h1>
                <h1 className="price">
                  {item.quantity} x ${item.price}
                </h1>
              </div>
              <DeleteIcon
                className="delete"
                onClick={() => dispatch(removeItem(item.id))}
              />
            </div>
          </div>
        </Link>
      ))}
      <div className="total">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      <button onClick={handlePayment}>Checkout</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset
      </span>
    </div>
  );
});

export default Cart;
