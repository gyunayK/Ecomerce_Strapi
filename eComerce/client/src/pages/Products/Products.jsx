import "./Products.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import List from "@/components/List/List";
import useFetch from "@/hooks/useFetch";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const url = import.meta.env.VITE_APP_URL_API;

  const { data, loading, error } = useFetch(
    `${url}/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedSubCategories([...selectedSubCategories, e.target.value]);
    } else {
      setSelectedSubCategories(
        selectedSubCategories.filter((item) => item !== e.target.value)
      );
    }
  }

  console.log(selectedSubCategories);


  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((subCategory) => {
            return (
              <div className="inputItem" key={subCategory.id}>
                <input
                  type="checkbox"
                  id={subCategory.id}
                  value={subCategory.id}
                  name={subCategory.name}
                  onChange={handleChange}
                />
                <label htmlFor={subCategory.id}>{subCategory.attributes.title}</label>
              </div>
            );
          })}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
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
        <img
          className="catImg"
          src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCategories}/>
      </div>
    </div>
  );
};

export default Products;
