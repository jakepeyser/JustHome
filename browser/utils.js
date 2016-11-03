import React from 'react'
import FontIcon from 'material-ui/FontIcon'

export const roundPrice = (price) => price.toFixed(2);

export const getStars = (rating) => {
  const starArray = new Array(5).fill().map((val, i) => {
    return (rating > i) ? 'star' : 'star_border';
  })
  return (
    <div className="stars">
    {
      starArray.map((val, i) => {
        return <FontIcon key={i} className="material-icons">{ val }</FontIcon>
      })
    }
    </div>
  )
}
