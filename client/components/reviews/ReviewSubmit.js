import React from 'react'
import StarRating from 'react-star-rating-component'

const ReviewSubmit = ({user, onStarClick, rating, onContentChange}) => {
  return (
    <div className="submit-review">

      <h5>Hello, {user.fullName}! Would you like to leave a review?</h5>

      <form onChange={(event) => onContentChange(event)}>
        <div className="form-group">
          <StarRating
            renderStarIcon={() => <i className="fa fa-star" aria-hidden="true" />}
            name="productReview"
            value={rating}
            onStarClick={() => onStarClick()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea className="form-control" id="review" rows="3" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default ReviewSubmit
