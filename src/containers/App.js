import React, { Component } from 'react';
import FormContainer from './FormContainer';
import MealsList from '../components/MealsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    }
    this.trackConsumption = this.trackConsumption.bind(this);
  }

  trackConsumption(submission) {
    // This is the function that we pass down which allows us to add the
    // new meal to our list in state
    let allMeals = this.state.meals
    this.setState({ meals: allMeals.concat(submission) })
  }

  render() {
    return (
      <div className="row">
        <div className="small-9 small-centered columns">
          <h1 className="text-center">Food Tracker</h1>
          <FormContainer trackConsumption={this.trackConsumption} />
          <MealsList meals={this.state.meals} />
        </div>
      </div>
    );
  }
}

export default App;
