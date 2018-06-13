import React from 'react'
import StarRating from 'react-star-rating-component'

const ReviewsList = ({ reviews }) => {
    return (
      <div className="review-list">
        {
          reviews.map((review) => {
            return (
              <div key={review.id} className="card">
                <div className="card-header">
                  User Name: {review.user.userName} - {review.createDate}
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{review.content}</p>
                    <footer>
                      <StarRating
                        renderStarIcon={() => <i className="fa fa-star" aria-hidden="true" />}
                        name="rating"
                        editing={false}
                        value={review.rating}
                      />
                    </footer>
                  </blockquote>
                </div>
              </div>
            )
          })
        }
      </div>
    )
}

export default ReviewsList
