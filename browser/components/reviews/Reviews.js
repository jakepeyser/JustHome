import React from 'react';
import { fullName, getStars } from '../../utils'
import AddReviewContainer from './AddReviewContainer'

export default ({ user, productId, reviews, avgRating }) => {
  if (!avgRating) return null;
  return (

    <div id="reviews" className="col-xs-12">
    	<div className="row reviews-header">
        <h3>Reviews</h3>
        <div className="reviews-rating">
          <p>{ avgRating }</p>
          {
            getStars(avgRating)
          }
        </div>
    	</div>
      {
        // If the user is logged in and not an admin, show the Add Comment box
        Object.keys(user).length && !user.isAdmin ?
          <AddReviewContainer productId={productId} /> : null
      }
      {
        reviews && reviews.map((review) => {
          return (
            <div key={ review.id } className="row review">
              <h4>{ review.user ? fullName(review.user) : null }</h4>
              {
                getStars(review.rating)
              }
              <p>{ review.comment }</p>
            </div>
          )
        })
      }
    </div>
  	)
  };
