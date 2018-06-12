import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateWithAdded } from '../../store/cart'
import {removeAProduct,  updateProductThunk} from '../../store'

const style = {
  component: {
    width: '15rem',
    marginBottom: 10
  },
  link: {
    paddingTop: '.375rem'
  }
}

export class ProductCard extends Component {

  handleCartAdd= (event) => {
    event.preventDefault()

    const userId = this.props.user.id

    const info = {
      userId,
      carId: this.props.product.id
    }
    if (!this.props.user.id) info.userId = window.localStorage.getItem('tempUserId')

    this.props.addToCart(info)
  }

  deleteProduct = () => {
    console.log('this.props.product: ', this.props.product)
    if(window.confirm(`Are you sure you want to delete ${this.props.product.title}?`)){
      this.props.removeProduct(this.props.product.id)
    }
  }

  productAvailability = () => {
      let availability = this.props.product.available ? false : true
      let message = {
        title: this.props.product.title,
        description: this.props.product.description,
        price: this.props.product.price,
        inventoryQuantity: +this.props.product.inventoryQuantity,
        available: availability
      }
      console.log('message: ', message)
      this.props.toggleAvailability(message, this.props.product.id)
  }

  render(){
    const { product, user } = this.props
    console.log('product: ', product)
    return (
      <div className="card" style={style.component}>
        <img className="card-img-top" src={product.photo} alt={product.title} />
        <div className="card-body">

          <h5>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </h5>

          { product.category !== null &&
            <p className="card-text">{product.category.name}</p>
          }

          <p className="card-text">ID: {product.id}</p>
          <p className="card-text">{product.description}</p>
          { user.userType === 'administrator' &&
            <Link to={`/updateProduct/${product.id}`} className="float-left" style={style.link}>edit</Link>
          }

          <button
            onClick={this.handleCartAdd}
            type="button"
            className="btn btn-primary float-right">
            Add to cart
          </button>
          <button
            onClick={this.deleteProduct}
            type="button"
            className="btn btn-danger float-right">
            Delete Product
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (info) => {
      dispatch(updateWithAdded(info))
    },
    removeProduct: (productId) => dispatch(removeAProduct(productId)),
    toggleAvailability: (message, productId) => dispatch(updateProductThunk(message, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
