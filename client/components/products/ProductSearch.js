import React, { Component } from 'react'
import history from '../../history'

export class ProductSearch extends Component {

  constructor(props){
    super(props)
    this.state = {
      search: '',
      redirect: false
    }
  }

  handleChange = event => {
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      redirect: true
    })
  }

  componentDidUpdate () {
    if (this.state.redirect) {
      history.push(`/products/search/${this.state.search}`)
      this.setState({redirect: false})
    }
  }

  render(){
    return (
      <div>
        <form className="form-inline" onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <input className="form-control" type="text" placeholder="Search" aria-label="Search" name="search" value={this.state.search} />
          <button className="btn btn-secondary" type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default ProductSearch
