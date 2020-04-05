import React, {Component} from 'react';
import Iframe from './Iframe.js';
import { sendEvent } from './billy-features/index.ts';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: 'http://localhost:3000/iframe.html'
        };
    }
    componentDidMount() {
        window.addEventListener('message', event => console.log('event', event.data));
    }
  
    onClick() {
        const number = Math.random();
        return window.frames[0].postMessage(number, window.location.origin); 
  }

    render() {
        return (
            <div className="App">
            <h1>Parent Window</h1>
            <p>Got Message:</p><input></input>
            <p>Send Message<button onClick={this.onClick}>Hi iFrame!</button></p>
                <Iframe id="the-iframe" source={this.state.src} />
            </div>
        );
    }
}

export default App;