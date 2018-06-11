import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addNewContact} from '../../store/orderReducer'

class OrderBilling extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
				const userId = this.props.userId
        const contact = this.state
        this.props.updateContact(contact, userId)

    }
    handleSubmit = async event => {
        event.preventDefault();
				// const userId = this.props.userId
				// const contact = this.state
        // this.props.updateContact(contact, userId)
    }

    render() {
				let contact = this.state
        return (
            <div className="container">

            <h2 className="text-center">Billing Form</h2>

            <div className="row justify-content-md-center">
            <div className="col-8">
              <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="firstName">First Name:</label>
                <input name="firstName" type="text" value={contact.firstName}/>

                <label htmlFor="lastName">Last Name:</label>
                <input name="lastName" type="text" value={contact.lastName} />

                <label htmlFor="email">Email:</label>
                <input name="email" type="email" value={contact.email}/>

                <label htmlFor="address">Address:</label>
                <input name="address" type="text" value={contact.address}/>

                <label htmlFor="city">City:</label>
                <input name="city" type="text" value={contact.city}/>

                <label htmlFor="state">State:</label>
                <input name="state" type="text" value={contact.state}/>

                <label htmlFor="zipcode">Zipcode:</label>
                <input name="zipcode" type="text" value={contact.zipcode}/>

                <button type="submit">Submit</button>

              </form>
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id
  }
}

// const mapDispatchToProps = (dispatch) => {
//     return { updateContact: (contactData, userId ) => {
// 			dispatch( addNewContact( contactData, userId ) )
// 			}
// 		}
// }

export default connect(mapStateToProps, null)(OrderBilling);
