import React from 'react';
import { getStars } from '../utils'

export default ({ reviews, avgRating }) => {
  return (

    <div id="reviews" className="col-xs-12">
    	<div className="row reviews-header">
        <h3>Reviews</h3>
        <div className="reviews-rating">
          <p>4.2</p>
          {
            getStars(avgRating)
          }
        </div>
    	</div>
      {
        reviews.map((review) => {
          return (
            <div key={review.id} className="row review">
              <h4>User Name</h4>
              {
                getStars(review.rating)
              }
              <p>{review.comment}</p>
            </div>
          )
        })
      }
    </div>
  	)
  };
