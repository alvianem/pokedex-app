import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Alert, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Header, Title, Container, Button, Footer, Text } from 'native-base';
import { SearchBar, ListItem } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { styles } from '../../Style';

export default class MainMenuScreen extends Component {

    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
      };

      constructor() {
        super()
        this.state={
          loading: false,
          pause: false,
          data: [],
          error: null,
          next: '',
          arrayholder: [],
          progress: 0,
          male: [],
          female: [],
          genderless: [],
          gender: [],
          isName: true,
          detail:[]
        }
      }

      updateSearch = search => {
        this.setState({ search });
      };    

      updateSearch2 = search2 => {
        this.setState({ search2 });
      }; 

      async componentDidMount(){
        const url = `https://pokeapi.co/api/v2/pokemon/`;
        this.setState({ loading: true });

        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res.results,
              error: res.error || null,
              loading: false,
              next: res.next,
              arrayholder: res.results,
            });
            this.femaleGender();
            this.addNewList();
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });

         }

         femaleGender(){
          const url = `https://pokeapi.co/api/v2/gender/1`;
          fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              female: res.pokemon_species_details,

            });

            this.maleGender();
          })
          .catch(error => {
  
          });
         }

         maleGender(){
          const url = `https://pokeapi.co/api/v2/gender/2`;
          fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              male: res.pokemon_species_details,
            });
            this.genderLess();
          })
          .catch(error => {
     
          });
         }

         genderLess(){
          const url = `https://pokeapi.co/api/v2/gender/3`;
          fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              genderless: res.pokemon_species_details,
            });
            this.combine();
          })
          .catch(error => {
  
          });
         }

         combine(){
           this.state.gender.push(this.state.female);
           this.state.gender.push(this.state.male);
           this.state.gender.push(this.state.genderless);
         }

         renderSeparator = () => {
          return (
            <View
              style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '14%',
              }}
            />
          );
        };
        
        searchFilterFunction = text => {
          if(this.state.progress > 99){
          this.setState({
            value: text,
          });
          const newData = this.state.arrayholder.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();     
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            data: newData,
          });
        }else{
          Alert.alert('Wait until All Data loaded')
        }
        };

        searchFilterFunction2 = text => {
          if(this.state.progress > 99){
          this.setState({
            value2: text,
          });
      
          const newData = this.state.arrayholder.filter(item => {
            console.log(item.gender)
            console.log(item.name)
            const itemData = item.gender.toUpperCase();
            const textData = text.toUpperCase();
      
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            data: newData,
          });
        }else{
          Alert.alert('Wait until All Data loaded')
        }
        };

        addNewList(){
          const url = this.state.next;

          if(url !== null){
          fetch(url)
            .then(res => res.json())
            .then(res => {
              this.state.progress = this.state.progress + 2.083;
          
              let newState = this.state.data.concat(res.results);
                this.setState({
                  pause: true,
                  data: newState,
                  next: res.next,
                  error: res.error || null,
                  arrayholder: newState
                })
                this.addNewList()
            })
            .catch(error => {
              this.setState({ error });
            });
          }else{
            for(let l = 0; l < this.state.data.length; l++){
              this.state.data[l].gender = '-';
              this.state.arrayholder[l].gender = '-';
            }

            for(let i = 0; i < this.state.gender.length; i++){
              for(let j = 0; j < this.state.gender[i].length; j++){
                for(let k = 0; k < this.state.data.length; k++){
                  if(this.state.gender[i][j].pokemon_species.name === this.state.data[k].name){
                    if(i === 0){
                      this.state.data[k].gender = 'female';
                      this.state.arrayholder[k].gender = 'female';
                     }else if(i === 1){
                       this.state.data[k].gender = 'male';
                       this.state.arrayholder[k].gender = 'male';
                     }else if(i === 2){
                       this.state.data[k].gender = 'genderless';
                       this.state.arrayholder[k].gender = 'genderless';
                     }
                  }
                }
              }
  
           }
            Alert.alert('All Data loaded')
          }
        }

      byName(){
        this.setState({
          isName: true
        })
      }

      byGender(){
        this.setState({
          isName: false
        })
      }

      showDetail(index, name){
        const url = `https://pokeapi.co/api/v2/pokemon/`+ index;

        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.props.navigation.navigate('Detail', {data1: res, data2: index, data3: name})       
          })
          .catch(error => {

          });
      }

    render() {
      const barWidth = Dimensions.get('screen').width;
      const progressCustomStyles = {
        backgroundColor: '#fcd766', 
        borderRadius: 0,
        borderColor: '#fff'
      };
        if (this.state.loading) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
     
            <Container>
                <Header style={styles.container}>
                    <StatusBar barStyle={"dark-content"} backgroundColor="#f9b529" />
                    <Title style={styles.headertext}>Pokedex</Title>
                </Header>
                {this.state.isName ?
                <SearchBar
                  placeholder="Write name here..."
                  onChangeText={this.updateSearch}
                  value={this.state.search}
                  autoCorrect={false}             
                  lightTheme
                  round
                  containerStyle={{backgroundColor:'#fff',borderBottomWidth:0}}
                  inputContainerStyle={{backgroundColor:'#f4f4f4'}}
                  inputStyle={{color:'#000'}}
                  value={this.state.value}
                  onChangeText={text => this.searchFilterFunction(text)}
                />:
                <SearchBar
                  placeholder="Write gender here..."
                  onChangeText={this.updateSearch2}
                  value={this.state.search2}
                  autoCorrect={false}             
                  lightTheme
                  round
                  containerStyle={{backgroundColor:'#fff',borderBottomWidth:0}}
                  inputContainerStyle={{backgroundColor:'#f4f4f4'}}
                  inputStyle={{color:'#000'}}
                  value={this.state.value2}
                  onChangeText={text => this.searchFilterFunction2(text)}
                />}
            <ScrollView>
                <View style={{flex: 1, backgroundColor: '#fafafa'}}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item, index }) => (
                    
                    <ListItem
                      leftAvatar={{ rounded: true, source: { uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ (this.state.arrayholder.map(e => e.name).indexOf(item.name)+1) +'.png' } }}
                      title={item.name}
                      titleStyle={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                      chevronColor="#4f4f4f"
                      chevron
                      subtitle={item.gender}
                      subtitleStyle={{ fontWeight: '300', color: '#4f4f4f'}}
                      onPress={() => this.showDetail(this.state.arrayholder.map(e => e.name).indexOf(item.name)+1,item.name)}
                    />
                  )}
                  keyExtractor={item => item.name}
                  ItemSeparatorComponent={this.renderSeparator}
                />
                </View>
            </ScrollView>
            <ProgressBarAnimated
            {...progressCustomStyles}
            width={barWidth}
            value={this.state.progress}
            height={10}
          /> 
          <Footer style={{borderTopWidth: 0}}>
          {this.state.isName ?
            <Button style={styles.button} onPress={() => this.byGender()}>
              <Text style={styles.buttonText}>Search Pokemon By Gender</Text>
             </Button> 
             :
             <Button style={styles.button} onPress={() => this.byName()}>
              <Text style={styles.buttonText}>Search Pokemon By Name</Text>
             </Button> 
             }
             </Footer>
            </Container>
        );
    }
}


