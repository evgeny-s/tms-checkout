import React from 'react';
import './App.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import countryData from './data/countries';
import statesData from './data/states';
import citiesData from './data/cities';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      delivery: 'no',
      payment: 'cash',
      expDate: '',
      cardNumber: '',
      cvv: '',
      countryId: null,
      stateId: null,
      cityId: null,
      userLocation: {
        latitude: null,
        longitude: null
      },

      countryStates: [],
      stateCities: [],
    };
  }

  onChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  onCountryChanged(e) {
    this.onChange('countryId', e);

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

  onStateChanged(e) {
    this.onChange('stateId', e);

    let stateCities = [];
    citiesData.forEach((city) => {
      if (city['state_id'] === +e.target.value) {
        stateCities.push(city);
      }
    });
    this.setState({
      stateCities,
    });
  }

  detectLocation() {
    window.navigator.geolocation.getCurrentPosition((data) => {
      this.setState({
        userLocation: {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        }
      })
    });
  }

  submit() {
    let {countryStates, stateCities, ...rest} = this.state;
    let textData = JSON.stringify(rest);
    window.localStorage.setItem('CHECKOUT_DATA', textData);

    alert(`Congratulation. Your data: ${textData}`);
  }

  _renderDeliveryOptions() {
    return (
      this.state.delivery === 'yes' ? (
        <React.Fragment>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onCountryChanged.bind(this)}
            >
              <option>... Select country ...</option>
              {
                countryData.map((countryData) =>
                  <option key={countryData['id']} value={countryData['id']}>{countryData['name']}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onStateChanged.bind(this)}
            >
              <option>... Select state ...</option>
              {
                this.state.countryStates.map((state) =>
                  <option key={state['id']} value={state['id']}>{state['name']}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChange.bind(this, 'cityId')}
            >
              <option>... Select city ...</option>
              {
                this.state.stateCities.map((city) =>
                  <option key={city['id']} value={city['id']}>{city['name']}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <button type="button" className="btn btn-warning" onClick={this.detectLocation.bind(this)}>or Detect my
              location
            </button>
          </div>
        </React.Fragment>
      ) : null
    );
  }

  _renderPayment() {
    return (
      this.state.payment === 'cc' ? (
        <React.Fragment>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Card Number"
                onChange={this.onChange.bind(this, 'cardNumber')}
                value={this.state.cardNumber}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Expiration Date"
                onChange={this.onChange.bind(this, 'expDate')}
                value={this.state.expDate}
              />
              <input
                type="text"
                className="form-control"
                placeholder="CVV"
                value={this.state.cvv}
                onChange={this.onChange.bind(this, 'cvv')}
              />
            </div>
          </div>
        </React.Fragment>
      ) : null
    );
  }

  isFormValid() {
    return this.state.firstName !== ''
      && this.state.lastName !== ''
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

        {
          this._renderDeliveryOptions()
        }

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              value="cash"
              onChange={this.onChange.bind(this, 'payment')}
              checked={this.state.payment === 'cash'}
            />
            <label className="form-check-label">
              Payment - cash
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              value="cc"
              onChange={this.onChange.bind(this, 'payment')}
              checked={this.state.payment === 'cc'}
            />
            <label className="form-check-label">
              Payment - credit card
            </label>
          </div>
        </div>

        {
          this._renderPayment()
        }

        <div className="form-group">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.submit.bind(this)}
            disabled={!this.isFormValid()}
          >Submit
          </button>
        </div>
      </div>
    );
  }
}

export default App;
