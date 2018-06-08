import axios from 'axios'
import history from '../history'

const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_CATEGORY = 'ADD_CATEGORY'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'

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

const gotSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

const searchAllProducts = (value) => {
  return {
    type: SEARCH_PRODUCTS,
    value
  }
}

const addCategory = category =>{
  return {
    type: ADD_CATEGORY,
    category
  }
}

export const addNewProduct = newProduct => {
  return async(dispatch) => {
    const res = await axios.post('/api/admin/products', newProduct)
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
    const { data } = await axios.get('/api/admin/category')
    console.log('data in thunk: ', data)
    const action = gotAllCategories(data)
    dispatch(action)
  }
}

export const updateProductThunk = (updatedProduct, productId) => {
  return async (dispatch) => {
    await axios.put(`/api/admin/products/${productId}`, updatedProduct)
    const res = await axios.get(`/api/products`)
    const updatedProductList = res.data;
    dispatch(gotAllProducts(updatedProductList))
    history.push('/productList')
  }
}

export const getSingleProduct = productId => {
  return async dispatch => {
    const res = await axios.get(`/api/products/${productId}`)
    const singleProduct = res.data
    dispatch(gotSingleProduct(singleProduct))
  }
}

export const searchingAllProducts = (value) => {
  return async (dispatch) => {
    await dispatch(getAllProducts())
    dispatch(searchAllProducts(value))
  }
}

export const addNewCategory = newCategory => {
  return async dispatch =>{
    const res = await axios.post('/api/admin/category', newCategory)
    const category = res.data
    dispatch(addCategory(category))
  }
}

export const removeProductCategory = (productId, updatedProduct) =>{
  return async dispatch =>{
    await axios.put(`/api/admin/products/${productId}`, updatedProduct)
    const {data} = await axios.get('/api/products')
    dispatch(gotAllCategories(data))
  }
}

const initialState = {
  allProducts: [],
  allCategories: [],
  singleProduct: {},
  searchResult: {
    value: '',
    matches: []
  },
  allCategory: []
}

export const productReducer = ( state = initialState, action) => {
  switch (action.type){
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.newProduct]}
    case ADD_CATEGORY: 
      return {...state, allCategory: [...state.allCategory, action.category]}
    case GET_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_ALL_CATEGORIES:
      return {...state, allCategories: action.categories}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case SEARCH_PRODUCTS: {
      const searchString = action.value.toLowerCase()
      const matches = state.allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchString)
      })
      return {...state, searchResult: {value: action.value, matches }}
    }
    default:
      return state
  }
}