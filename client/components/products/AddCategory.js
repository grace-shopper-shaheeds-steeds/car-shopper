import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addNewCategory} from '../../store'

class AddCategory extends Component {
  constructor (){
    super();
    this.state = {
      name: ''
    }
  }

  handleChange = event => {
    this.setState({
       [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createCategory(this.state)
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center page-header">Add New Category</h2>

        <div className="row justify-content-md-center">
        <div className="col col-md-6">
        { this.props.user.userType === 'administrator' ? (
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="form-group">
              <input name="name" type="text" className="form-control" placeholder="Category Name" />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">Submit</button>
          </form>
          ) : (
          <div><h1>You are not an admin</h1></div>
          )
        }
        </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    categoryList: state.allCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: (newCategory) => dispatch(addNewCategory(newCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
