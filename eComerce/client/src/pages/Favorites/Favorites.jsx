import { useState, useEffect } from "react";
import "./Favorites.scss";
import Card from "@/components/Card/Card";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const favoritesCount = () => {
    if (favorites.length === 1) {
      return <span>1 Item</span>;
    } else if (favorites.length > 1) {
      return <span>{favorites.length} Items</span>;
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  return (
    <div className="favProductWrapper">
      <div className="top">
        <h1>Favorites</h1>
        {favoritesCount()}
      </div>
      <div className="cardWrapper">
        {favorites.map((item) => (
          <Card item={item} key={item.id} id={item.id} />
        ))}
        {favorites.length === 0 && (
          <div className="empty">
            <h2>Your Favorites is Empty</h2>
            <p>
              You have no items in your Favorites. Start shopping now to find
              your favorite items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
