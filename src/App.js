import React from 'react';
import './App.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import countryData from './data/countries';
import statesData from './data/states';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      delivery: 'no',
      countryId: null,

      countryStates: [],
    };
  }

  onChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  onCountryChanged(e) {
    this.setState({
      countryId: e.target.value,
    });

    let countryStates = [];
    statesData.forEach((state) => {
      if (state['country_id'] === +e.target.value) {
        countryStates.push(state);
      }
    });
    this.setState({
      countryStates,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Checkout Page</h1>

        <div className="form-group">
          <input
            onChange={this.onChange.bind(this, 'firstName')}
            type="text"
            className="form-control"
            placeholder="First Name"
            value={this.state.firstName}
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.onChange.bind(this, 'lastName')}
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={this.state.lastName}
          />
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="delivery"
              value="no"
              onChange={this.onChange.bind(this, 'delivery')}
              checked={this.state.delivery === 'no'}
            />
            <label className="form-check-label">
              Delivery - no
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="delivery"
              value="yes"
              onChange={this.onChange.bind(this, 'delivery')}
              checked={this.state.delivery === 'yes'}
            />
            <label className="form-check-label">
              Delivery - yes
            </label>
          </div>
        </div>

        <div className="form-group">
          <select
            className="form-control"
            onChange={this.onCountryChanged.bind(this)}
          >
            {
              countryData.map((countryData) => <option value={countryData['id']}>{countryData['name']}</option>)
            }
          </select>
        </div>

        <div className="form-group">
          <select className="form-control">
            {
              this.state.countryStates.map((state) => <option value={state['id']}>{state['name']}</option>)
            }
          </select>
        </div>

        <div className="form-group">
          <select className="form-control">
            <option selected>Choose...</option>
          </select>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
            <label className="form-check-label" htmlFor="exampleRadios2">
              Payment - cash
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
            <label className="form-check-label" htmlFor="exampleRadios1">
              Payment - credit card
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Card Number"/>
            <input type="text" className="form-control" placeholder="Expiration Date"/>
            <input type="text" className="form-control" placeholder="CVV"/>
          </div>
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-success">Success</button>
        </div>

        {/*First Name*/}
        {/*Last Name*/}
        {/*Delivery (radio - yes | no)*/}

        {/*---*/}

        {/*Country*/}
        {/*State*/}
        {/*City*/}

        {/*Detect my location*/}

        {/*---*/}

        {/*Payment (radio - cash | card)*/}
        {/*Card Number*/}
        {/*Exp Date*/}
        {/*CVV*/}

        {/*Submit Button*/}
      </div>
    );
  }
}

export default App;
