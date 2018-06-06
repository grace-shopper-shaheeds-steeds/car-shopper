import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger'; 
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'

const addProduct = newProduct => {
    return {
        type: ADD_PRODUCT,
        newProduct
    }
}

const initialState = {
    allProducts: [],
    singleProduct: {}
}

export const productReducer = (state=initialState, action) =>{
    switch(action.type){
        case ADD_PRODUCT:
            return {...state, allProducts: [...state.allProducts, action.newProduct]}
        default:
            return state
    }
}

export const addNewProduct = newProduct => {
    return async(dispatch) =>{
        const res = await axios.post('/api/products', newProduct)
        const createdProduct = res.data
        dispatch(addProduct(createdProduct))
    }
}

export const updateProductThunk = updatedProduct =>{
    return async (dispatch) =>{
        await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
    }
}
