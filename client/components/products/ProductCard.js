import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const style = {
  component: {
    width: '15rem',
    marginBottom: 10
  },
  link: {
    paddingTop: '.375rem'
  }
}

const ProductCard = (props) => {
  const { product, user } = props
  return (
    <div className="card" style={style.component}>
      <img className="card-img-top" src={product.photo} alt={product.title} />
      <div className="card-body">
        {/* <h5 className="card-title">{product.title}</h5> */}
        <h5>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h5>

        {
          product.category !== null &&
          <p className="card-text">{product.category.name}</p>
        }
        <p className="card-text">ID: {product.id}</p>
        <p className="card-text">{product.description}</p>

        {
          user.userType === 'administrator' &&
          <Link to={`/updateProduct/${product.id}`} className="float-left" style={style.link}>edit</Link>
        }

        <a href="#" className="btn btn-primary float-right">Add to cart</a>
      </div>
    </div>
  )
}

const setStateOnProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(setStateOnProps)(ProductCard)
