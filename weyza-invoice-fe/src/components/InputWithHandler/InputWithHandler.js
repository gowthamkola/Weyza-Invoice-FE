import React, {useState} from 'react';
import './inputwithHandler.scss';

function InputWithHandler(props) {
    const [requiredError, updateRequiredState] = useState(false);
    const defaulErrorMessageRequired = `${props.inputLabel} is required`;
    const inputClass = `input-default ${props.inputClass? props.inputClass:''} ${props.validInput || !requiredError ? '': 'input-invalid'}`;
    const labelClass =  props.labelClass ? `label-default ${props.labelClass}` : 'label-default';

    const errorMessage = props.validInput || !requiredError ?
     '' : props.errorMessage ? 
     (<div className="error-messsage">{props.errorMessage}</div>) : requiredError ? 
     (<div className="error-messsage">{defaulErrorMessageRequired}</div>) : '';

    const requiredInput = (e) => {
        if(props.requiredInput && e.target.value.length < 1){
            updateRequiredState(true);
        }
        props.validateInputField(e)
    }


        return(
            <React.Fragment>
                <label className={labelClass}>
                    {props.inputLabel}
                    <input id={props.inputID} 
                        className={inputClass} 
                        type={props.inputType} 
                        value={props.inputValue} 
                        onChange={props.handleChange} 
                        onBlur={requiredInput}>
                    </input>
                </label>
                {errorMessage}
            </React.Fragment>
        )

}

export default InputWithHandler;