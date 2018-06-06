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
    return (
      <div>
        {
          product &&
          <h3>made it! {product.title}</h3>
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
