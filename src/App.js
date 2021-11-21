import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <p>Welcome to WebCrawler</p>
        </div>
        <div className="children">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
