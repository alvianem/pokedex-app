import React from 'react';
import { StyleProvider } from 'native-base';
import RootNavigator from './app/Navigator'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

export default class App extends React.Component {
  render() {
    return (
      
      <StyleProvider style={getTheme(platform)}>
          
              <RootNavigator />
          
      </StyleProvider>

  );
  }
}