import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import agent from './agent';
import logo from './logo.svg';
import './App.css';
import './main.css';

import { Provider } from 'react-redux';
 

import store from './store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from './constants/actionTypes';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});


class App extends Component {
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      <div>
      <Header
        appName={this.props.appName}
        currentUser={this.props.currentUser} />
      {this.props.children}
    </div>
      {this.props.children}
    }
return (
 
  <Router>
    
    <div>
    <Header   appName={this.props.appName}          currentUser={this.props.currentUser} />      
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about" component={About} />
     <Footer />
    </div>
  </Router>
)
   
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};
 


const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);


 // export default App;
  export default connect(mapStateToProps, mapDispatchToProps)(App);
