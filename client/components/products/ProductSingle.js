import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { ReviewsMain } from '../reviews'
import { getSingleProduct, updateWithAdded } from '../../store'

export class ProductSingle extends Component {

  componentDidMount = async () => {
    const id = this.props.match.params.id
    await this.props.getSingleProduct(id)
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
    const { product, user } = this.props
    const quantity = product.inventoryQuantity - product.soldQuantity
    return (
      <div className="container product-single">
          {
            product &&
            <div className="row justify-content-md-center">

              <div className="col col-lg-4">
                <img src={`${product.photo}`} />
              </div>

              <div className="col col-lg-4">
                <h3>{product.title}</h3>
                <p className="description">{product.description}</p>

                { product.categoryId > 0 &&
                  <ProductDetails
                    product={product}
                    category={product.category}
                  />
                }

                <hr />

                { user.userType === 'administrator' &&
                  <Link to={`/updateProduct/${product.id}`} className="float-left">edit</Link>
                }

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

          { product.id &&
            <ReviewsMain productId={product.id} />
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
