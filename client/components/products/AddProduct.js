import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        //this.props.history.push("/productList")
    }

    render() {
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

                  <button className="btn btn-primary" type="submit">Submit</button>
              </form>

            </div>
            </div>
          </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
      createProduct: (newProduct) => dispatch(addNewProduct(newProduct))
    }
}
export default connect(null, mapDispatchToProps)(AddProduct)
