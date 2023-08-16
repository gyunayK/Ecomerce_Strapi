import "./Card.scss";

import { Link } from "react-router-dom";

const Card = ({ item, id }) => {
  const url = import.meta.env.VITE_APP_UPLOAD_URL;
  return (
    <Link className="link" to={`/product/${id}`}>
      <div className="card">
        <div className="image">
          {item?.isNew ? <span>New Season</span> : null}
          <img
            src={`${url}${item.img?.data.attributes.url}`}
            alt=""
            className="mainImg"
          />
          <img src={`${url}${item.img2?.data.attributes.url}`} alt="" className="secondImg" />
        </div>
        <h2>{item.title}</h2>
        <div className="prices">
          <h3>${item.price + 50}</h3>
          <h3>${item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
