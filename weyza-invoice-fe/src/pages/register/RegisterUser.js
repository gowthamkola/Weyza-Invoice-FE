import React from "react";
import FormWithHandler from "../../components/FormWithHandler/FormWithHandler";
import InputWithHandler from "../../components/InputWithHandler/InputWithHandler";
import ButtonWithHandler from "../../components/ButtonWithHandler/ButtonWithHandler";
import { validate } from 'isemail';
import RegisterObjFormat from '../../constants/RegisterForm';
import './registerUser.scss';

class RegisterUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fname:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                errorMessage:''    
            },
            lname:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                errorMessage:''    
            },
            email:{
                value:'',
                required: false,
                valid: true,
                errorState: false,
                errorMessage:''    
            },
            passwordPre:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                matchPasswords: true,
                charLimit:9,
                errorMessage: ''
            },
            passwordPre2:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                errorMessage:''    
            },
            userName:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                errorMessage:''                
            },
            phone:{
                value:'',
                required: true,
                valid: true,
                errorState: true,
                errorMessage:''         
            }
        }
    }

    handleSubmit = (e) => {
        console.log(e.target)
        let requiredInputNotFilled = Object.keys(this.state).filter(inputObj => {
            if(this.state[inputObj].required && this.state[inputObj].value.length){
                return inputObj
            }
        })

        let validatedInputsArr = Object.keys(this.state).filter(inputObj => {
            if(this.state[inputObj].errorState){
                return inputObj
            }
        })
        if(!requiredInputNotFilled.length && !validatedInputsArr.length) {
            console.log(e)
        }
        e.preventDefault();
    }

    registerChange = (e) => {
        this.setState( prevstate => {
            return({[e.target.id]: {...prevstate[e.target.id], value: e.target.value, }});
        })
    }

    validateEmail = value => {
        if (!validate(value)){
            console.log(validate(value));
            this.setState( prevstate => {
                return({email: {...prevstate.email, valid: false, }})
            })
        }
    }

    validatePassword = e => {
        const passwordsMatched = this.state.passwordPre.value === this.state.passwordPre2.value ? true : false;
        console.log(this.state.passwordPre.matchPasswords)
        this.setState(prevstate => {
            return({passwordPre: {...prevstate.passwordPre, matchPasswords: passwordsMatched, }});
        })
        console.log(this.state.passwordPre.matchPasswords)
    }

    validateInput = (e) => {
        if(this.state[e.target.id].required){
            if(e.target.id === 'email'){
                this.validateEmail(e.target.value);
            }
            if(e.target.id === 'passwordPre2'){
                this.validatePassword(e)
            }
           console.log( e.target.value.length, this.state.passwordPre.charLimit)
            if(e.target.id === 'passwordPre'){
                let lengthMatched = e.target.value.length > this.state.passwordPre.charLimit;
                this.setState(prevstate => {
                    return({passwordPre: {...prevstate.passwordPre, valid:lengthMatched, errorMessage: RegisterObjFormat.errorMessages.password}});
                })
               
            }
        }
    }

      getFormControls = () => {
        let InputItemsArr = RegisterObjFormat.inputItems.map(item => {
            return(<InputWithHandler
                inputLabel={item.label} 
                inputType={item.type}
                handleChange = {this.registerChange}
                inputValue={this.state[item.stateVar].value}
                inputID={item.stateVar}
                validInput={this.state[item.stateVar].valid}
                validateInputField={this.validateInput}
                requiredInput={this.state[item.stateVar].required}
                errorMessage={this.state[item.stateVar].errorMessage}
                />)
        })
        return InputItemsArr;
      }

    render() {
        const formErrorCheck = () => {
            if(!this.state.passwordPre.matchPasswords){
                return(<div className="error-message">{RegisterObjFormat.errorMessages.passwordMismatch}</div>)
            }
        }

        return (
            <React.Fragment>
                <div>

                </div>
                <div className="sign-up-form">
                    <FormWithHandler submitForm={this.handleSubmit}>
                        {this.getFormControls()}
                        {formErrorCheck()}
                        <ButtonWithHandler
                         buttonType= "submit"
                         buttonLabel="Register" />
                    </FormWithHandler>
                </div>
            </React.Fragment>
        )
    }
}

export default RegisterUser;
