import React from 'react'
import { Link } from 'react-router-dom'

const Categories = ({categories, catSelect}) => {

  return (
    <ul className="nav" id="cat-filter">

      <li className="nav-item title">
        <a className="nav-link disabled" href="#">Sort:</a>
      </li>

      <li className="nav-item">
        <a
          onClick={(event) => { catSelect(event) }}
          id={0}
          className="nav-link active"
          href="#">
          All
        </a>
      </li>

      { categories.map((cat) => {
          return (
            <li key={cat.id} className="nav-item">
              <Link
                onClick={(event) => { catSelect(event) }}
                id={cat.id}
                className="nav-link"
                to={`/product/category/${cat.id}`}>
                {cat.name}
              </Link>
            </li>
          )
        })
      }

    </ul>
  )
}

export default Categories
