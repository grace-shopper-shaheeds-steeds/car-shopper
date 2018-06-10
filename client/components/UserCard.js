import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserThunk, makeAdminThunk } from '../store'

const style = {
    component: {
      width: '15rem',
      marginBottom: 10
    },
    link: {
      paddingTop: '.375rem'
    }
  }

export class UserCard extends Component{

    deleteUser = () =>{
        this.props.deleteAUser(this.props.user.id)
    }

    adminStatus = () =>{
        const data = this.props.user.userType === 'user' ? {userType: 'administrator'}: {userType: 'user'}
        const id = this.props.user.id
        this.props.makeAdmin(id, data)
    }
    render(){
        return (
        <div className="card" style={style.component}>
        <img className="card-img-top" src={this.props.user.photo} />
        <div className="card-body">

          <h5>
            <Link to={`/user/${this.props.user.id}`}>{this.props.user.fullName}</Link>
          </h5>
          <p className="card-text">ID: {this.props.user.id}</p>
          <p className="card-text">Email: {this.props.user.email}</p>
          <p className="card-text">User Type: {this.props.user.userType}</p>
          {/* { user.userType === 'administrator' &&
            <Link to={`/updateProduct/${product.id}`} className="float-left" style={style.link}>edit</Link>
          } */}
          <button
          onClick={this.adminStatus}
            type="button"
            className="btn btn-primary float-left">
            Change User Type
          </button>
          <button
          onClick={this.deleteUser}
            type="button"
            className="btn btn-danger float-left">
            Delete User
          </button>

        </div>
      </div> 
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        deleteAUser: (id) => dispatch(deleteUserThunk(id)),
        makeAdmin: (id, data) => dispatch(makeAdminThunk(id, data))
    }
}

export default connect(null, mapDispatchToProps)(UserCard)