import { combineReducers } from 'redux';

import register from "./register";
import login from "./login";
const allReducers = combineReducers({
  register:register,
  login:login
  
  });
 export default allReducers;
  