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
        if(window.confirm(`Are you sure you want to delete ${this.props.user.fullName}?`)){
          this.props.deleteAUser(this.props.user.id)
        }
    }

    adminStatus = () =>{
        const data = this.props.user.userType === 'user' ? {userType: 'administrator'}: {userType: 'user'}
        const id = this.props.user.id
        this.props.makeAdmin(id, data)
    }
    render(){
        let title = !!this.props.user.firstName ? this.props.user.fullName : this.props.user.email
        let email = title !== this.props.user.email ?  this.props.user.email : null
        //User name logic for Oauth Login
        // let userName = this.props.user.userName ? this.props.user.userName : this.props.user.email.slice(0, 2) + this.props.user.id
        console.log('email: ', this.props.user.email)
        console.log('userName: ', this.props.user.userName)
        return (
        <div className="card" style={style.component}>
        <img className="card-img-top" src={this.props.user.photo} />
        <div className="card-body">

          <h5>
            <Link to={`/user/${this.props.user.id}`}>{title}</Link>
          </h5>
          <p className="card-text">ID: {this.props.user.id}</p>
          {title !== this.props.user.email ? 
            <p className="card-text">Email: {email}</p>: null
          }
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