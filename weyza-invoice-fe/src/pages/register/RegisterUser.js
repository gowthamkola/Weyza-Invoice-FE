import React from "react";
import FormWithHandler from "../../components/FormWithHandler/FormWithHandler";
import InputWithHandler from "../../components/InputWithHandler/InputWithHandler";
import { validate } from 'isemail';

class RegisterUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname:'',
            email:'',
            emailValid:true,
            password:'',
            validPassword:true
        }
    }
    registerChange (e) {
        this.setState({[e.target.id]: e.target.value})
    }
    validateEmail = value => {
        if (!validate(value)){
            this.setState({emailValid: false})
        }
      }
    render() {
        const inputClass = ``
        return (
            <FormWithHandler>

                <InputWithHandler 
                inputLabel="firstname" 
                inputType="text"
                inputValue={this.state.fname}
                handleChange={this.registerChange}
                inputID="fname"
                inputClass="" />

                <InputWithHandler 
                inputLabel="lastname" 
                inputType="text"
                inputValue={this.state.lname}
                handleChange={this.loginChange}
                inputID="fname" />

                <InputWithHandler 
                inputLabel="email" 
                inputType="email"
                inputValue={this.state.email}
                handleChange={this.loginChange}
                inputID="fname" />

                <InputWithHandler 
                inputLabel="lastname" 
                inputType="text"
                inputValue={this.state.lname}
                handleChange={this.loginChange}
                inputID="fname" />

                <InputWithHandler 
                inputLabel="lastname" 
                inputType="text"
                inputValue={this.state.lname}
                handleChange={this.loginChange}
                inputID="fname" />

            </FormWithHandler>
        )
    }
}

export default RegisterUser;
