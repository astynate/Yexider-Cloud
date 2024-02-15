import React from 'react';
import './main.css'

const Button = (props) => {

    return (

        <button className="button" disabled={props.disabled} onClick={props.onClick}>{props.title}</button>

    );

}

export default Button;