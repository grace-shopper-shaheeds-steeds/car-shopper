import React from 'react'
import StarRating from 'react-star-rating-component'

const ReviewSubmit = ({user, onStarClick, onContentChange, onReviewSubmit, review}) => {
  return (
    <div className="submit-review">

      <h5>Hello, {user.fullName}! Would you like to leave a review?</h5>

      <form
        onChange={(event) => onContentChange(event)}
        onSubmit={(event) => onReviewSubmit(event)}
      >
        <div className="form-group">
          <StarRating
            renderStarIcon={() => <i className="fa fa-star" aria-hidden="true" />}
            name="rating"
            value={Number(review.rating)}
            onStarClick={() => onStarClick()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea name="content" className="form-control" id="review" rows="3" value={review.content} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default ReviewSubmit
