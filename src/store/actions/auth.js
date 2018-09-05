import { LOGIN_TYPE, REGISTER_TYPE, LOGOUT_TYPE } from './action-types'
const baseUrl = 'http://192.168.1.143:8080'
import axios from "axios";


export const loginUser = (data) => {
  return (dispatch) => {
    axios.post(baseUrl+'/authentication/login',data, {
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(function (response) {
      dispatch({
        type: LOGIN_TYPE,
        payload:response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}

export const registerUser = (data) => {
  return (dispatch) => {
    axios.post(baseUrl+'/authentication/register',data, {
      headers: {
          'Content-Type': 'application/json',
      }
  })
    .then(function (response) {
      dispatch({
        type: REGISTER_TYPE,
        payload:response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}

export const logout = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_TYPE,
      payload: {
        data:data
      }
    });
  }
}