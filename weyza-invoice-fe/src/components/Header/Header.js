import React from 'react';
import ButtonWithHandler from '../ButtonWithHandler/ButtonWithHandler';
import {connect} from 'react-redux';
import {showLoader, hideLoader} from '../../actions/spinnerActions';
import './header.scss';
import { logUserOut } from '../../actions/userLoginActions'; 
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {
    const userLoggedIn = props.metadata.userLogged;
    const navigate = useNavigate()
    const logUserOut = (e) => {
        console.log(e);
        props.logUserOut()
        navigate('/login')
    }
    if(userLoggedIn) {
        return(<div>
            <div className="headerEl">
                <ButtonWithHandler
                    handleClick = {logUserOut}
                    buttonLabel = "Logout"
                    buttonClass = "header-button"
                />
            </div>
            {}
            <div></div>
        </div>)
    } else{
        return(

            <div className="headerEl">
                <Link className="header-link" to="/login">
                    <ButtonWithHandler
                        buttonLabel = "Login"
                        buttonClass = "header-button"
                    />
                 </Link>
            </div>
        )
    }
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
        logUserOut: () => dispatch(logUserOut())
    });

export default connect(mapStateToProps, mapDispatchToProps)(Header);