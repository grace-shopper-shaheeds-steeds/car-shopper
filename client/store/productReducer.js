import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

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

const initialState = {
  allProducts: [],
  singleProduct: {}
}

export const productReducer = ( state = initialState, action) =>{
  switch (action.type){
      case ADD_PRODUCT:
          return {...state, allProducts: [...state.allProducts, action.newProduct]}
      case GET_ALL_PRODUCTS:
        return {...state, allProducts: action.products}
      default:
          return state
  }
}
