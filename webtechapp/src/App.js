import React, { Component } from 'react';
import Header from './Components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hello, World!</p>
        <Welcome name="Jaime"/>
      </div>
    );
  }
}
function Welcome(props) {
  return <h1>Welcome, {props.name}</h1>;
}
export default App;
