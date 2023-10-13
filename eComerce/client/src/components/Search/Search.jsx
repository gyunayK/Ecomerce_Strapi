import { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const url = import.meta.env.VITE_APP_URL_API;

  //every word has to be capitalized
  const fetchUrl = `${url}/products?populate=*&[filters][title][$contains]=${searchTerm.replace(
    /\b[a-z]/g,
    (char) => char.toUpperCase()
  )}`;

  const shouldFetch = searchTerm !== "";
  const { data, loading, error } = useFetch(fetchUrl, shouldFetch);

  const handleClick = () => {
    setSearchItems([]);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchItems([]);
      return;
    }

    if (data) {
      setSearchItems(data);
    }
  }, [data, searchTerm]);
  return (
    <div className="search-box">
      <button className="btn-search" aria-label="Search">
        <SearchOutlinedIcon />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Type to Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onBlur={handleClick}
      />
      {searchItems.length !== 0 ? (
        <div className="searchItems">
          {searchItems?.map((item) => {
            return (
              <div className="searchItem" key={item.id}>
                <Link
                  to={`/product/${item.attributes.title}`}
                  onClick={handleClick}
                >
                  <img
                    src={item.attributes.img.data.attributes.url}
                    alt={item.attributes.title}
                  />
                  <div className="content">
                    <h3>{item.attributes.title}</h3>
                    <span>$ {item.attributes.price}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Search;
