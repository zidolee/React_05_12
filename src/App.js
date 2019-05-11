import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './component/header/Header'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'

class App extends Component{

  render(){
    return (
      <Router>
        <Header/>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Router>
    )
  }
}

export default App;
