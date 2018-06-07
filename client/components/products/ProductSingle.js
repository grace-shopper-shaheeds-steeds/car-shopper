import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleProduct } from '../../store'

export class ProductSingle extends Component {

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
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
                    <button type="button" className="btn btn-primary">
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
    product: state.productReducer.singleProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSingle)
