import React, {Component, useState, useEffect} from 'react';
import Iframe from './Iframe.js';
import { addListener } from './billy-features/index.ts';

const App = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        addListener('randomNumber', (number) => {
            setValue(number)
        })
    }, []);

    return <div className="App">
            <h1>Parent Window</h1>
            <p>Got Message:</p><input value={value}></input>
            <p>Send Message<button >Hi iFrame!</button></p>
                <Iframe id="the-iframe" source="http://localhost:3000/iframe.html" />
        </div>
    
}


// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             src: 'http://localhost:3000/iframe.html',
//             value: ''
//         };
//     }


//     componentDidMount() {
//         addListener('randomNumber', function (e) {
//             setState(prevState => ({
//                 ...prevState,
//                 value: 'pluto'
//             }))
//         })
//         // window.addEventListener('message', event => console.log('event', event.data));
//     }
  
//     onClick() {
//         const number = Math.random();
//         return window.frames[0].postMessage(number, window.location.origin); 
//   }

//     render() {
//         return (
//             <div className="App">
//             <h1>Parent Window</h1>
//             <p>Got Message:</p><input value={this.state.value}></input>
//             <p>Send Message<button onClick={this.onClick}>Hi iFrame!</button></p>
//                 <Iframe id="the-iframe" source={this.state.src} />
//             </div>
//         );
//     }
// }

export default App;