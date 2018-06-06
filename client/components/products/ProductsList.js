import React, { Component } from 'react'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'

export class ProductsList extends Component {

  render(){

    return (
      <div className="container">

        <div className="row">
          <h1 className="text-center">Cars Catalog</h1>
        </div>

        <div className="row">
          <CategoryFilter />
        </div>

        <div className="row">

          <div className="col-md-auto">
            <ProductCard />
          </div>

          <div className="col-md-auto">
            <ProductCard />
          </div>

          <div className="col-md-auto">
            <ProductCard />
          </div>

          <div className="col-md-auto">
            <ProductCard />
          </div>

          <div className="col-md-auto">
            <ProductCard />
          </div>

          <div className="col-md-auto">
            <ProductCard />
          </div>

        </div>

      </div>
    )
  }
}

export default ProductsList
