import React from "react";
import "./Cart.scss";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const data = [
    {
      id: 1,
      img: "https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564",
      img2: "https://ik.imagekit.io/riviaa/ImgEC/martin-katler-Y4fKN-RlMV4-unsplash.png?updatedAt=1691212067587",
      title: "Sneakers",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam dolorem.",
      isNew: true,
      oldPrice: 100,
      price: 85,
    },
    {
      id: 2,
      img: "https://ik.imagekit.io/riviaa/ImgEC/leon-skibitzki-mHUk4Se7peY-unsplash%201.png?updatedAt=1691212067555",
      img2: "https://ik.imagekit.io/riviaa/ImgEC/junior-samson-kWpBUh2bdwE-unsplash.png?updatedAt=1691212067480",
      title: "Nike Air Max 270",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam dolorem.",
      isNew: false,
      oldPrice: 120,
      price: 100,
    },
  ];

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {data.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 30)}...</p>
            <div className="price">
              <h1>1 x ${item.price}</h1>
            </div>
          </div>
          <DeleteIcon className="delete" />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>$123</span>
      </div>
      <button>CHECKOUT</button>
      <span className="reset">Reset</span>
    </div>
  );
};

export default Cart;
