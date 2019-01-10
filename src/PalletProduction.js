import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class PalletProduction extends Component {
  state = {
    cookie: "",
    palletProduced: null
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      const cookie = this.state.cookie
      let url = 'http://localhost:8888/create-pallet/' + cookie;
      axios.post(url, {})
        .then(response => {
          console.log(response);
          if (response.data.id) {
            this.setState({
              palletProduced: {
                cookie: cookie,
                id: response.data.id
              }
            })
          } else {
            alert('An error occured: ' + response.data.errorMessage
              + '. See console for more info.');
          }
          this.props.refresh();
        })
        .catch(error => {
          alert('An error occured. See console.');
          console.log(error);
        });
      this.setState({cookie: ""});
    }
  }

  isFormValid = () => this.state.cookie.length > 0;

  render() {
    let palletProducedInfo = null;
    if (this.state.palletProduced) {
      palletProducedInfo = (
        <p>
          A pallet of <b>{this.state.palletProduced.cookie}</b> was
          produced with ID <b>{this.state.palletProduced.id}</b>.
          <button onClick={() => this.setState({palletProduced: null})}>
            Close
          </button>
        </p>
      )
    }

    let submitButton = null;
    if (this.isFormValid()) {
      submitButton = <input type="submit" value="Produce!"/>;
    } else {
      submitButton = <input type="submit" value="Produce!" disabled/>;
    }
    return (
      <div>
        {palletProducedInfo}
        <form onSubmit={this.handleSubmit}>
          <b>Cookie:</b>
          <select
              name="cookie"
              value={this.state.cookie}
              onChange={this.handleInputChange}>
            <option value="">-</option>
            {this.props.cookies.map(c =>
              <option key={c.name} value={c.name}>{c.name}</option>
            )}
          </select>
          {submitButton}
        </form>
      </div>
    );
  }
}

export default PalletProduction;
