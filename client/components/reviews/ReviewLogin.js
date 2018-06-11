import React from 'react'
import { Link } from 'react-router-dom'

const ReviewLogin = () => {
  return (
    <div id="review-login">
      <Link to="/login">Sign in</Link> or <Link to="/signup"> create an account</Link> to leave a review
    </div>
  )
}

export default ReviewLogin
