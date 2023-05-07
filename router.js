/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Wellcome from './src/screens/Auth/wellcome';
import Login from './src/screens/Auth/login';
import Register from './src/screens/Auth/register';
import Profile from './src/screens/Content/profile';
import Forgot from './src/screens/Auth/forgot';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return <Drawer.Navigator initialRouteName="Wellcome">
    <Drawer.Screen name="Wellcome" component={Wellcome} options={{ headerShown: false }} />
    {/* <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
    <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
  </Drawer.Navigator>;
};

const StackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return <Navigator>
    <Screen name="Home" component={Home} options={{
      headerShown: false,
    }} />
    <Screen name="Login" component={Login} options={{
      headerShown: false,
    }} />
    <Screen name="Register" component={Register} options={{
      headerShown: false,
    }} />
    <Screen name="Forgot" component={Forgot} options={{
      headerShown: false,
    }} />
    <Screen
      name="Drawer"
      component={DrawerNavigator}
      options={{
        headerShown: false,
      }}
    />
  </Navigator>;
};


const Router = () => {
  return <NavigationContainer>
    <StackNavigator />
    {/* <DrawerNavigator /> */}
  </NavigationContainer>;
};

export default Router;
