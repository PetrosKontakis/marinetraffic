import React from 'react';
import './linearLoader.component.style.scss'

/**
 * NAME: LinearLoader
 * DESCRIPTION: Linear material loader 
 * @param {*} props 
 */
const LinearLoader = (props) => {
    return (
        <div className="load-bar">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    )
}

export default LinearLoader;