import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import About from "./about";
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <About />
      </React.Fragment>
    );
  }
}

export default App;
