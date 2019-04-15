import {
    createStackNavigator, 
    createAppContainer
} from 'react-navigation';
import HomeScreen from '../Screen/HomeScreen'
import DetailScreen from '../Screen/DetailScreen'

const MainStack = createStackNavigator({
  Home: {screen: HomeScreen},
  Detail: {screen: DetailScreen}
});

const RootNavigator = createAppContainer(MainStack);

export default RootNavigator