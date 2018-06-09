import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {addNewCategory} from '../../store'


class AddCategory extends Component {
    constructor (){
        super();
        this.state ={
            name: ''
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log('this.state: ', this.state)
        this.props.createCategory(this.state)
        //this.props.history.push("/productList")
    }

    render() {
        return (
            this.props.user.userType === 'administrator' ?
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="name">Category Name: </label>
                <input name="name" type="text"  />

                <button type="submit">Submit</button>
            </form>: 
            <div>
                <h1>You are not an admin</h1>
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {user: state.user}
}

const mapDispatchToProps = dispatch =>{
    return {createCategory: (newCategory) => dispatch(addNewCategory(newCategory))}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)