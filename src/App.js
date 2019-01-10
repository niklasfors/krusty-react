import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PalletProduction from './PalletProduction';
import Reset from './Reset';

class App extends Component {
  state = {
    cookies: [],
    pallets: [],
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
    axios.get("pallets")
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

  mainArea = () => (
    <div>
      <PalletProduction
        cookies={this.state.cookies}
        refresh={this.refresh}
        setStatus={this.setStatus} />
      <ul>
        {this.state.pallets.map(c =>
          <li key={c.id}>{c.cookie}</li>
        )}
      </ul>
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
        <div>
          <p>
            <b>Status:</b> {statusMessage}
          </p>
        </div>
        {main}
      </div>
    );
  }

}

export default App;
