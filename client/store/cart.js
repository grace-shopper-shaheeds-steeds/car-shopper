import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
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


export const fetchCartInfo = (info) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/cart/${info.userId}`)
    const data = response.data
    const action = getCart(data)
    dispatch(action)
  }
}

export const fetchCartProductInfo = (info) => {
  console.log('fetchproduct thunk')
  console.log('localstorage object', window.localStorage)
  window.localStorage.setItem('tester', 'dayy')
  return async (dispatch) => {
    const response = await axios.get(`/api/cart/${info.userId}/products`)
    const data = response.data
    const action = getCartProducts(data)
    dispatch(action)
  }
}


export const updateWithAdded = (info) => {
  return async (dispatch) => {
    await axios.put(`/api/cart/${info.userId}/add`, { carId: info.carId })
    const response = await axios.get(`/api/cart/${info.userId}`)
    const data = response.data
    const action = getCart(data)
    dispatch(action)
  }
}

export const updateWithSubtracted = (info) => {
  return async (dispatch) => {
    await axios.put(`/api/cart/${info.userId}/subtract`, { carId: info.carId })
    const response = await axios.get(`/api/cart/${info.userId}`)
    const data = response.data
    const action = getCart(data)
    dispatch(action)
  }
}


export const updatedWithRemoved = (info) => {
  return async (dispatch) => {
    await axios.put(`/api/cart/${info.userId}/delete`, { carId: info.carId })
    const response = await axios.get(`/api/cart/${info.userId}`)
    const data = response.data
    const action = getCart(data)
    dispatch(action)
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
    case GET_CART_PRODUCTS:
      return {...state, cartProducts: action.products}
    default:
      return state
  }
}
