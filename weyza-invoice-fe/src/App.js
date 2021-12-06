import './App.scss';
import Login from './pages/login/login';
import RegisterUser from './pages/register/RegisterUser';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Header from './components/Header/Header';
import ClockLoader from 'react-spinners/ClockLoader';
import { connect } from 'react-redux';

class App extends React.Component {
  render(){
    const overlayClass = this.props.loading.isLoading ? 'is-loading': 'is-not-loading'
    return (
      <BrowserRouter>
        <React.Fragment>
        <Header />
        <div className={overlayClass}>
        <ClockLoader loading={this.props.loading.isLoading}/>
        </div>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/register" element={<RegisterUser />} />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    ); 
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App);
