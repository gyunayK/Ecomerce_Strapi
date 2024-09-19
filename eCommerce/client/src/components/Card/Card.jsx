import './Card.scss'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFavorites } from '@/hooks/useFavorites'

Card.propTypes = {
  item: PropTypes.object,
  id: PropTypes.number
}

export default function Card ({ item, id }) {
  const {
    isFavorite,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    checkIfFavorite
  } = useFavorites()

  const checkWindoLocation = () => {
    if (
      window.location.pathname.includes('favorites') ||
      window.location.pathname.includes('products') ||
      window.location.pathname.includes('product')
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    checkIfFavorite(id)
  }, [id, checkIfFavorite])

  return (
    <div className="card">
      {checkWindoLocation() ? (
        <div className="cardFavIcon">
          {isFavorite ? (
            <FavoriteIcon
              className="favIconRed"
              onClick={() => handleRemoveFromFavorites(id)}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="favIcon"
              onClick={() => handleAddToFavorites(item, id)}
            />
          )}
        </div>
      ) : null}
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
            {item?.type === 'sale' ? (
              <h3 className="salePrice">${(50 + item.price).toFixed(2)}</h3>
            ) : null}
            <h3>${item.price}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}
