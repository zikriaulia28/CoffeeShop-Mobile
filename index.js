// /* eslint-disable prettier/prettier */
// import 'react-native-gesture-handler';
// import { AppRegistry } from 'react-native';
// import Router from './router';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => Router);

/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router';
import { name as appName } from './app.json';
import store, { persistor } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);


