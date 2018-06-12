import React, {Component} from 'react'
import { connect } from 'react-redux'
import StarRating from 'react-star-rating-component'

export class ReviewsList extends Component {

  componentDidMount(){

  }

  render() {
    const { reviews, user } = this.props
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
}


export default connect()(ReviewsList)
