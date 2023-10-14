import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item, id }) => {
  return (
    <div className="card">
      <Link className="link" to={`/product/${item?.title}`}>
        <div className="image">
          {item?.isNew ? <span>New Season</span> : null}
          <img
            srcSet={`
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_320,c_fill/${item.img?.data.attributes.url} 320w,
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_480,c_fill/${item.img?.data.attributes.url} 480w,
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_800,c_fill/${item.img?.data.attributes.url} 800w
            `}
            sizes="(max-width: 320px) 280px,
                    (max-width: 480px) 440px,
                    800px"
            src={`https://res.cloudinary.com/doxkzndkr/image/fetch/w_800,c_fill/${item.img?.data.attributes.url}`}
            alt={item.title}
            className="mainImg"
            loading="lazy"
          />
          <img
            srcSet={`
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_320,c_fill/${item.img2?.data.attributes.url} 320w,
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_480,c_fill/${item.img2?.data.attributes.url} 480w,
              https://res.cloudinary.com/doxkzndkr/image/fetch/w_800,c_fill/${item.img2?.data.attributes.url} 800w
            `}
            sizes="(max-width: 320px) 280px,
                    (max-width: 480px) 440px,
                    800px"
            src={`https://res.cloudinary.com/doxkzndkr/image/fetch/w_800,c_fill/${item.img2?.data.attributes.url}`}
            alt={item.title}
            className="secondImg"
            loading="lazy"
          />
        </div>
        <div className="pricesWrapper">
          <h2>{item.title}</h2>
          <div className="prices">
            {item?.type === "sale" ? (
              <h3 className="salePrice">${(50 + item.price).toFixed(2)}</h3>
            ) : null}
            <h3>${item.price}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
