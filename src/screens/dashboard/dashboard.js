import React from "react";
import {StyleSheet } from "react-native";
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
} from "native-base";
export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  openDrawer = ()=>{
    this.props.navigation.toggleDrawer();
  }
  render() {
    return (
      <Container style={styles.container}>
            <Header style={styles.header}>
            <Left style={{flex:0.8}}>
            <Button
              transparent
              onPress={() => this.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
                <Body >
                    <Title>Home</Title>
                </Body>
            </Header>
            <Content contentContainerStyle={styles.content} >
                <Text>Content Here</Text>
            </Content>
        </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{

  },
  header:{
   
  }
})