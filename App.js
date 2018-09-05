import React , { Component } from 'react';
import allReducers from './src/store/reducers/index.js';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import {
  Root ,
} from 'native-base';
import {Routes } from './src/app-routing'
import ReduxThunk from 'redux-thunk';

const middleware = applyMiddleware(ReduxThunk);

const store = createStore(allReducers ,{} , middleware);

 export default class App extends Component{
  constructor(props){
    super(props);

  }
  async componentWillMount() {

  }

  render(){

    return(
      <Provider store= {store}>
         <Root>
              <Routes/>
          </Root>
       </Provider>
    )
  }
}