import "./Product.scss";
import { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { toast } from "react-toastify";

import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import Suggestions from "../../components/Suggestion/Suggestions";
const Product = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const url_IMG = import.meta.env.VITE_APP_UPLOAD_URL;
  const api = import.meta.env.VITE_APP_URL_API;

  const { data, loading, error } = useFetch(`${api}/products/${id}?populate=*`);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("img");

  return (
    <>
      <div className="product">
        {loading ? (
          "loading..."
        ) : (
          <>
            {" "}
            <div className="left">
              <div className="images">
                <img
                  src={url_IMG + data?.attributes?.img?.data.attributes.url}
                  alt=""
                  onClick={(e) => setSelectedImg("img")}
                />
                <img
                  src={url_IMG + data?.attributes?.img2.data.attributes.url}
                  alt=""
                  onClick={(e) => setSelectedImg("img2")}
                />
              </div>
              <div className="mainImg">
                <img
                  src={
                    url_IMG + data?.attributes[selectedImg].data.attributes.url
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="right">
              <h1>{data?.attributes.title}</h1>
              <span className="price">${data?.attributes.price}</span>
              <p>{data?.attributes.desc}</p>
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
              <button
                className="button-63"
                onClick={() =>
                  toast.success("Product added to cart") &&
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.attributes.title,
                      desc: data.attributes.desc,
                      img: data.attributes.img.data.attributes.url,
                      price: data.attributes.price,
                      quantity: quantity,
                    })
                  )
                }
              >
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
            </div>{" "}
          </>
        )}
      </div>
      <Suggestions productID={id} />
    </>
  );
};

export default Product;
