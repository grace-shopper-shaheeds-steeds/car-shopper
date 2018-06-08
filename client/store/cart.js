import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const INCREMENT_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const DECREMENT_ITEM_FROM_CART = 'DECREMENT_ITEM_FROM_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const REMOVE_ITEM_FROM_CART_PRODUCTS = 'REMOVE_ITEM_FROM_CART_PRODUCTS'

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

const getCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products
  }
}

const removeItemFromCart = (newItems) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    newItems
  }
}

const removeItemFromCartProducts = (productToRemoveId) => {
  return {
    type: REMOVE_ITEM_FROM_CART_PRODUCTS,
    productToRemoveId
  }
}

const decrementItemFromCart = (productToDecrement) => {
  return {
    type: DECREMENT_ITEM_FROM_CART,
    productToDecrement
  }
}

const inrementItemToCart = (addedItem) => {
  return {
    type: INCREMENT_ITEM_TO_CART,
    addedItem
  }
}

export const fetchCartInfo = (info) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/cart/${info.userId}`)
    const data = response.data
    const action = getCart(data)
    dispatch(action)
  }
}

export const fetchCartProductInfo = (info) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/cart/${info.userId}/products`)
    const data = response.data
    const action = getCartProducts(data)
    dispatch(action)
  }
}


export const updateWithAdded = (info) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/cart/${info.userId}/add`, { carId: info.carId })
    const data = response.data
    const action = inrementItemToCart(data)
    dispatch(action)

    const nextResponse = await axios.get(`/api/cart/${info.userId}/products`)
    const nextData = nextResponse.data
    const secondAction = getCart(data)
    dispatch(secondAction)
  }
}

export const updateWithSubtracted = (info) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/cart/${info.userId}/subtract`, { carId: info.carId })
    const data = response.data
    const action = inrementItemToCart(data)
    dispatch(action)

    const nextResponse = await axios.get(`/api/cart/${info.userId}/products`)
    const nextData = nextResponse.data
    const secondAction = getCart(data)
    dispatch(secondAction)
  }
}

export const updatedWithRemoved = (info) => {
  return async (dispatch) => {
    const response = await axios.delete(`/api/cart/${info.userId}`, { carId: info.carId })
    const data = response.data
    const action = removeItemFromCart(data)
    const secondAction = removeItemFromCartProducts(info.carId)
    dispatch(action)
    dispatch(secondAction)
  }
}

const initialState = {
  cart: {},
  cartProducts: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case REMOVE_ITEM_FROM_CART:
      return {...state, cart: action.cart }
    case REMOVE_ITEM_FROM_CART_PRODUCTS:
      return {...state, products: state.products.filter(product => product.id !== action.productToRemoveId) }
    default:
      return state
  }
}
