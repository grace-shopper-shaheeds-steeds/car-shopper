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
    }

    render() {
        console.log('this.props.allCategories: ', this.props.allCategories)
        return (
          <div className="container">

            <h2 className="text-center">Add New Product</h2>

            <div className="row justify-content-md-center">
            <div className="col col-md-6">
              <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input placeholder="Title" className="form-control" name="title" type="text"  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea placeholder="Description" className="form-control" name="description" type="text"  />
                </div>


                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="price">Price</label>
                    <input placeholder="Price" className="form-control" name="price" type="number" min="0" step="any" />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inventoryQuantity">Inventory Quantity</label>
                    <input placeholder="Inventory Quantity" className="form-control" name="inventoryQuantity" type="number" min="0" step="any" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="photo">Photo Url</label>
                  <input placeholder="Photo Url"className="form-control" name="photo" type="text"  />
                </div>

                <select name="category">
                    <option>Select Category</option>
                    {this.props.allCategories.map(category => {
                        return <option>{category.name}</option>
                    })}
                </select>
                  <button className="btn btn-primary" type="submit">Submit</button>
              </form>

            </div>
            </div>
          </div>
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
