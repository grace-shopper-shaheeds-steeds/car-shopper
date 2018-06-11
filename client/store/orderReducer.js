import axios from 'axios'

const CONTACT_CREATE = 'CONTACT_CREATE'

const ORDER_GET_ALL = 'ORDER_GET_ALL'
const ORDER_GET = 'ORDER_GET'
const ORDER_CREATE = 'ORDER_CREATE'
const ORDER_UPDATE = 'ORDER_UPDATE'
const ORDER_DELETE = 'ORDER_DELETE'

export const addContact = (newContact) => {
    return {
        type: CONTACT_CREATE,
        payload: newContact
    }
}

const gotAllOrders = (orders) => {
  return {
    type: ORDER_GET_ALL,
    payload: orders
  }
}

const gotOneOrder = (order) => {
  return {
    type: ORDER_GET,
    payload: order
  }
}

const orderCreated = (order) => {
  return {
    type: ORDER_CREATE,
    payload: order
  }
}

const orderUpdated = (orders) => {
  return {
    type: ORDER_UPDATE,
    payload: orders
  }
}

const orderDeleted = (orders) => {
  return {
    type: ORDER_DELETE,
    payload: orders
  }
}

export const addNewContact = (newContact, userId) => {
  return async(dispatch) => {
      const payload = {
        address: newContact,
        userId: userId
      }
      // const res = await axios.post(`/api/addresses`, payload)
      // const createdContact = res.data
      dispatch(addContact(newContact))
  }
}

export const fetchAllOrders = () => {
  return async(dispatch) => {
      const res = await axios.get(`/api/orders`)
      const orders = res.data
      dispatch(gotAllOrders(orders))
  }
}

export const fetchOneOrder = (orderId) => {

  console.log('Logging:  Arrive at the REDUCER fetchOneOrder where orderId = ', orderId)

  return async(dispatch) => {
      const res = await axios.get(`/api/orders/${orderId}`)
      const order = res.data
      dispatch(gotOneOrder(order))
  }
}

export const updateOrder = (updatedOrder, orderId) => {
  return async(dispatch) => {
      let res = await axios.put(`/api/orders/${orderId}`, updatedOrder)
      res = await axios.get(`/api/orders`)
      const orders = res.data
      dispatch(orderUpdated(orders))
  }
}

export const createOrder = (newOrder) => {
  return async(dispatch) => {
    const res = await axios.post(`/api/orders`, newOrder)
    const order = res.data
    dispatch(orderCreated(order))
  }
}

export const deleteOrder = (orderId) => {
  return async(dispatch) => {
      let res = await axios.delete(`/api/orders/${orderId}`)
      res = await axios.get(`/api/orders`)
      const orders = res.data
      dispatch(orderDeleted(orders))
  }
}

const initialState = {
  orders: [],
  currentOrder: {},
  contact: {}
}

export const orderReducer = ( state = initialState, action) => {
  switch (action.type){
      case CONTACT_CREATE:
          return {...state, contact: action.payload }

      case ORDER_CREATE:
        return {
          ...state,
          orders: [...state.orders, action.payload],
          currentOrder: action.payload
        }

      case ORDER_GET_ALL:
        return {...state, orders: action.payload}

      case ORDER_GET:
        return {...state, currentOrder: action.payload}

      case ORDER_UPDATE:
        return {...state, orders: action.payload}

      case ORDER_DELETE:
        return {...state, orders: action.payload}

      default:
        return state
  }
}
