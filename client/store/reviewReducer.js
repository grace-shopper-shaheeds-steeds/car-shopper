import axios from 'axios';

const GET_SINGLE_PRODUCT_REVIEWS = 'GET_SINGLE_PRODUCT_REVIEWS'

const gotSingleProductReviews = (reviews) => {
  return {
    type: GET_SINGLE_PRODUCT_REVIEWS,
    reviews
  }
}

export const getProductReviews = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/reviews')

    const productReviews = data.filter((review) => {
      return review.productId === Number(productId)
    })

    dispatch(gotSingleProductReviews(productReviews))
  }
}

const initialState = {
  singleProductReviews: []
}

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT_REVIEWS: {
      return {...state, singleProductReviews: action.reviews}
    }
    default:
      return state
  }
}
