import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateWithAdded } from '../../store/cart'


const style = {
  component: {
    width: '15rem',
    marginBottom: 10
  },
  link: {
    paddingTop: '.375rem'
  }
}

export class ProductCard extends Component {

  handleCartAdd= (event) => {
    event.preventDefault()

    const info = {
      userId: this.props.user.id,
      carId: this.props.product.id
    }
    if (!this.props.user.id) info.userId = window.localStorage.getItem('tempUserId')

    this.props.addToCart(info)
  }

  render(){
    const { product, user } = this.props

    return (
      <div className="card" style={style.component}>
        <img className="card-img-top" src={product.photo} alt={product.title} />
        <div className="card-body">

          <h5>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </h5>

          { product.category !== null &&
            <p className="card-text">{product.category.name}</p>
          }

          <p className="card-text">ID: {product.id}</p>
          <p className="card-text">{product.description}</p>

          { user.userType === 'administrator' &&
            <Link to={`/updateProduct/${product.id}`} className="float-left" style={style.link}>edit</Link>
          }

          <button
            onClick={this.handleCartAdd}
            type="button"
            className="btn btn-primary float-right">
            Add to cart
          </button>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (info) => {
      dispatch(updateWithAdded(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
