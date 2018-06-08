import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'
import  { getAllProducts, getAllCategories } from '../../store'

export class ProductsList extends Component {

  constructor(){
    super()
    this.state = {
      display: 0
    }
  }

  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleCategoryClick = (event) => {
    event.preventDefault()
    const catId = Number(event.target.id)
    this.setState({
      display: catId
    })
  }

  render(){
    const { products, categories } = this.props
    return (
      <div className="container">

        <h2 className="text-center">Cars Catalog</h2>

        { products[0] ? (
        <div>
          <div className="row">
          {
            categories &&
            <CategoryFilter
              catSelect={this.handleCategoryClick}
              categories={categories}
            />
          }
          </div>

          <div className="row">
          {
            products &&
            products.filter((product) => {
              const quantity = product.inventoryQuantity - product.soldQuantity
              if (quantity > 0){

                // Category to display
                if (this.state.display && product.categories.length > 0) {
                  return product.categories[0].id === Number(this.state.display)
                }

                // Display all
                if (this.state.display === 0) {
                  return product
                }

              }
            })
            .map((item) => {
              return (
                <div key={item.id} className="col-md-auto">
                  <ProductCard product={item} />
                </div>
              )
            })
          }
          </div>
        </div>
          ) : (
            <h3 className="text-center">Sorry! No products in the catalog</h3>
          )
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.allProducts,
    categories: state.productReducer.allCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(getAllProducts())
    },
    fetchCategories: () => {
      dispatch(getAllCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
