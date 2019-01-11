import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PalletProduction from './PalletProduction';
import Reset from './Reset';
import PalletTable from './PalletTable'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    this.fetchCookies();
    this.fetchPallets(this.state.palletsFilter);
  }

  fetchCookies = () => {
    axios.get("cookies")
      .then(res => {
        if (res.data && res.data.cookies) {
          this.setState({ cookies: res.data.cookies });
        } else {
          this.setState({ status: "Couldn't fetch cookies from REST server"});
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({disconnected: true})
      });
  }

  fetchPallets = (filter) => {
    let params = {}
    Object.keys(filter)
      .filter(k => filter[k].length > 0)
      .forEach(k => params[k] = filter[k])
    axios.get("pallets", {params: params})
      .then(res => {
        console.log(res);
        if (res.data && res.data.pallets) {
          this.setState({ pallets: res.data.pallets });
        } else {
          this.setState({ status: "Couldn't fetch pallets from REST server"});
        }
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
      <PalletTable
        cookies={this.state.cookies}
        pallets={this.state.pallets}
        palletsFilter={this.setPalletsFilter}/>
      <Reset
        refresh={this.refresh}
        setStatus={this.setStatus} />
    </div>
  )

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
