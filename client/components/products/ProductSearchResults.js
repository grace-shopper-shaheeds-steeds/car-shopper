import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductCard from './ProductCard'
import { searchingAllProducts } from '../../store'

export class ProductSearchResults extends Component {

  constructor(props){
    super(props)
    this.state = {
      query: props.match.params.value
    }
  }

  componentDidMount () {
    const query = this.props.match.params.value
    this.props.searchProducts(query)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.value !== this.props.match.params.value) {
      const query = this.props.match.params.value
      this.props.searchProducts(query)
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.value !== state.query) {
      return {
        query: props.match.params.value
      };
    }
    return null;
  }

  render(){
    const products = this.props.searchResult
    return (
      <div className="container">
        <h2 className="text-center page-header">Search Results for "{this.state.query}"</h2>
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
