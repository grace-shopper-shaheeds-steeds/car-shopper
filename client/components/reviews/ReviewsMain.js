import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewSubmit from './ReviewSubmit'
import ReviewsList from './ReviewsList'
import ReviewLogin from './ReviewLogin'
import {addProductReview, getProductReviews} from '../../store'

export class ReviewsMain extends Component {
  constructor(){
    super()
    this.state = {
      rating: 0,
      content: ''
    }
  }

  componentDidMount (){
    this.props.productReviews(this.props.productId)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const review = {
      content: this.state.content,
      rating: Number(this.state.rating),
      productId: this.props.productId,
      userId: this.props.user.id
    }

    this.props.addReview(review)

    this.setState({
      rating: 0,
      content: ''
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.allReviews !== this.props.allReviews){
      this.props.productReviews(this.props.productId)
    }
  }

  onStarClick(nextValue) {
    this.setState({
      rating: Number(nextValue)
    })
  }

  render () {
    const { user, reviews } = this.props

    const reviewAuthStatus = (
      user.userType === 'user' || user.userType === 'administrator'
    )

    return (
      <div className="product-reviews">

        <h3 className="text-center">Product Reviews</h3>

        <div className="row justify-content-md-center">
          <div className="col col-lg-8">

            <ReviewsList
              reviews={reviews}
              productId={this.props.productId}
            />

            { reviewAuthStatus ? (
              <ReviewSubmit
                user={user}
                onStarClick={this.onStarClick.bind(this)}
                rating={this.state.rating}
                onContentChange={this.handleChange}
                onReviewSubmit={this.handleSubmit}
                review={this.state}
              />
              ) : (
                <ReviewLogin />
              )
            }

          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    reviews: state.reviewReducer.singleProductReviews,
    allReviews: state.reviewReducer.allReviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review) => {
      dispatch(addProductReview(review))
    },
    productReviews: (id) => {
      dispatch(getProductReviews(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsMain)
