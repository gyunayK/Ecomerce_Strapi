import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item, id }) => {
  return (
    <div className="card">
      <Link className="link" to={`/product/${item?.title}`}>
        <div className="image">
          {item?.isNew ? <span>New Season</span> : null}
          <img src={item.img?.data.attributes.url} alt="" className="mainImg" />
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
              <h3 className="salePrice">${(50 + item.price).toFixed(2)}
              </h3>
            ) : null}
            <h3>${item.price}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
