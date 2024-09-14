import './CheckboxSkeleton.scss'
import PropTypes from 'prop-types'

const CheckboxSkeleton = ({ numberOfItems }) => {
  return (
    <>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <div className="checkbox-skeleton-wrapper" key={index}>
          <div className="skeleton-checkbox"></div>
          <div className="skeleton-label"></div>
        </div>
      ))}
    </>
  )
}

CheckboxSkeleton.propTypes = {
  numberOfItems: PropTypes.number,
}

export default CheckboxSkeleton
