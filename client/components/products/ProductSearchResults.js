import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from './ProductCard'
import { searchingAllProducts } from '../../store'

export class ProductSearchResults extends Component {

  constructor(){
    super()
    this.state = {
      query: ''
    }
  }

  componentDidMount () {
    const query = this.props.match.params.value
    this.props.searchProducts(query)
    this.setState({
      query
    })
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.match.params.value !== this.props.match.params.value) {
      const query = nextProps.match.params.value
      this.setState({
        query
      })
      this.props.searchProducts(query)
    }
  }

  render(){
    const products = this.props.searchResult
    return (
      <div className="container">
        <h2 className="text-center">Search Results for "{this.state.query}"</h2>
        <div className="row">
          {
            products.map((product) => {
              return (
                <div key={product.id} className="col-md-auto">
                  <ProductCard product={product} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.productReducer.searchResult.matches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchProducts: (value) => {
      dispatch(searchingAllProducts(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchResults)
