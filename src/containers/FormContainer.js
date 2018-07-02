import React, { Component } from 'react';
import TextField from '../components/TextField';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItemConsumed: '',
      errors: {}
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleConsumedChange = this.handleConsumedChange.bind(this);
    this.validateItemChange = this.validateItemChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    // Check to make sure there is an item typed in before updating state
    if(this.validateItemChange(this.state.foodItemConsumed)) {
      event.preventDefault();
      let formPayload = {
        food: this.state.foodItemConsumed
      };
      // Run the function from the parent to update App's state with the new item
      this.props.trackConsumption(formPayload);
      // Clear the form so the input field is blank
      this.handleClearForm(event);
    }
  }

  handleClearForm() {
    // Clear all inputs and errors from the form
    this.setState({
      foodItemConsumed: '',
      errors: {}
    })
  }

  handleConsumedChange(event) {
    // Make sure there are no empty fields before we change our state!
    // This is a design choice, we could use something like onBlur instead if we want
    this.validateItemChange(event.target.value)
    // update the 'foodItemConsumed' property of the state with event.target.value
    this.setState({ foodItemConsumed: event.target.value })
  }

  validateItemChange(item) {
    // Check if the field is currently blank
    if(item === '' || item === ' ') {
      // Add error into state and return "false" for future if blocks
      let newError = {itemError: 'Item must not be blank.'}
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      // If there IS input in the field, delete the error and return "true"
      // for future if blocks
      let errorState = this.state.errors
      delete errorState.itemError
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    console.log(this.state);
    let errorDiv;
    let errorItems;

    // if there are errors in state, make a div with a list item
    // inside for each error
    if(Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className='error'>{errorItems}</div>
    }

    return (
      <form className="callout" onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <TextField
          content={this.state.foodItemConsumed}
          label='Food Item Consumed'
          name='consumed'
          handlerFunction={this.handleConsumedChange}
        />
        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default FormContainer;
