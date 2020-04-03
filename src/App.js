import React, {Component} from 'react';
import Iframe from './Iframe.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: 'http://localhost:3000/iframe.html'
        };
    }
  
  onClick() {
    return Math.random(); 
  }

    render() {
        return (
            <div className="App">
            <h1>Parent Window</h1>
            <p>Got Message:</p><input></input>
            <p>Send Message<button onClick={this.onClick}>Hi iFrame!</button></p>
                <Iframe source={this.state.src} />
            </div>
        );
    }
}

export default App;