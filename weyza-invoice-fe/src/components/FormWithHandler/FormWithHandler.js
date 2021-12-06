import React from 'react';

function FormWithHandler(props) {

    return(
        <form className={props.formClass} onSubmit={props.submitForm}>
            {props.children}
        </form>
    )

}

export default FormWithHandler;