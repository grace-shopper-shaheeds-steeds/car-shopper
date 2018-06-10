import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { getSingleProduct, updateWithAdded, getAllCategories } from '../../store'

export class ProductSingle extends Component {

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getSingleProduct(id)
    this.props.getCategories()
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
    const { product, user, categories } = this.props
    const quantity = product.inventoryQuantity - product.soldQuantity
    const category = categories[product.categoryId - 1]
    return (
      <div className="container product-single">
          {
            product &&
            <div className="row justify-content-md-center">

              <div className="col col-lg-4">
                <img src={`/${product.photo}`} />
              </div>

              <div className="col col-lg-4">
                <h3>{product.title}</h3>
                <p className="description">{product.description}</p>

                { category &&
                 <ProductDetails product={product} category={category} />
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.singleProduct,
    categories: state.productReducer.allCategories,
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
    },
    getCategories: () => {
      dispatch(getAllCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSingle)
