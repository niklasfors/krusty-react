import React, { Component } from 'react';
import axios from 'axios';

class Reset extends Component {

  buttonHandler = (e) => {
    const message = "Are you sure that you want to reset the database?";
    let reset = window.confirm(message);
    if (reset) {
      axios.post('reset', {})
        .then(response => {
          console.log(response);
          this.props.refresh();
          this.props.setStatus("The database was restored");
        })
        .catch(error => {
          alert('An error occured. See console.');
          console.log(error);
        });
    }
  }

  render() {
    return (
      <p>
        <button onClick={this.buttonHandler}>Reset database</button>
      </p>
    );
  }
}

export default Reset;
