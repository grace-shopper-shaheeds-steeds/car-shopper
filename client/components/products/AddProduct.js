import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addNewProduct, getAllCategories} from '../../store'

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
    componentDidMount = () =>{
        this.props.displayCategories();
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        this.props.createProduct(this.state)
        //this.props.history.push("/productList")
    }

    render() {
        console.log('this.props.allCategories: ', this.props.allCategories)
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="title">title:</label>
                <input name="title" type="text" />

                <label htmlFor="description">Description:</label>
                <input name="description" type="text" />

                <label htmlFor="price">Price:</label>
                <input name="price" type="number" step="any" />

                <label htmlFor="inventoryQuantity">Inventory Quantity:</label>
                <input name="inventoryQuantity" type="number" step="any" />

                <label htmlFor="photo">Photo Url:</label>
                <input name="photo" type="text" />

                <select name="category">
                    <option>Select Category</option>
                    {this.props.allCategories.map(category => {
                        return <option>{category.name}</option>
                    })}
                </select>

                <button type="submit">Submit</button>
            </form>
        )
    }

}


const mapStateToProps = state =>{
    return {allCategories: state.productReducer.allCategories}
}

const mapDispatchToProps = dispatch => {
    return { 
        createProduct: (newProduct) => dispatch(addNewProduct(newProduct)),
        displayCategories: () => dispatch(getAllCategories()) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
