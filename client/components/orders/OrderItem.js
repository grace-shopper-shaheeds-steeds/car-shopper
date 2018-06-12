import React from 'react';

const OrderItem = (props) => {
  const item = props.item
  return (
    <div className="row order-item" >
        <div className="col-3">
        <img className="card-img-top" src={item.product.photo} alt={item.product.title} />
        </div>
        <div className="col-6">
          <h5> {item.product.title} </h5>
          <p> {item.product.description} </p>
        </div>
        <div className="col-2">
          {item.status}
        </div>
    </div>
  )
}


export default OrderItem;
