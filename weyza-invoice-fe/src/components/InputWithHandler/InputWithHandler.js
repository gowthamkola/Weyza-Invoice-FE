import React, {useState} from 'react';
import './inputwithHandler.scss';

function InputWithHandler(props) {
    const [errorFound, updateRequiredState] = useState(false);
    const defaulErrorMessageRequired = `${props.inputLabel} is required`;
    const inputClass = `input-default ${props.inputClass? props.inputClass:''} ${!errorFound ? '': 'input-invalid'}`;
    const labelClass =  props.labelClass ? `label-default ${props.labelClass}` : 'label-default';

    const errorMessage = () => {
        if(errorFound){
            return (<div className="error-messsage">{defaulErrorMessageRequired}</div>)
        } else if(!props.validInput){
            return(<div className="error-messsage">{props.errorMessage}</div>)
        } else {
            return('')
        }
    }

    const requiredInput = (e) => {
        if(props.requiredInput && e.target.value.length < 1){
            updateRequiredState(true);
        }
        else{
            updateRequiredState(false);
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
                {errorMessage()}
            </React.Fragment>
        )

}

export default InputWithHandler;