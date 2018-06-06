import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

const addProduct = newProduct => {
    return {
        type: ADD_PRODUCT,
        newProduct
    }
}


const gotAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

const gotAllCategories = (categories) => {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  }
}

export const addNewProduct = newProduct => {
    return async(dispatch) => {
        const res = await axios.post('/api/products', newProduct)
        const createdProduct = res.data
        dispatch(addProduct(createdProduct))
    }
}
export const getAllProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/products')
    const action = gotAllProducts(data)
    dispatch(action)
  }
}

export const getAllCategories = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/categories')
    const action = gotAllCategories(data)
    dispatch(action)
  }
}

export const updateProductThunk = (updatedProduct, productId) =>{
  return async (dispatch) =>{
    console.log('productId: ', productId)
      await axios.put(`/api/products/${productId}`, updatedProduct)
      const res = await axios.get(`/api/products`)
      const updatedProductList = res.data;
      dispatch(gotAllProducts(updatedProductList))
  }
}

const initialState = {
  allProducts: [],
  allCategories: [],
  singleProduct: {}
}

export const productReducer = ( state = initialState, action) =>{
  switch (action.type){
      case ADD_PRODUCT:
          return {...state, allProducts: [...state.allProducts, action.newProduct]}
      case GET_ALL_PRODUCTS:
        return {...state, allProducts: action.products}
      case GET_ALL_CATEGORIES:
        return {...state, allCategories: action.categories}
      default:
          return state
  }
}

