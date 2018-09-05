import { createStackNavigator } from 'react-navigation';
import Register from './screens/register/register'
import Login from './screens/login/login'
import Splash  from './screens/splash/splash'
import HomeScreenRouter from './screens/dashboard';


export const Routes = createStackNavigator({
                              Splash: {
                                screen: Splash,
                                navigationOptions: {
                                  header: null 
                                },
                              },
                              Login: {
                                screen: Login,
                                navigationOptions: {
                                  title: 'Login',
                                  headerTitleStyle: {
                                    textAlign:"center", 
                                    flex:0.8
                                   },
                                  
                                },
                              },
                              Register: {
                                screen: Register,
                                navigationOptions: {
                                  title: 'Register',
                                  headerTitleStyle: {
                                    textAlign:"center", 
                                    flex:0.8
                                   }, 
                                },
                              },
                              Dashboard: {
                                screen: HomeScreenRouter,
                                navigationOptions: {
                                  header: null  
                                }
                              }
                       },
                       {
                         initialRouteName : 'Splash'
                       }
                      );