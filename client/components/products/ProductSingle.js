import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProduct, updateWithAdded } from '../../store'

export class ProductSingle extends Component {

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
  }

  handleCartAdd = (event) => {
    event.preventDefault()
    const userId = this.props.user.id

    const info = {
      userId,
      carId: this.props.product.id
    }

    this.props.addToCart(info)
  }

  render () {
    const { product } = this.props
    const quantity = product.inventoryQuantity - product.soldQuantity
    return (
      <div className="container">
          {
            product &&
            <div className="row">
              <div className="col-8">
                <img src={product.photo} />
              </div>
              <div className="col-4">
                <h5>ID: {product.id} - {product.title}</h5>
                <h5>Price: ${product.price}</h5>
                <p>Description: {product.description}</p>
                {
                  quantity ? (
                    <button
                      onClick={this.handleCartAdd}
                      type="button"
                      className="btn btn-primary float-right">
                      Add to cart
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary" disabled>
                      Out of stock
                    </button>
                  )
                }
              </div>
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.singleProduct,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id))
    },
    addToCart: (info) => {
      dispatch(updateWithAdded(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSingle)
