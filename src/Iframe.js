import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }
    return (
        // basic bootstrap classes. you can change with yours.
        <div >
            <div >
                <iframe src={source}></iframe>
            </div>
        </div>
    );
};

export default Iframe;