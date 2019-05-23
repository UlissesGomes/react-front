import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import Header from '../src/components/menu'
import Routes from '../src/Routes'

class App extends Component {
  render() {
    return (
      <div className="container">
          <Header/>
          <Routes/>
      </div>
    );
  }
}

export default App;
