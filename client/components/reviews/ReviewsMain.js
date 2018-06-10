import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewSubmit from './ReviewSubmit'
import ReviewsList from './ReviewsList'

const reviewsDemo = [
  {id: 1, content: 'lorem ipsum dolar sit emit', rating: 3, productId: 9, userId: 3},
  {id: 2, content: 'lorem ipsum dolar sit emit', rating: 4, productId: 9, userId: 2},
  {id: 3, content: 'lorem ipsum dolar sit emit', rating: 5, productId: 9, userId: 1},
]

export class ReviewsMain extends Component {
  constructor(){
    super()
    this.state = {
      reviews: reviewsDemo,
      rating: 0,
      content: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  onStarClick(nextValue) {
    this.setState({rating: nextValue});
  }

  render () {
    const { user } = this.props

    const reviewAuthStatus = (
      user.userType === 'user' || user.userType === 'administrator'
    )

    return (
      <div className="product-reviews">

        <h3 className="text-center">Reviews</h3>

        <div className="row justify-content-md-center">
          <div className="col col-lg-8">

            <ReviewsList
              reviews={this.state.reviews}
              productId={this.props.productId}
            />

            { reviewAuthStatus &&
              <ReviewSubmit
                user={user}
                onStarClick={this.onStarClick.bind(this)}
                rating={this.state.rating}
                onContentChange={this.handleChange}
              />
            }

          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ReviewsMain)
