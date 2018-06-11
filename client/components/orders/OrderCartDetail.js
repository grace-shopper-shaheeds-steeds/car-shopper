import React, { Component } from 'react';
import { connect } from 'react-redux';

function OrderCartDetail(props) {
  let product = props.cart
  return (
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">{product.title}</h6>
            <small className="text-muted">{product.description}</small>
          </div>
          <span className="text-muted">{product.price}</span>
        </li>
  )
}

export default OrderCartDetail;
