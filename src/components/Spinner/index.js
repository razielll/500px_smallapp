import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Spinner = () => (
    <div className="loader-wrapper">
        <Loader
            type="Grid"
            color="#4673ce"
            height={120}
            width={120}
        />
    </div >
);

export default Spinner 