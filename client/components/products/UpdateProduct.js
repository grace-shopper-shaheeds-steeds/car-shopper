import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {updateProductThunk, getSingleProduct, getAllCategories, removeProductCategory} from '../../store'

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

    componentDidMount = () => {
        const id = this.props.match.params.productId;
        this.props.displaySingleProduct(id);
        this.props.displayCategories();
        console.log('this.props: ', this.props)
        this.setState({
            title: this.props.singleProduct.title,
            description: this.props.singleProduct.description,
            price: this.props.singleProduct.price,
            inventoryQuantity: this.props.singleProduct.inventoryQuantity,
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        const id = this.props.match.params.productId
        this.props.updateProduct(this.state, id)
    }

    componentWillReceiveProps = nextProps =>{
        this.setState({
            title: nextProps.singleProduct.title,
            description: nextProps.singleProduct.description,
            price: nextProps.singleProduct.price,
            inventoryQuantity: nextProps.singleProduct.inventoryQuantity,
        })
    }

    deleteCategory = () =>{
        const id = this.props.match.params.productId;
        this.props.removeACategory(id, {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            inventoryQuantity: this.state.inventoryQuantity,
            categoryId: null
        })
    }

    render() {
        console.log('this.props.singleProduct: ', this.props.singleProduct)
        return (
            <div>
            <h1>Update Form</h1>
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="title">title:</label>
                <input name="title" type="text"  value={this.state.title}/>

                <label htmlFor="description">Description:</label>
                <input name="description" type="text"  value={this.state.description}/>

                <label htmlFor="price">Price:</label>
                <input name="price" type="number"  step="any" value={this.state.price}/>

                <label htmlFor="inventoryQuantity">Inventory Quantity:</label>
                <input name="inventoryQuantity" type="number" step="any"  value={this.state.inventoryQuantity}/>

                <label htmlFor="photo">Photo Url:</label>
                <input name="photo" type="text"  />

                <select name="category">
                    <option>Select Category</option>
                    {this.props.allCategories.map(category => {
                        return <option>{category.name}</option>
                    })}
                </select>

                <button type="submit">Submit</button>
            </form>
            {!!this.props.singleProduct.category ?
                <div>
                    <h3>Current Category: {this.props.singleProduct.category.name}</h3>
                    <button onClick={this.deleteCategory}>Remove Category</button>
                </div> : null
            }
            </div>
        )
    }
}


const mapStateToProps = state =>{
    console.log('state: ', state)
    return {
        singleProduct: state.productReducer.singleProduct,
        allCategories: state.productReducer.allCategories
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        updateProduct: (updatedProduct, productId) => dispatch(updateProductThunk(updatedProduct, productId)),
        displaySingleProduct: (singleProductId) => dispatch(getSingleProduct(singleProductId)),
        displayCategories: () => dispatch(getAllCategories()),
        removeACategory: (productId, updatedProduct) => dispatch(removeProductCategory(productId, updatedProduct))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateProduct))