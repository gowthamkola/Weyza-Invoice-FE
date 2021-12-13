import './App.scss';
import Login from './pages/login/login';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header';
import ClockLoader from 'react-spinners/ClockLoader';
import { connect } from 'react-redux';
import SignupForm from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/notFound/NotFound';
import AddUser from './pages/dashboard/addUser/AddUser';

class App extends React.Component {
  render(){
    const overlayClass = this.props.loading.isLoading ? 'is-loading': 'is-not-loading'
    return (
      <BrowserRouter>
        <React.Fragment>
        <Header />
        <div className="body-grid">
          <div className={overlayClass}>
            <ClockLoader loading={this.props.loading.isLoading}/>
          </div>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/register" element={<SignupForm />} />
        
            {this.props.metaData.userLogged && (
              <Route exact path="/dashboard" element={<Dashboard />} >
              </Route>
            )}
            {this.props.metaData.userLogged && this.props.metaData.role === 'Admin-1' && (
                  <Route exact path="/dashboard/addUser" element={<AddUser />} />
              )}
            <Route exact path="/*" element={<NotFound />} />
          </Routes>
        </div>
        </React.Fragment>
      </BrowserRouter>
    ); 
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    loading: state.loading,
    metaData: state.metaData
  }
}

export default connect(mapStateToProps)(App);
