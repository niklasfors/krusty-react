import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PalletProduction from './PalletProduction';
import Reset from './Reset';
import SimpleTable from './SimpleTable'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  state = {
    cookies: [],
    pallets: [],
    palletsFilter: {},
    disconnected: false,
    status: ""
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    axios.get("cookies")
      .then(res => {
        this.setState({ cookies: res.data.cookies });
      })
      .catch(error => {
        console.log(error);
        this.setState({disconnected: true})
      });
    this.fetchPallets(this.state.palletsFilter);
  }

  fetchPallets = (filter) => {
    let params = {}
    Object.keys(filter)
      .filter(k => filter[k].length > 0)
      .forEach(k => params[k] = filter[k])
    axios.get("pallets", {params: params})
      .then(res => {
        this.setState({ pallets: res.data.pallets });
      })
      .catch(error => {
        console.log(error);
        this.setState({disconnected: true})
      });
  }

  setStatus = (message) => {
    this.setState({status: message});
  }

  setPalletsFilter = (filter) => {
    this.setState({palletsFilter: filter});
    this.fetchPallets(filter);
  }

  mainArea = () => (
    <div>
      <Paper className={this.props.classes.PalletProductionPaper}>
        <PalletProduction
          cookies={this.state.cookies}
          refresh={this.refresh}
          setStatus={this.setStatus} />
      </Paper>
      <SimpleTable
        cookies={this.state.cookies}
        pallets={this.state.pallets}
        palletsFilter={this.setPalletsFilter}/>
      <Reset
        refresh={this.refresh}
        setStatus={this.setStatus} />
    </div>)

  render() {
    let statusMessage = this.state.status;
    if (this.state.disconnected) {
      statusMessage = (
        <b>Disconnected. Couldn't connect to REST server ({axios.defaults.baseURL})</b>
      )
    }

    let main = null;
    if (!this.state.disconnected) {
      main = this.mainArea();
    }

    return (
      <div>
        <Paper className={this.props.classes.StatusPaper}>
          <div>
            <b>Status:</b> {statusMessage}
          </div>
        </Paper>
        {main}
      </div>
    );
  }

}

const styles = theme => ({
  StatusPaper: {
    padding: "10px",
    marginBottom: "5px"
  },
  PalletProductionPaper: {
    paddingLeft: "10px",
    paddingTop: "4px",
    paddingBottom: "10px"
  }
});

export default withStyles(styles)(App);
