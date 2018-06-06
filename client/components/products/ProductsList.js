import React, { Component } from 'react'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'

import { demoProducts, demoCategories } from './tempProductData'

export class ProductsList extends Component {

  constructor(){
    super()
    this.state = {
      products: demoProducts,
      categories: demoCategories,
      display: 'all'
    }
  }

  handleCategoryClick = (event) => {
    event.preventDefault()
    this.setState({
      display: event.target.id
    }, () => {
      console.log(this.state)
    })
  }

  render(){
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
          {
            this.state.products.map((product) => {
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

export default ProductsList
