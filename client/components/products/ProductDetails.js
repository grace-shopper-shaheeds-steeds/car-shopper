import React from 'react'
import StarRating from 'react-star-rating-component'

const ProductDetails = (props) => {
  const { product, category } = props
  return (
    <ul className="details">
      <li>Category: {category.name}</li>
      <li>Price: ${product.price}</li>
      <li className="avg-rating">
        <StarRating
          renderStarIcon={() => <i className="fa fa-star" aria-hidden="true" />}
          name="rating"
          editing={false}
          value={product.averageRating}
        />
      </li>
      <li>Product ID: {product.id}</li>
    </ul>
  )
}

export default ProductDetails
