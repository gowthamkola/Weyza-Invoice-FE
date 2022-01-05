import React from 'react';
import './addUser.scss';
import {connect} from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate, Navigate } from "react-router-dom";
import {showLoader, hideLoader} from '../../../actions/spinnerActions';
import Axios from 'axios';
import TextInput from '../../../components/textInput/TextInput';
import SelectDropdown from '../../../components/selectDropdown/SelectDropdown';
import * as endpoints from '../../../constants/enpointURL'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const AddUser = (props) => {
    const submitAddUser = (formValues) => {
        const payload = {
            name: formValues.firstName + formValues.lastName,
            email: formValues.email,
            phone: formValues.phoneNum,
            role: formValues.role,
            userReferee: props.metadata.userName,
            adminRole: props.metadata.role
        }
        const headers = {
            'Authorization': props.metadata.token
          }
          console.log(headers)
        Axios.post(endpoints.ADD_USER, payload, headers ).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
        console.log(formValues)
    }
    return(<Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNum:'',
          role: 'user',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required(' first name is required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('last name is required'),
          email: Yup.string()
            .email('Invalid email address'),
          phoneNum: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('phone mumber is required'),
          role: Yup.string()
             .oneOf(
               ['user', 'employee'],
               'Invalid Job Type'
             )
             .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
            submitAddUser(values);
        }}
      ><div className="adduser-up-form">
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
            label="phone"
            name="phoneNum"
            type="tel"
            placeholder="phone"
          />
          
          <SelectDropdown label="Role" name="role">
             <option value="user">User</option>
             <option value="employee">Employee</option>
           </SelectDropdown>

          <button className="button-default button-center" type="submit">Submit</button>
          <button className="button-default button-center" type="reset">Reset</button>
        </Form>
        </div>
      </Formik>)
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        metadata: state.metaData
      }
}

const mapDispatchToProps = (dispatch) => ({
    showLoader: () => dispatch(showLoader()),
    hideLoader: () => dispatch(hideLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)