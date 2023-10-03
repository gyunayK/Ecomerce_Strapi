import "./Product.scss";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
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
const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("img");

  const [isFavorite, setIsFavorite] = useState(false);

  const [item, setItem] = useState([]);
  console.log(item);

  const dispatch = useDispatch();

  const id = useParams().id;
  const api = import.meta.env.VITE_APP_URL_API;
  const { data, loading, error } = useFetch(`${api}/products/${id}?populate=*`);

  const getItem = (data) => {
    const item = data?.attributes;
    setItem(item);
  };

  const handleAddToFavorites = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      if (favorites) {
        const exist = favorites.find((fav) => fav.id === id);
        if (exist) {
          toast.error("This product is already in your favorites");
        } else {
          const newFavorites = [...favorites, { ...item, id }];
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setIsFavorite(true);
          toast.success("Added to favorites");
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify([{ ...item, id }]));
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromFavorites = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      const newFavorites = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItem(data);

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      const exist = favorites.find((fav) => fav.id === id);
      if (exist) {
        setIsFavorite(true);
      }
    }
  }, [id, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div className="product">
        {loading ? (
           <Loading />
        ) : (
          <>
            {" "}
            <div className="left">
              <div className="images">
                <img
                  src={data?.attributes?.img?.data.attributes.url}
                  alt=""
                  onClick={(e) => setSelectedImg("img")}
                />
                <img
                  src={data?.attributes?.img2.data.attributes.url}
                  alt=""
                  onClick={() => setSelectedImg("img2")}
                />
              </div>
              <div className="mainImg">
                <img
                  src={data?.attributes[selectedImg].data.attributes.url}
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
                  <div className="icons">
                    {isFavorite ? (
                      <FavoriteIcon
                        className="favIconRed"
                        onClick={handleRemoveFromFavorites}
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon
                        className="favIcon"
                        onClick={handleAddToFavorites}
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
