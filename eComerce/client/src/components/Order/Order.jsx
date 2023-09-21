import { useState } from "react";
import "./Order.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";

function Order({ user }) {
  const [orders, setOrders] = useState([...user.orders]);
  const dispatch = useDispatch();

  const url_IMG = import.meta.env.VITE_APP_UPLOAD_URL;

  const handleCopyClick = (stripeId) => {
    navigator.clipboard
      .writeText(stripeId)
      .then(() => {
        toast.success("Copied!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const orderTotalPrice = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  };

  const handleAddToCart = (product) => {
    console.log(product);
    product.forEach((product) => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          desc: product.desc,
          img: product.img,
          price: product.price,
          quantity: product.quantity,
        })
      );
    });
  };

  console.log(orders);

  return (
    <div className="orderContainer">
      {orders.map((order, i) => {
        return (
          <div className="oder" key={i}>
            <div className="oderTop">
              <h1>Completed</h1>
              <div className="oderTopRight">
                <div>
                  <p>Oder Date: {new Date(order.createdAt).toLocaleString()}</p>
                  <p>
                    Order ID: {order.stripeId.slice(0, 20)}...
                    <a
                      className="copyBTN"
                      onClick={() => handleCopyClick(order.stripeId)}
                    >
                      Copy ID
                    </a>
                  </p>
                </div>
                <div>
                  <a>Order details</a>
                </div>
              </div>
            </div>
            <div className="oderBot">
              <div className="imgContainer">
                {order.products.map((product, i) => {
                  return (
                    <a key={i} href={`/product/${product.id}`}>
                      <img src={`${url_IMG}${product.img}`} alt="" />
                    </a>
                  );
                })}
              </div>
              <div className="orderBotRight">
                <h2>Total: ${orderTotalPrice(order.products)}</h2>
                <button
                  className="addToCartBTN"
                  onClick={() => handleAddToCart(order.products)}
                >
                  Add to cart
                </button>
                <button className="deleteBTN"> Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
