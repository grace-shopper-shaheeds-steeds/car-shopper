import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {updateProductThunk} from '../../store'

class UpdateProduct extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            price: '',
            inventoryQuantity: '',
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const id = this.props.match.params.productId
        this.props.updateProduct(this.state, id)
        //await axios.put(`/api/products/${id}`, this.state)
    }

    render() {
        return (
            <div>
            <h1>Update Form</h1>
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
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {updateProduct: (updatedProduct, productId) => dispatch(updateProductThunk(updatedProduct, productId))}
}

export default connect(null, mapDispatchToProps)(UpdateProduct)