import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {addNewProduct} from '../../store'

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            price: '',
            inventoryQuantity: ''
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createProduct(this.state)
      // REVIEW: what happens when product is created successfully
      //         what is the plan to make this an administrator only feature?
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="title">title:</label>
                <input name="title" type="text"  />

                <label htmlFor="description">Description:</label>
                <input name="description" type="text"  />

                <label htmlFor="price">Price:</label>
                <input name="price" type="number"  step="any"/>

                <label htmlFor="inventoryQuantity">Inventory Quantity:</label>
                <input name="inventoryQuantity" type="number" step="any"  />

                <label htmlFor="photo">Photo Url:</label>
                <input name="photo" type="text"  />

                <button type="submit">Submit</button>
            </form>
        )
    }

}


const mapDispatchToProps = dispatch => {
    return {createProduct: (newProduct) => dispatch(addNewProduct(newProduct))}
}
export default connect(null, mapDispatchToProps)(AddProduct)
