import React from 'react';

function OrderCartDetail(props) {
  let {product} = props
  return (
    <div className="row" >
        <div className="col-3">
        <img className="card-img-top" src={product.photo} alt={product.title} />
        </div>
        <div className="col-6">
          <h5> {product.title} </h5>
          <p> {product.description} </p>
        </div>
        <div className="col-3">
          ${product.price * 100.00}
        </div>
    </div>
  )
}

export default OrderCartDetail;
