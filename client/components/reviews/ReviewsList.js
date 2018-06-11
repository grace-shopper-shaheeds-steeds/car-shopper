import React from 'react'

const ReviewsList = ({reviews}) => {
  return (
    <div className="review-list">
      {
        reviews.map((review) => {
          return (
            <div key={review.id} className="card">
              <div className="card-header">
                User Id: {review.userId}
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{review.content}</p>
                  <footer>Rating: {review.rating}</footer>
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
