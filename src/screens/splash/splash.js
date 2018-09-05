import React, { Component } from 'react';

import {
      StyleSheet,
      Image,
      View,
      AsyncStorage
} from 'react-native' ;
 
const splashImage = require("./splash.png");
export default class Splash extends React.Component {
  constructor(props){
      super(props)
  }
  
componentWillMount(){
  const {navigation} = this.props;
  AsyncStorage.getItem('token')
        .then(res => {
          console.log(res)
          if (res !== null) {
            navigation.navigate('Dashboard',null,null);
          }else{
            setTimeout(() => {
              navigation.navigate('Login',null,null)
            }, 1000);
          }
        }).catch(err =>console.log(err));    
}

  render(){
    return(
      <View style={styles.container}>
         <Image source={splashImage} style={styles.splash}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1 , 
    justifyContent: 'center' , 
    alignItems: 'center' ,
  },
  splash: {
  
  }
})

