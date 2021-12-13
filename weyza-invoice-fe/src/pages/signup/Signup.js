import React from 'react';
import { Formik, Form } from 'formik';
import TextInput from '../../components/textInput/TextInput';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {Link, useNavigate, Navigate } from "react-router-dom";
import {showLoader, hideLoader} from '../../actions/spinnerActions';
import Axios from 'axios';


// And now we can use these
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const SignupForm = (props) => {
    const submitSignupForm = (formValues) => {
        let postEndpoint = `http://localhost:3000/api/auth/register`;
        //
        const payload = {
            name: `${formValues.firstName} ${formValues.lastName}`,
            email: formValues.email,
            password: formValues.password1,
            phone: formValues.phoneNum,
            username: formValues.userName
        }
        Axios.post(postEndpoint, payload).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    const userLoggedIn = props.metadata.userLogged;
    if(userLoggedIn){
      return(<Navigate to="/dashboard"/>)
    } else{
      return (
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password1:'',
            password2:'',
            phoneNum:'',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            userName: Yup.string()
              .min(12, 'Username must be minimum 12 characters or more')
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            password1: Yup.string()
              .min(9, 'password must be minimum 9 characters or more')
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            password2: Yup.string().required().when("password1", {
              is: val => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password1")],
                "Both password need to be the same"
              )
            }),
            phoneNum: Yup.string()
              .matches(phoneRegExp, 'Phone number is not valid')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
              submitSignupForm(values);
          }}
        ><div className="sign-up-form">
          <Form>
            <TextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Firstname"
            />
  
            <TextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Lastname"
            />
  
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="email"
            />
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
             <TextInput
              label="password"
              name="password2"
              type="password"
              placeholder="password"
  
            />
  
            <TextInput
              label="phone"
              name="phoneNum"
              type="tel"
              placeholder="phone"
            />
  
            <button className="button-default" type="submit">Submit</button>
            <button className="button-default" type="reset">Reset</button>
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

export default connect(mapStateToProps)(SignupForm);