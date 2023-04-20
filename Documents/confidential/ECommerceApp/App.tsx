import React from 'react';

import AppNavigator from './src/screens/navigation/AppNavigator';
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
