import "./Products.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import List from "@/components/List/List";
import { makeRequest } from "@/hooks/makeRequest";
import { BsFilterCircle } from "react-icons/bs";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeRequest.get(
          `/categories?populate=*&[filters][categories][id][$eq]=${catId}`
        );
        setCategories(response.data);
      } catch (error) {
        // Handle error. With Axios, error responses are caught in the catch block
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
        }
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await makeRequest.get(
          `/sub-categories?populate=*&[filters][categories][id][$eq]=${catId}`
        );
        setSubCategories(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, [catId]);

  console.log(categories);

  // This is a workaround for the fact that the API doesn't return the image URL for all sizes (large/medium/small)
  const category = categories?.data?.find((cat) => cat.id === catId);
  const imagePath =
    category?.attributes?.img?.data?.attributes?.formats?.large?.url ||
    category?.attributes?.img?.data?.attributes?.formats?.small?.url ||
    category?.attributes?.img?.data?.attributes?.formats?.medium?.url ||
    "";

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedSubCategories([...selectedSubCategories, e.target.value]);
    } else {
      setSelectedSubCategories(
        selectedSubCategories.filter((item) => item !== e.target.value)
      );
    }
  };

  return (
    <div className="products">
      <div className="hamburger" onClick={toggleMenu}>
        <BsFilterCircle />
      </div>

      <div className={isMenuOpen ? "left open" : "left"}>
        <div className="filterItem">
          <h2>Product Categories</h2>
          {subCategories.data?.map((subCategory) => {
            return (
              <div className="inputItem" key={subCategory.id}>
                <input
                  type="checkbox"
                  id={subCategory.id}
                  value={subCategory.id}
                  name={subCategory.name}
                  onChange={handleChange}
                />
                <label htmlFor={subCategory.id}>
                  {subCategory.attributes.title}
                </label>
              </div>
            );
          })}
        </div>
        <div className="filterItem">
          <h1 id="priceFilterLabel">Filter by price</h1>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              id="priceRangeInput"
              aria-labelledby="priceFilterLabel"
              min={0}
              max={1000}
              onMouseUp={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort By</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="acs"
              value="acs"
              name="price"
              onChange={() => setSort("asc")}
            />
            <label htmlFor="acs">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img className="categoryIMG" src={imagePath} alt="" />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCategories}
        />
      </div>
    </div>
  );
};

export default Products;
