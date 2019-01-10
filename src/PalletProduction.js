import React, { Component } from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
          alert('An error occured. See console for more info.');
          console.log(error);
        });
      this.setState({cookie: ""});
    }
  }

  isFormValid = () => this.state.cookie.length > 0;

  render() {
    return (
      <form>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end">
          <TextField
            id="cookie"
            select
            label="Select Cookie"
            value={this.state.cookie}
            onChange={this.handleInputChange}
            name="cookie"
            SelectProps={{
              native: true
            }}>
            <option value=""></option>
            {this.props.cookies.map(c =>
              <option key={c.name} value={c.name}>{c.name}</option>
            )}
          </TextField>
          <Button
              style={{marginLeft: "10px"}}
              variant="contained"
              onClick={this.handleSubmit}
              disabled={!this.isFormValid()}>
            Produce pallet!
          </Button>
        </Grid>
      </form>
    );
  }
}

export default PalletProduction;
