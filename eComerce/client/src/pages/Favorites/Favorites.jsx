import { useState, useEffect } from "react";
import "./Favorites.scss";
import Card from "@/components/Card/Card";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  return (
    <div>
      <div className="favProductWrapper">
        <div className="top">
            <h1>Favorites</h1>
            <span>3 Item</span>
        </div>
        {favorites.map((item) => (
          <Card item={item} key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
