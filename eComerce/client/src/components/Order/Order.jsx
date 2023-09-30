import { useState, useEffect } from "react";
import "./Order.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import axios from "axios";

function Order({ user, userJWT, handleUserUpdate }) {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const api = import.meta.env.VITE_APP_URL_API;

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

  const handleDeleteOrder = async (id) => {
    try {
      const res = await axios.delete(`${api}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${userJWT}`,
        },
      });

      // if(res.data) setOrders(orders.filter((order) => order.id !== id));

      if (res.status === 200) {
        toast.success("Order deleted!");
        handleUserUpdate();
      }
    } catch (err) {
      toast.error("Failed to delete order!");
      console.log(err);
    }
  };

  useEffect(() => {
    setOrders([...user.orders]);
  }, [user]);

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
                      <img src={product.img} alt={product.title} />
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
                <button
                  className="deleteBTN"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
