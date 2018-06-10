import { combineReducers } from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import auth from './reducers/auth';

export default combineReducers({    
    common,
    auth,
    home    
  });
  