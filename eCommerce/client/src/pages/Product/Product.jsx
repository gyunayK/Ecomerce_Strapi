import "./Product.scss";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import Suggestions from "../../components/Suggestion/Suggestions";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "@/components/Loading/Loading";

import { useFavorites } from "@/hooks/useFavorites";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("img");
  const [item, setItem] = useState([]);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const { title } = useParams();

  const {
    isFavorite,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    checkIfFavorite,
  } = useFavorites();

  const api = import.meta.env.VITE_APP_URL_API;
  const { data } = useFetch(
    `${api}/products?populate=*&[filters][title][$eq]=${title}`
  );

  const getItem = (data) => {
    if (data && data.length > 0) {
      setItem(data[0].attributes);
      setId(data[0].id);
    }
  };

  const addToFavorites = () => {
    handleAddToFavorites(item, id);
  };

  const removeFromFavorites = () => {
    handleRemoveFromFavorites(id);
  };
  useEffect(() => {
    checkIfFavorite(id);
  }, [id, checkIfFavorite]);

  useEffect(() => {
    if (title) {
      getItem(data);
    }
  }, [data, title]);

  useEffect(() => {
    if (item && item.id) {
      checkIfFavorite(item.id);
    }
  }, [item, checkIfFavorite]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title, id]);

  return (
    <>
      <div className="product">
        {!item || Object.keys(item).length === 0 ? (
          <Loading />
        ) : (
          <>
            {" "}
            <div className="left">
              <div className="images">
                <img
                  src={item?.img?.data.attributes.url}
                  alt=""
                  onClick={(e) => setSelectedImg("img")}
                />
                <img
                  src={item?.img2.data.attributes.url}
                  alt=""
                  onClick={() => setSelectedImg("img2")}
                />
              </div>
              <div className="mainImg">
                <img src={item?.[selectedImg].data.attributes.url} alt="" />
              </div>
            </div>
            <div className="right">
              <h1>{item?.title}</h1>
              <span className="price">
                {item?.type === "sale" ? (
                  <h3 className="salePrice">${(50 + item.price).toFixed(2)}</h3>
                ) : null}
                ${item?.price}
              </span>
              <p>{item?.desc}</p>
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
                      id: id,
                      title: item.title,
                      desc: item.desc,
                      img: item.img.data.attributes.url,
                      price: item.price,
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
                  <div className="icons">
                    {isFavorite ? (
                      <FavoriteIcon
                        className="favIconRed"
                        onClick={removeFromFavorites}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        className="favIcon"
                        onClick={addToFavorites}
                      />
                    )}
                  </div>
                  <span>ADD TO FAVORITES</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Suggestions productID={id} />
    </>
  );
};

export default Product;
