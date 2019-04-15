import React, { Component } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { Header, Title, Container, Button, Text, Left, Right, Body, Content, List, ListItem } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid"
import { Icon } from 'react-native-elements';
import { styles } from '../../Style';

export default class DetailScreen extends Component {

    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
      };

      constructor() {
        super()
        this.state={
          data: [],
          index: '',
          name: ''
        }
      }


      componentDidMount(){
          this.setState({
            data: this.props.navigation.state.params.data1,
            index: this.props.navigation.state.params.data2,
            name: this.props.navigation.state.params.data3,
          })
        }


    render() {
        const weight = this.state.data.weight
        const height = this.state.data.height
        const abilities = this.props.navigation.state.params.data1.abilities
        const types = this.props.navigation.state.params.data1.types
        
        return (
     
            <Container>
                <Header style={styles.container}>
                    <StatusBar barStyle={"dark-content"} backgroundColor="#f9b529" />
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={{marginLeft:15}}>
                            <Icon name='arrow-left' type='font-awesome' size={20} color='#000'/>
                        </View>
                        </Button>
                    </Left>
                    <Body style={{flex: 1,alignItems:'center',paddingBottom:5}}>
                      <Title style={[styles.headertext,{textTransform:'capitalize'}]}>{this.state.name}</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>

                <View style={{flex: 1, backgroundColor: '#fafafa'}}>
                  <View style={[styles.box, {marginLeft:20, marginRight:20, marginTop:20}]}>
                    <Image
                      source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ this.state.index +'.png'}}
                      style={{width: 200, height: 200}}
                    />
                  </View>
                  
          <Content style={{paddingLeft:20, paddingRight: 20, paddingTop: 10}}>
            <Grid>
              <Row>
                <Col>
                  <List>
                    <ListItem itemHeader>
                      <Text style={{fontWeight:'600'}}>WEIGHT</Text>
                    </ListItem>
                    <ListItem noBorder>
                      <Text style={{color:'#4f4f4f'}}>{weight}</Text>
                    </ListItem>
                  </List>
                </Col>
                <Col>
                  <List>
                    <ListItem itemHeader>
                      <Text style={{fontWeight:'600'}}>HEIGHT</Text>
                    </ListItem>
                    <ListItem noBorder>
                      <Text style={{color:'#4f4f4f'}}>{height}</Text>
                    </ListItem>
                  </List>
                </Col>
              </Row>

              <Row>
                <Col>
                  <List>
                    <ListItem itemHeader>
                      <Text style={{fontWeight:'600'}}>TYPE</Text>
                    </ListItem>
                    {
                      types.map((a, i) => (
                        <ListItem key={i} noBorder>
                          <Text style={{color:'#4f4f4f'}}>
                            {a.type.name}
                          </Text>
                        </ListItem>))
                    }
                  </List>
                </Col>
                <Col>
                  <List>
                    <ListItem itemHeader>
                      <Text style={{fontWeight:'600'}}>ABILITY</Text>
                    </ListItem>
                    {
                      abilities.map((a, i) => (
                        <ListItem key={i} noBorder>
                          <Text style={{color:'#4f4f4f'}}>
                            {a.ability.name}
                          </Text>
                        </ListItem>))
                    }
                  </List>
                </Col>
              </Row>
            </Grid>
          </Content>
            
                </View>
 
            </Container>
        );
    }
}


