import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryFilter from './CategoryFilter'
import ProductCard from './ProductCard'
import  { getAllProducts, getAllCategories } from '../../store'

export class ProductsList extends Component {

  constructor(){
    super()
    this.state = {
      display: 'all'
    }
  }

  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleCategoryClick = (event) => {
    event.preventDefault()

    console.log(`Category ${event.target.id} selected!`)

    this.setState({
      display: event.target.id
    })
  }

  render(){
    const { products, categories } = this.props
    return (
      <div className="container">

        <div className="row">
          <h1 className="text-center">Cars Catalog</h1>
        </div>

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
