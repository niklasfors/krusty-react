import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PalletProduction from './PalletProduction';

class App extends Component {
  state = {
    cookies: [],
    pallets: []
  }

  componentDidMount() {
    this.fetchCookies();
    this.fetchPallets();
  }

  fetchCookies = () => {
    axios.get("http://localhost:8888/cookies")
      .then(res => {
        this.setState({ cookies: res.data.cookies });
      })
  }

  fetchPallets = () => {
    axios.get("http://localhost:8888/pallets")
      .then(res => {
        this.setState({ pallets: res.data.pallets });
      })
  }

  render() {
    return (
      <div>
        <PalletProduction
          cookies={this.state.cookies}
          refresh={this.fetchPallets}/>
        <ul>
          {this.state.pallets.map(c =>
            <li key={c.id}>{c.cookie}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
