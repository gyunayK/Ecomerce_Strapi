import "./Products.scss";
const Products = () => {
  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          <div className="inputItem">
            <input type="checkbox" id="1" value={1} />
            <label htmlFor="1">Shoes</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="2" value={2} />
            <label htmlFor="2">Skirts</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="3" value={3} />
            <label htmlFor="3">Coats</label>
          </div>
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input type="range" min={0} max={1000} />
            <span>1000</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort By</h2>
          <div className="inputItem">
            <input type="radio" id="acs" value="acs" name="price" />
            <label htmlFor="acs">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" />
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
      </div>
    </div>
  );
};

export default Products;
