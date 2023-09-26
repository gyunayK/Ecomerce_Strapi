import "./Card.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Card = ({ item, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

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
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      const exist = favorites.find((fav) => fav.id === id);
      if (exist) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  return (
    <div className="cardWrapper">
      <div className="card">
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
        <Link className="link" to={`/product/${id}`}>
          <div className="image">
            {item?.isNew ? <span>New Season</span> : null}
            <img
              src={item.img?.data.attributes.url}
              alt=""
              className="mainImg"
            />
            <img
              src={item.img2?.data.attributes.url}
              alt=""
              className="secondImg"
            />
          </div>
          <div className="pricesWrapper">
            <h2>{item.title}</h2>
            <div className="prices">
              {item?.type === "sale" ? (
                <h3 className="salePrice">${item.price + 50}</h3>
              ) : null}
              <h3>${item.price}</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
