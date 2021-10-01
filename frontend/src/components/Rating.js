import React from 'react'
import PropTypes from 'prop-types'
const Rating = ({ value, text, color }) => {
  const stars = [1, 2, 3, 4, 5].map(s => (
    <i
      style={{ color }}
      key={s}
      className={
        value >= s
          ? 'fas fa-star'
          : value >= s - 0.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'
      }
    ></i>
  ))
  return (
    <div className='rating'>
      <span>{stars}</span> {text}
    </div>
  )
}
Rating.defaultProps = {
  color: '#f8e825'
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
}
export default Rating
