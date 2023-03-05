import React from 'react';
import loading from "../img/kOnzy.gif";

const Loader = () => {
    return (
        <div className='load-modal'>
            <div className='loader'>
                <h3>Loading...</h3>
                <img src={loading} alt="loading..." />
            </div>
        </div>
    )
};

export default Loader;