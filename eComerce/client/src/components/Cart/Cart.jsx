import "./Cart.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "@/redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  const api = import.meta.env.VITE_APP_URL_API;

  const totalPrice = products
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const stripePromise = loadStripe(
    "pk_test_51NfWo9AAsmfoiDvP3oiMDsgcJR1G5jffJwlMN0X4ZpQSTVUDbvqWRhOa9QiWmoha9qCeZADsYcgqyINqm85zbguQ00v6jXAjUn"
  );

  const handlePayment = async () => {
    try {
      const stripeInstance = await stripePromise;

      const res = await axios.post(`${api}/orders`, {
        products
      },{
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      });

      await stripeInstance.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      
    } catch (err) {
      console.log(err);
    }
};

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products.map((item) => (
        <div className="item" key={item.id}>
          <img src={import.meta.env.VITE_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 30)}...</p>
            <div className="price">
              <h1>
                {item.quantity} x ${item.price}
              </h1>
            </div>
          </div>
          <DeleteIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice}</span>
      </div>
      <button onClick={handlePayment}>CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset
      </span>
    </div>
  );
};

export default Cart;
