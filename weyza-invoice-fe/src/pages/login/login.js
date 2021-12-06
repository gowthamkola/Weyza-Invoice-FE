import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom"
import {connect} from 'react-redux';
import {showLoader, hideLoader} from '../../actions/spinnerActions';
import './login.scss';
import ButtonWithHandler from "../../components/ButtonWithHandler/ButtonWithHandler";
import InputWithHandler from "../../components/InputWithHandler/InputWithHandler";
import FormWithHandler from "../../components/FormWithHandler/FormWithHandler";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            validuserName: true,
            validpassword: true,
            password:'',
            incorrectPassword:false,
            userNotFound: false,
        }
    }

    setViewState = (state, callback) => {
        this.setState((prevState) => {
            return {
                ...state
            };
        }, callback);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.showLoader()
        this.logUserIn();
    }
 
    loginChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    validateUserName = (e) => {
        console.log(e)
        const validUserName = e.target.value.length > 8 ? true: false;
        this.setState({[`valid${e.target.id}`]: validUserName})
    }

    validatePassword = (e) => {
        console.log(e)
        const validPassword = e.target.value.length > 8 ? true: false;
        this.setState({[`valid${e.target.id}`]: validPassword})
    }

     getUserProfile = () => {
        let config = {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTJhMjAwYTdlOTlhNDM5YTUyMzEzZSIsIm5hbWUiOiJHb3d0aGFtIEtvbGEiLCJ1c2VybmFtZSI6Ikdvd3RoYW1Lb2xhIiwiZW1haWwiOiJnYXV0YW1rb2xhQG91dGxvb2suY29tIiwiaWF0IjoxNjM4NTQ5MzU1LCJleHAiOjE2Mzg1NTI5NTV9.bpxaG01ddAxw5vBG0-2tVdx-TwLtCaRGk7YDHTRUq_0'
            }
        }
        
        let data = {
            'HTTP_CONTENT_LANGUAGE': 'hola'
        }
    Axios.get('http://localhost:3000/api/auth/profile', config)
    .then(res => {
        console.log(res)
    }).catch( err => console.log(err))
    }

    logUserIn = () => {
        Axios.post('http://localhost:3000/api/auth/login', {username: this.state.userName, password: this.state.password}).then(res => {
            console.log(res)
        }).then(res =>{
            console.log(res)
             this.props.hideLoader();
        })
        .catch(err => {
            if(err.response.data.usernameError){
                this.setState({userNotFound: true, incorrectPassword:false})
            }
            else if(err.response.data.passwordError){
                this.setState({incorrectPassword: true, userNotFound: false})
            }
            this.props.hideLoader();
        });
    }

     render() {
       return (
             <React.Fragment>
                 <FormWithHandler 
                 submitForm={this.handleSubmit}
                 formClass="form-login">
                     <InputWithHandler 
                        inputLabel="username:" 
                        inputType="text"
                        inputid={this.state.userName}
                        validateInputField = {this.validateUserName}
                        handleChange = {this.loginChange}
                        inputID="userName"
                        validInput={this.state.validuserName}
                        errorMessage="username must be longer than 8 characters" />

                     <InputWithHandler 
                        inputLabel="password:" 
                        inputType="password"
                        inputValue={this.state.password}
                        handleChange={this.loginChange}
                        inputID="password" 
                        validateInputField={this.validatePassword}
                        validInput={this.state.validpassword}
                        errorMessage="password must be longer than 8 characters" />

                    {(this.state.incorrectPassword) ? (<div className="error-message">Password not correct</div>):""}
                    {(this.state.userNotFound) ?
                     (<React.Fragment>
                         <div className="error-message">username not found please   
                             <Link to="/register"> Register</Link>
                         </div>
                      </React.Fragment>)
                        :""}
                     <ButtonWithHandler
                     buttonType= "submit"
                     buttonLabel="Login"/>
                 </FormWithHandler >
             </React.Fragment>
         )
     }
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading
      }
}

const mapDispatchToProps = (dispatch) => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps) (Login);

