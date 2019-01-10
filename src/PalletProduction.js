import React, { Component } from 'react';
import axios from 'axios';

class PalletProduction extends Component {
  state = {
    cookie: "",
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
      axios.post('create-pallet/' + cookie, {})
        .then(res => {
          console.log(res);
          if (res.data.id) {
            const message = "A pallet of " + cookie
              + " was produced with id " + res.data.id;
            this.props.setStatus(message)
          } else {
            alert('An error occured: ' + res.data.errorMessage
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
    let submitButton = null;
    if (this.isFormValid()) {
      submitButton = <input type="submit" value="Produce!"/>;
    } else {
      submitButton = <input type="submit" value="Produce!" disabled/>;
    }
    return (
      <div>
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
