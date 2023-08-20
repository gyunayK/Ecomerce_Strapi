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
          <button>
            <Link to="/products/1" className="link">
              WOMEN
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
          <button>
            <Link to="/products/2" className="link">
              men
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
          <button>
            <Link to="/products/3" className="link">
              children
            </Link>
          </button>
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
              <button>
                <Link to="/products/1" className="link">
                  Sale
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img
                src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
                alt=""
              />
              <button>
                <Link to="/products/1" className="link">
                  Sale
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://ik.imagekit.io/riviaa/ImgEC/martin-katler-1kOIl9vu4cY-unsplash.png?updatedAt=1691212067564"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link">
              Sale
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
