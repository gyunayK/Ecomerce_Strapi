import './CheckboxSkeleton.scss'
import PropTypes from 'prop-types'

CheckboxSkeleton.propTypes = {
  numberOfItems: PropTypes.number
}

export default function CheckboxSkeleton ({ numberOfItems }) {
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
