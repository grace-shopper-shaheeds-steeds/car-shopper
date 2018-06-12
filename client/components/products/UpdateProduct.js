import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {updateProductThunk, getSingleProduct, getAllCategories, removeProductCategory, toggleStatus} from '../../store'
import { ENGINE_METHOD_DIGESTS } from 'constants';

export class UpdateProduct extends Component { // eslint-disable-line react/no-deprecated
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      inventoryQuantity: '',
      defaultCat: '',
    }
  }

  componentDidMount = async () => {
    const id = this.props.match.params.productId;

    await this.props.displaySingleProduct(id)
    await this.props.displayCategories()

    this.setState({
      title: this.props.singleProduct.title,
      description: this.props.singleProduct.description,
      price: this.props.singleProduct.price,
      inventoryQuantity: this.props.singleProduct.inventoryQuantity,
      defaultCat: this.props.singleProduct.category.name
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const id = this.props.match.params.productId
    await this.props.updateProduct(this.state, id)
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

  categoryOptions = () => {
    return this.props.allCategories.map((cat) => {
      return { value: cat.name, label: cat.name  }
    })
  }

  productAvailability = async  () => {
    await this.props.displaySingleProduct(this.props.match.params.productId)
    let availability = !this.props.singleProduct.available
    let message = {
      title: this.props.singleProduct.title,
      description: this.props.singleProduct.description,
      price: this.props.singleProduct.price,
      inventoryQuantity: this.props.singleProduct.inventoryQuantity,
      available: availability
    }
    this.props.toggleAvailability(message, this.props.singleProduct.id)
}

  render() {
    const availability = this.props.singleProduct.available ? 'btn-success' : 'btn-secondary'
    const availableText = this.props.singleProduct.available ? 'True' : 'False'

    return (
      <div className="container">
      {
        this.props.user.userType === 'administrator' ? (

        <div>
          <h2 className="text-center page-header">Update Product</h2>

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

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="photo">Photo Url</label>
                  <input placeholder="Photo Url"className="form-control" name="photo" type="text" />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="category">Category</label>

                  { this.state.defaultCat &&
                    <Select
                      defaultValue={{
                        label: this.state.defaultCat,
                        value: this.state.defaultCat
                      }}
                      options={this.categoryOptions()}
                      value={this.state.value}
                      onChange={ (value) => {
                        this.setState({ category: value.label })
                      }}
                    />
                  }
                </div>
              </div>

              <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <button
              onClick={this.productAvailability}
              type="button"
              className={`btn ${availability} float-right`}>
              Product Availability: {availableText}
            </button>

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
    allProducts: state.productReducer.allProducts,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (updatedProduct, productId) => dispatch(updateProductThunk(updatedProduct, productId)),
    displaySingleProduct: (singleProductId) => dispatch(getSingleProduct(singleProductId)),
    displayCategories: () => dispatch(getAllCategories()),
    removeACategory: (productId, updatedProduct) => dispatch(removeProductCategory(productId, updatedProduct)),
    toggleAvailability: (message, productId) => dispatch(toggleStatus(message, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
