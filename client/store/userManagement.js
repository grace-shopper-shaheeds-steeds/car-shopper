import axios from 'axios'
//import history from '../history'

const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const MAKE_ADMIN = 'MAKE_ADMIN'


const getAllUsers = users =>{
    return {
        type: GET_ALL_USERS,
        users
    }
}

const deleteUser = id => {
    return {
        type: DELETE_USER,
        id
    }
}

const makeAdmin = () => {
    return {
        type: MAKE_ADMIN,
        id,
        data
    }
}


export const getAllUsersThunk = () => {
    return async (dispatch) =>{
        const res = await axios.get('/api/admin/user')
        const data = res.data
        dispatch(getAllUsers(data))
    }
}

export const makeAdminThunk = (id, data) => {
    return async (dispatch) => {
        await axios.put(`/api/admin/user/${id}`, data)
        const res = await axios.get(`/api/admin/user`)
        const users = res.data
        dispatch(getAllUsers(users))
    }
}

export const deleteUserThunk = (id) =>{
    return async (dispatch) =>{
        await axios.delete(`/api/admin/user/${id}`)
        dispatch(deleteUser(id))
    }
}

const initialState = {
    allUsers: []
}

export const userManagementReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_ALL_USERS:
            return {...state, allUsers: action.users}
        case DELETE_USER: 
            let newAllUsers = state.allUsers.filter(user => user.id !== action.id)
            return {...state, allUsers: newAllUsers}
        default:
            return state
    }
}
