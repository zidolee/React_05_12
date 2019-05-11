import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './component/header/Header'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'


class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={() => {
            if(this.props.user){
              return <HomePage/>
            }else{
              return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(App);
