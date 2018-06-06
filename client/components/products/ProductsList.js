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
    const catId = event.target.id

    console.log(`Category ${catId} selected!`)

    this.setState({
      display: catId
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
          {
            products &&
            products.filter((product) => {
              if (this.state.display) {
                return product.categories[0].id === Number(this.state.display)
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
