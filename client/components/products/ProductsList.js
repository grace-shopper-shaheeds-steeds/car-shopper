import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'
import  { getAllProducts } from '../../store'

import { demoCategories } from './tempProductData'

export class ProductsList extends Component {

  constructor(){
    super()
    this.state = {
      categories: demoCategories,
      display: 'all'
    }
  }

  componentDidMount () {
    this.props.fetchProducts()
  }

  handleCategoryClick = (event) => {
    event.preventDefault()

    console.log(`Category ${event.target.id} selected!`)

    this.setState({
      display: event.target.id
    })
  }

  render(){
    const products = this.props.products
    console.log(products)
    return (
      <div className="container">

        <div className="row">
          <h1 className="text-center">Cars Catalog</h1>
        </div>

        <div className="row">
          <CategoryFilter
            catSelect={this.handleCategoryClick}
            categories={this.state.categories}
          />
        </div>

        <div className="row">
          { products &&
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
    products: state.productReducer.allProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(getAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
