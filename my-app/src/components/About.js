import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import agent from '../agent';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
const superagent = superagentPromise(_superagent, Promise);
const mapStateToProps = state => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    postContent: state.common.postContent
  });
   
  
class About extends React.Component {
  
    componentWillMount() {        
        
      }
    render() {
        return (
            <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {this.props.appName.toLowerCase()}
        </h1>
        <p>Về tôi.</p>
      </div>
      
    <div className="container">                              
    </div>
    
    </div>
        );
    }
}

// export default About;
export default connect(mapStateToProps)(About);