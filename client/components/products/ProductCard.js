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
    const carId = this.props.product.id
    const info = { userId, carId }

    if (!this.props.user.id) info.userId = window.localStorage.getItem('tempUserId')

    this.props.addToCart(info)
  }

  deleteProduct = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${this.props.product.title}?`)){
      this.props.removeProduct(this.props.product.id)
    }
  }

  productAvailability = () => {
      let availability = !this.props.product.available
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
    return (
      <div className="card product-card" style={style.component}>
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

          <div className="row">

            <div className="col-sm">
            { user.userType === 'administrator' &&
              <ul className="product-edit-admin">
                <li>
                  <Link
                    to={`/updateProduct/${product.id}`}
                    style={style.link}>edit
                  </Link>
                </li>
                <li>
                  <a onClick={this.deleteProduct} href="#"> delete </a>
                </li>
              </ul>
            }
            </div>

          <div className="col-sm">

          <button
            onClick={this.handleCartAdd}
            type="button"
            className="btn btn-primary">
            Add to cart
          </button>

          </div>

          </div>

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
