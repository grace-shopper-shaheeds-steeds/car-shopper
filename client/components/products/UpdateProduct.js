import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {updateProductThunk, getSingleProduct} from '../../store'

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

    render() {
        console.log('We made it to the updateComponent')
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

                <button type="submit">Submit</button>
            </form>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    console.log('state: ', state)
    return {singleProduct: state.productReducer.singleProduct}
}

const mapDispatchToProps = dispatch =>{
    return {
        updateProduct: (updatedProduct, productId) => dispatch(updateProductThunk(updatedProduct, productId)),
        displaySingleProduct: (singleProductId) => dispatch(getSingleProduct(singleProductId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateProduct))