import React, { useEffect, useState } from 'react';
import { sendEvent, removeListener, addListener } from './billy-features/index';

const ChildComponent = () => {

    const [value, setValue] = useState('');

    const handler = number => setValue(number)

    useEffect(() => {
        addListener('randomNumberFromParent', handler)
        return () => {
            removeListener('randomNumberFromParent', handler)
        }
    }, []);

    const onButtonClick = () => {
        sendEvent('randomNumber', Math.random());
    }

    return (
        // basic bootstrap classes. you can change with yours.
        <div>
            <h1>ChildComponent Window</h1>
            <p>Got Message:</p><input value={value} readOnly></input>
            <p>Send Message<button onClick={ onButtonClick } >Hi Parent!</button></p>
        </div>
    );
};

export default ChildComponent;