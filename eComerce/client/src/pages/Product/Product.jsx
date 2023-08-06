import "./Product.scss";
import { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
const Product = () => {
  const data = [
    "https://ik.imagekit.io/riviaa/ImgEC/taylor-smith-aDZ5YIuedQg-unsplash.png?updatedAt=1691212067215",
    "https://ik.imagekit.io/riviaa/ImgEC/ryan-plomp-76w_eDO1u1E-unsplash%201.png?updatedAt=1691212067523",
  ];

  const [quantity, setQuantity] = useState(1);

  const [selectedImg, setSelectedImg] = useState(data[0]);

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={data[0]} alt="" onClick={(e) => setSelectedImg(data[0])} />
          <img src={data[1]} alt="" onClick={(e) => setSelectedImg(data[1])} />
        </div>
        <div className="mainImg">
          <img src={selectedImg} alt="" />
        </div>
      </div>
      <div className="right">
        <h1>Title</h1>
        <span className="price">$199</span>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi
          magnam labore incidunt amet quisquam necessitatibus vero expedita ea.
          Sint officiis cumque ipsa quibusdam rem totam repellat modi
          perspiciatis ab.
        </p>
        <div className="quantity">
          <button
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <button className="add">
          <ShoppingCartIcon />
          ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon />
            <span>ADD TO WISHLIST</span>
          </div>
          <div className="item">
            <BalanceIcon />
            <span>ADD TO COMPARE</span>
          </div>
        </div>
        <div className="info">
          <span>Vendor: Polo</span>
          <span>Product Type: T-Shirt</span>
          <span>Tag: T-Shirt, Women, Top</span>
        </div>

        <hr />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL IFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
