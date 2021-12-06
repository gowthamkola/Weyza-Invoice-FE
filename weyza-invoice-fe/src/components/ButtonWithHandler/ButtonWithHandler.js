import React from 'react';
import './buttonWithHandler.scss';

function ButtonWithHandler(props) {
const buttonClass = `button-default ${props.buttonClass}`
    return(
        <button
         onClick={props.handleClick}
         type={props.buttonType}
         className={buttonClass}>
             {props.buttonLabel}
        </button>
    )

}

export default ButtonWithHandler;