import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
} from 'react-native';

import {
    Button,
    Input,
    Item,
    Spinner,
    Platform,
    Toast 
} from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from "../../store/actions/auth";
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpinnerActive:false,
             toast:false, 
             username:'',
             password:''
         }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount = () => {
        AsyncStorage.getItem('token')
        .then(res => {
          if (res !== null) {
            navigation.navigate('Dashboard',null,null);
          }
        }).catch(err => reject(err));
    
    }

     componentDidMount() {
        this._configureGoogleSignIn();
      
      }

      _configureGoogleSignIn() {
          
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          webClientId: '983017026485-riibe7mnbku6fjr0q3kq1umj2oe0o3b4.apps.googleusercontent.com',
          offlineAccess: false,
        });
      }

    componentWillReceiveProps(nextProps){
        const {login,navigation} = nextProps;
        const {login_success} = login;
        if(login_success && login_success.success){
          this.setState({isSpinnerActive:false});
          Toast.show({
            text: login_success.message,
            buttonText: "Okay",
            duration: 1000
          });
          AsyncStorage.setItem('token', login_success.token);
          AsyncStorage.setItem('user', JSON.stringify(login_success.user));
          setTimeout(() => {
            navigation.navigate('Dashboard',null,null);
        }, 1000); 
        }else{
            this.setState({isSpinnerActive:false});
            Toast.show({
                text: login_success.message,
                buttonText: "warning",
                duration: 3000
              })
            }
        }
  
    handleClick = () =>{
        this.props.navigation.navigate('Register',null,null)
    }

    onChangetext=(key,value)=>{
        this.setState({ 
            [key]: value,
         })
    }

    _login = ()=>{
         const {loginUser} = this.props;
        loginUser(this.state);
        this.setState({isSpinnerActive:true})
     }

      facebooklogin =  ()=>{
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
              if (result.isCancelled) {
                alert('Login was cancelled');
              } else {
                alert('Login was successful with permissions: '
                  + result.grantedPermissions.toString());
              }
            },
            function(error) {
              alert('Login failed with error: ' + error);
            }
          );
          
     }

     _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
         console.log(userInfo)
        } catch (error) {
            console.log(error)
        //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     // sign in was cancelled
        //     alert('cancelled');
        //   } else if (error.code === statusCodes.IN_PROGRESS) {
        //     // operation in progress already
        //     alert('in progress');
        //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     alert('play services not available or outdated');
        //   } else {
        //     Alert.alert('Something went wrong', error.toString());
        //     this.setState({
        //       error,
        //     });
        //   }
        }
      };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <View style={styles.social_button}>
                        <Button bordered style={styles.btn1} onPress={this.facebooklogin}> 
                            <Text style={styles.facebookstyle}>Facebbok</Text>
                        </Button>
                        <GoogleSigninButton
                            style={{ width: 48, height: 48 }}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}/>
                      
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.form}>
                        <Item> 
                               <Input 
                               name="username" 
                               placeholder='Username'
                               onChangeText={e=>this.onChangetext('username',e)}
                               />
                            </Item>
                            <Item> 
                                <Input 
                                name="password"   
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={e=>this.onChangetext('password',e)}
                                />
                            </Item>
                            {
                                this.state.isSpinnerActive &&
                                <Spinner color='red' />
                            }

                            <Button block danger style={styles.loginbutton}  onPress={this._login}>
                                <Text style={styles.loginbtnStyle}>Login</Text>
                            </Button>
                            <TouchableOpacity >
                            <View style={styles.forgetPassword}>
                                <Text style={styles.forgetText}>Forgot Password </Text>
                            </View>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
                <View style={styles.bottomtext}>
                    <View style={styles.createaccount}>
                        <Text style={styles.createaccounttext}>Create an Account : </Text>
                        <Text style={styles.linktext} onPress={this.handleClick}>Register</Text>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    container1: {
        marginTop: 60,
    },
    social_button: {
        flexDirection: 'row',
        margin: 10
    },
    btn1: {
        flex: 0.8,
        margin: 8,
        backgroundColor: 'white',
        borderColor: 'blue',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    btn2: {
        flex: 0.8,
        margin: 8,
        backgroundColor: 'white',
        borderColor: 'red',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    facebookstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 0,
        width: 180,
        color: 'blue',
    },
    googlestyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 180,
        color: 'red',
    },
    container2: {
        marginTop: 30,
        height: 250,

    },
    form: {
        margin: 10,
        //backgroundColor: 'white',
        height: 200,

    },
    loginbutton: {
        marginTop: 20,
        backgroundColor: '#FF527B'
    },
    loginbtnStyle: {
        fontSize: 20,
        color: 'white',
        textDecorationLine: 'underline'
    },
    forgetPassword: {
        marginTop:10
    },
    forgetText: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 15
    },
    bottomtext: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 10
    },
    createaccount: {
        flexDirection: 'row',
    },
    createaccounttext: {
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 15
    },
    linktext: {
        textAlign: 'center',
        color: '#d9534f',
        fontFamily: 'sans-serif-medium',
        fontSize: 15

    }
})

mapStateToProps = (state) => {
    return  {
        login : state.login 
    }
  }

export default connect(mapStateToProps,{loginUser})(Login)

