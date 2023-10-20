import { useState, useEffect, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const searchRef = useRef(null);

  const url = import.meta.env.VITE_APP_URL_API;

  //every word has to be capitalized
  const fetchUrl = `${url}/products?populate=*&[filters][title][$contains]=${searchTerm.replace(
    /\b[a-z]/g,
    (char) => char.toUpperCase()
  )}`;

  const shouldFetch = searchTerm !== "";
  const { data } = useFetch(fetchUrl, shouldFetch);

  const handleOutsideClick = (e) => {
    if (!searchRef.current.contains(e.target)) {
      setSearchTerm("");
      setSearchItems([]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchTerm("");
      setSearchItems([]);
    }, 500);

    return () => {
      clearTimeout();
    };
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
    <div className="search-box" ref={searchRef}>
      <button className="btn-search" aria-label="Search">
        <SearchOutlinedIcon />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Type to Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onBlur={handleBlur}
      />
      {searchItems.length !== 0 ? (
        <div className="searchItems">
          {searchItems?.map((item) => {
            return (
              <div className="searchItem" key={item.id}>
                <Link
                  className="searchLink"
                  to={`/product/${item.attributes.title}`}
                  onClick={() => {
                    setSearchTerm("");
                    setSearchItems([]);
                  }}
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
