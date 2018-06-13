import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import { addNewProduct, getAllCategories} from '../../store'
import history from '../../history'


class AddProduct extends Component {

  constructor() {
    super();
    this.state = {
      // title: '',
      // description: '',
      // price: '',
      // inventoryQuantity: ''
    }
  }

  componentDidMount = () =>{
    this.props.displayCategories();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.createProduct(this.state)
  }

  categoryOptions = () => {
    return this.props.allCategories.map((cat) => {
      return { value: cat.name, label: cat.name  }
    })
  }

  render() {
    let errorArr = this.props.error.split(',').map(elem => elem.slice(27))
        // .map(elem => elem.split(' ').map(elem => elem === 'null' ? 'empty' : elem)
    return ( this.props.user.userType === 'administrator' ?
      <div className="container">

        <h2 className="text-center page-header">Add New Product</h2>

        <div className="row justify-content-md-center">

          <div className="col col-md-6">

          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input placeholder="Title" className="form-control" name="title" type="text"  value={this.state.title}/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea placeholder="Description" className="form-control" name="description" type="text"  value={this.state.description}/>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="price">Price</label>
                <input placeholder="Price" className="form-control" name="price" type="number" min="0" step="any" value={this.state.price}/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inventoryQuantity">Inventory Quantity</label>
                <input placeholder="Inventory Quantity" className="form-control" name="inventoryQuantity" type="number" min="0" step="any" value={this.state.inventoryQuantity}/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="photo">Photo Url</label>
                <input placeholder="Photo Url"className="form-control" name="photo" type="text"  value={this.state.photo}/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="category">Category</label>
                <Select
                  options={this.categoryOptions()}
                  value={this.state.value}
                  onChange={value => this.setState({ category: value.label })}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
          {(this.props.error) ? errorArr.map(elem => elem[0] === '.' ? <div id="error">{elem.slice(1)}</div> : <div id="error">{elem}</div>): null}

          </div>

        </div>

      </div> :

      <div>
          <h1>You are not an admin</h1>
      </div>
    )
  }
}


const mapStateToProps = state =>{
    return {
        allCategories: state.productReducer.allCategories,
        user: state.user,
        error: state.productReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProduct: (newProduct) => dispatch(addNewProduct(newProduct)),
        displayCategories: () => dispatch(getAllCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
