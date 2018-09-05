import React from "react";
import {Image ,AsyncStorage} from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "Chat", "Profile" , "Logout"];
export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  handleScreen = (data)=>{
    switch (data) {
      case 'Home':
        this.props.navigation.navigate('Dashboard',null,null);
        break;
    case 'Chat':
        this.props.navigation.navigate('Chat',null,null);
        break;
    case 'Logout':
          AsyncStorage.clear().then(()=>{
            this.props.navigation.navigate('Login',null,null);
          })
        break;
    case 'Profile':
        this.props.navigation.navigate('Profile',null,null);
        break;
    default:
        break;
    }
  }


  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() =>this.handleScreen(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}