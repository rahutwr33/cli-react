import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Button,
    Input,
    Item,
    Spinner,
    Toast 
} from 'native-base';
import { connect } from 'react-redux';
import { registerUser } from "../../store/actions/auth";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isSpinnerActive:false,
            toast:false, 
            username : '',
            email:'',
            password:''
        }
        this.handleClick = this.handleClick.bind(this) 
        this.onChangetext = this.onChangetext.bind(this)
    }

    
   
    componentWillReceiveProps(nextProps){
        const {register,navigation} = nextProps;
        const {regitser_success} = register;
        if(regitser_success && regitser_success.success){
          this.setState({isSpinnerActive:false});
          Toast.show({
            text: regitser_success.message,
            buttonText: "Okay",
            duration: 1000
          })
        setTimeout(() => {
            navigation.navigate('Login',null,null);
        }, 1000); 

        }else{
            this.setState({isSpinnerActive:false});
            Toast.show({
                text: regitser_success.message,
                buttonText: "warning",
                duration: 3000
              })
            }
        }
    

    handleClick = () =>{
        this.props.navigation.navigate('Login',null,null)
    }

    onChangetext=(key,value)=>{
        this.setState({ 
            [key]: value,
         })
    }

    _register = ()=>{
       const {registerUser} = this.props;
       registerUser(this.state);
       this.setState({isSpinnerActive:true})
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <View style={styles.social_button}>
                        <Button bordered style={styles.btn1}>
                            <Text style={styles.facebookstyle}>Facebbok</Text>
                        </Button>
                        <Button bordered style={styles.btn2}>
                            <Text style={styles.googlestyle}>Google</Text>
                        </Button>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.form}>
                            <Item> 
                                <Input 
                                name="username" 
                                placeholder='User Name'
                                onChangeText={e=>this.onChangetext('username',e)} 
                                />
                            </Item>                           
                             <Item> 
                               <Input 
                               name="email" 
                               placeholder='Email'
                               onChangeText={e=>this.onChangetext('email',e)}
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
                            
                           
                            <Button block danger style={styles.loginbutton} onPress={this._register}>
                                <Text style={styles.loginbtnStyle}>Register</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                
                <View style={styles.bottomtext}>
                    <View style={styles.createaccount}>
                        <Text style={styles.createaccounttext}>Already have Account : </Text>
                        <TouchableOpacity onPress={this.handleClick} >
                        <Text style={styles.linktext}>Login</Text>
                        </TouchableOpacity>
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
        backgroundColor: 'white',
        height: 230,

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
        register : state.register 
    }
  }

export default connect(mapStateToProps,{registerUser})(Register)


