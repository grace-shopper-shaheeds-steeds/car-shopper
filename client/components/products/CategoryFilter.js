import React from 'react'

const Categories = ({categories}) => {

  return (
    <ul className="nav">

      <li className="nav-item">
        <a className="nav-link disabled" href="#">Sort:</a>
      </li>
      {
        categories.map((cat) => {
          return (
            <li key={cat.id} className="nav-item">
              <a className="nav-link active" href="#">{cat.category}</a>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Categories
