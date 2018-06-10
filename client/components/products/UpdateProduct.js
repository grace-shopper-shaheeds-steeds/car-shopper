import React, { Component } from 'react'
import { connect } from 'react-redux'
import {updateProductThunk, getSingleProduct, getAllCategories, removeProductCategory} from '../../store'

export class UpdateProduct extends Component { // eslint-disable-line react/no-deprecated
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      inventoryQuantity: ''
    }
  }

  componentDidMount = () => {
    const id = this.props.match.params.productId;
    this.props.displaySingleProduct(id);
    this.props.displayCategories();
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
    this.props.history.push(`/products/${id}`)
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      title: nextProps.singleProduct.title,
      description: nextProps.singleProduct.description,
      price: nextProps.singleProduct.price,
      inventoryQuantity: nextProps.singleProduct.inventoryQuantity,
    })
  }

  deleteCategory = () => {
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
    return (
      <div className="container">
      {
        this.props.user.userType === 'administrator' ? (

        <div>
          <h2 className="text-center">Update Product</h2>

          <div className="row justify-content-md-center">
          <div className="col col-md-6">

            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input placeholder="Title" className="form-control" name="title" type="text" value={this.state.title} />

              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input placeholder="Description" className="form-control" name="description" type="text"  value={this.state.description} />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="price">Price</label>
                  <input placeholder="Price" className="form-control" name="price" type="number"  step="any" value={this.state.price} />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inventoryQuantity">Inventory Quantity</label>
                  <input placeholder="Inventory Quantity" className="form-control" name="inventoryQuantity" type="number" step="any"  value={this.state.inventoryQuantity} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo Url</label>
                <input placeholder="Photo Url"className="form-control" name="photo" type="text"  />
              </div>

              <div className="dropdown">
                <select name="category">
                  <option>Select Category</option>
                  {this.props.allCategories.map(category => {
                    return <option key={category.id}>{category.name}</option>
                  })}
                </select>
              </div>

              <button className="btn btn-primary" type="submit">Submit</button>
            </form>

            {this.props.singleProduct.category &&
              <div>
                <h3>Current Category: {this.props.singleProduct.category.name}</h3>
                <button type="button" onClick={this.deleteCategory}>Remove Category</button>
              </div>
            }

          </div>
          </div>

        </div>
        ) : (
          <h1>You are not an admin</h1>
        )
      }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.productReducer.singleProduct,
    allCategories: state.productReducer.allCategories,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (updatedProduct, productId) => dispatch(updateProductThunk(updatedProduct, productId)),
    displaySingleProduct: (singleProductId) => dispatch(getSingleProduct(singleProductId)),
    displayCategories: () => dispatch(getAllCategories()),
    removeACategory: (productId, updatedProduct) => dispatch(removeProductCategory(productId, updatedProduct))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
