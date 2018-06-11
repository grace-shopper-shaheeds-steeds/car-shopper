import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReviewSubmit from './ReviewSubmit'
import ReviewsList from './ReviewsList'
import ReviewLogin from './ReviewLogin'

export class ReviewsMain extends Component {
  constructor(){
    super()
    this.state = {
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
    user: state.user
  }
}

export default connect(mapStateToProps)(ReviewsMain)
