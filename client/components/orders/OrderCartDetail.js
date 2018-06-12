import React from 'react'
import { Link } from 'react-router-dom'

function OrderCartDetail(props) {
  let {product} = props

  function insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  function summary (str) {
    return str.slice(0, 40) + '...'
  }

  return (
    <div className="row order-product">
        <div className="col-3">
        <img className="card-img-top" src={product.photo} alt={product.title} />
        </div>
        <div className="col-6">
          <h5> <Link to={`/products/${product.id}`}>{product.title}</Link> </h5>
          <p>{summary(product.description)}</p>
          <p>Qty: {props.qty}</p>
        </div>
        <div className="col-3">
          ${insertDecimal(product.price)}
        </div>
    </div>
  )
}

export default OrderCartDetail;
