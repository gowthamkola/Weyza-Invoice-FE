import React from 'react';
import './dashboard.scss';
import {connect} from 'react-redux';
import ButtonWithHandler from '../../components/ButtonWithHandler/ButtonWithHandler';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
        return(<div>
            <div>
                <Link to="/dashboard/addUser">
                    <ButtonWithHandler
                    buttonLabel = "Add a new user"
                    buttonClass="button-center extended" />
                </Link>
            </div>
            <div>
                Hello {props.metadata.userName}
            </div>
           </div>)
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        metadata: state.metaData
      }
  }
export default connect(mapStateToProps)(Dashboard);