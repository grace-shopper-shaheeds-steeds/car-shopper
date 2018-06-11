import axios from 'axios';

const GOT_ALL_REVIEWS = 'GOT_ALL_REVIEWS'
const GET_SINGLE_PRODUCT_REVIEWS = 'GET_SINGLE_PRODUCT_REVIEWS'
const ADD_PRODUCT_REVIEW = 'ADD_PRODUCT_REVIEW'

const gotAllReviews = (reviews) => {
  return {
    type: GOT_ALL_REVIEWS,
    reviews
  }
}

const gotSingleProductReviews = (reviews) => {
  return {
    type: GET_SINGLE_PRODUCT_REVIEWS,
    reviews
  }
}

const addedProductReview = (review) => {
  return {
    type: ADD_PRODUCT_REVIEW,
    review
  }
}

export const getAllReviews = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/reviews')
    dispatch(gotAllReviews(data))
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

export const addProductReview = (review) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/reviews', review)
    dispatch(addedProductReview(data))
  }
}

const initialState = {
  allReviews: [],
  singleProductReviews: []
}

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_REVIEWS:
      return {...state, allReviews: action.reviews }
    case GET_SINGLE_PRODUCT_REVIEWS:
      return {...state, singleProductReviews: action.reviews}
    case ADD_PRODUCT_REVIEW:
      return {...state, allReviews: [...state.allReviews, action.review]}
    default:
      return state
  }
}
