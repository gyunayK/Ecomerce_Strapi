import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
            <Link to="/products/1" className="link catBTN">
              WOMEN
            </Link>
        </div>
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
            <Link to="/products/2" className="link catBTN">
              men
            </Link>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
            <Link to="/products/3" className="link catBTN">
              children
            </Link>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
                alt=""
              />
                <Link to="/products/1" className="link catBTN">
                  Sale
                </Link>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img
                src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
                alt=""
              />
                <Link to="/products/1" className="link catBTN">
                  Sale
                </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
            <Link to="/products/1" className="link catBTN">
              Sale
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
