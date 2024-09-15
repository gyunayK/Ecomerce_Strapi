import './ProductCardSkeleton.scss'
import PropTypes from 'prop-types'

ProductCardSkeleton.propTypes = {
  numberOfItems: PropTypes.number
}

export default function ProductCardSkeleton ({ numberOfItems }) {
  return (
    <div className="product-skeleton-wrapper">
      {Array.from({ length: numberOfItems }, (_, index) => (
        <div className="product-skeleton" key={index}>
          <div className="skeleton-image"></div>
          <div className="cardInformation">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-price"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
