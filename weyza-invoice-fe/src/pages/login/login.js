import React, {useState} from "react";
import Axios from "axios";
import {Link, useNavigate, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import {showLoader, hideLoader} from '../../actions/spinnerActions';
import './login.scss';
import { Formik, Form } from 'formik';
import TextInput from '../../components/textInput/TextInput';
import * as Yup from 'yup';
import {updateUserLogin} from '../../actions/userLoginActions';
import * as endPoints from '../../constants/enpointURL'


const Loginform = (props) => {

    const [userNotFound, setUserNotFound] = useState(false);
    const [incorrectPassword, updateWrongPassword] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        props.showLoader()
        console.log(values)
        logUserIn(values);
    }
 
    const logUserIn = (values) => {
        Axios.post(endPoints.LOG_USER_IN, {username: values.userName, password: values.password1}).then(res =>{
            console.log(res)
             props.hideLoader();
             props.updateUserLogin(res.data);
             navigate('/dashboard')
        })
        .catch(err => {
            if(err.response.data.usernameError){
                setUserNotFound(true)
            }
            else if(err.response.data.passwordError){
                updateWrongPassword(true)
            }
            props.hideLoader();
        });
    }
    

    const loginError = () => {
        if(userNotFound){
            return (<React.Fragment><div className="error-message">the username deosn't exist please <Link to="/register">register!</Link></div></React.Fragment>)
        } else if(incorrectPassword){
            return(<div className="error-message">password Incorrect please verify and try again</div>)
        }
    }

    const userLoggedIn = props.metadata.userLogged;

    if(userLoggedIn) {
      return(<Navigate to='/dashboard'></Navigate>)
    } else {
      return (
        <Formik
           initialValues={{
             userName: '',
             password1:'',
           }}
           validationSchema={Yup.object({
             userName: Yup.string()
               .min(12, 'Username must be minimum 12 characters or more')
               .max(20, 'Must be 20 characters or less')
               .required('Required'),
             password1: Yup.string()
               .min(9, 'password must be minimum 9 characters or more')
               .max(20, 'Must be 20 characters or less')
               .required('Required')
           })}
           onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
           }}
         ><div className="form-login">
           <Form>
             <TextInput
               label="Username"
               name="userName"
               type="text"
               placeholder="Username"
             />
    
             <TextInput
               label="password"
               name="password1"
               type="password"
               placeholder="password"
             />
            {loginError()}
             <button className="button-default" type="submit">Submit</button>
           </Form>
           </div>
         </Formik>
     );
    }
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        metadata: state.metaData
      }
}

const mapDispatchToProps = (dispatch) => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
    updateUserLogin: (payload) => dispatch(updateUserLogin(payload))
});

export default connect(mapStateToProps, mapDispatchToProps) (Loginform);

