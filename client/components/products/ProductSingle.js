import React, { Component } from 'react'

const demo = {
  id: 1,
  title: 'Tesla Model S',
  description: 'Lorem ipsum dolar site emit',
  price: 1000,
  inventoryQuantity: 1,
  photo: 'https://i.imgur.com/5h3gEs5.png',
  averageRating: 4.5,
  createdAt: '2018-06-06T20:09:12.608Z',
  updatedAt: '2018-06-06T20:09:12.608Z'
}

export class ProductSingle extends Component {
  constructor(){
    super()
    this.state = {
      product: demo
    }
  }

  render () {
    console.log(this.props.match.id)
    return (
      <div>
        <h3>{this.state.product.title}</h3>
      </div>
    )
  }
}

export default ProductSingle
