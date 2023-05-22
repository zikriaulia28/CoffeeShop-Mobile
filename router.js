/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useEffect } from 'react';


import Home from './Home';
import Wellcome from './src/screens/Auth/wellcome';
import Login from './src/screens/Auth/login';
import Register from './src/screens/Auth/register';
import Profile from './src/screens/Profile/profile';
import Forgot from './src/screens/Auth/forgot';
import Dashboard from './src/screens/Content/dashboard';
import Product from './src/screens/Product/product';
import Chat from './src/screens/Content/chat';
import CustomDrawer from './src/components/customDrawer';
import Cart from './src/screens/Transaction/cart';
import SplashScreen from './src/components/splashScreen';
import ProductDetail from './src/screens/Product/productDetail';
import History from './src/screens/History/history';
import EditProfile from './src/screens/Profile/editProfile';
import Delivery from './src/screens/Transaction/delivery';
import Payment from './src/screens/Transaction/payment';
import ChatDetail from './src/screens/Content/chatDetail';
import AddProduct from './src/screens/Product/addProduct';
import AddPromo from './src/screens/Promo/addPromo';
import EditProduct from './src/screens/Product/editProduct';
import ManageOrder from './src/screens/Admin/manageOrder';
import Promo from './src/screens/Promo/promo';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DashboardTab" component={DrawerNavigator} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
        tabBarActiveTintColor: 'brown',
        tabBarIconStyle: { marginTop: 10 },
        tabBarItemStyle: { paddingLeft: 5 },
        tabBarStyle: { height: 55 },
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" color={color} size={size} />
        ),
        tabBarActiveTintColor: 'brown',
        tabBarIconStyle: { marginTop: 10, marginLeft: 80 },
        tabBarStyle: { height: 55 },
      }} />
      <Tab.Screen name="Chat" component={Chat} options={{
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" color={color} size={size} />
        ),
        tabBarActiveTintColor: 'brown',
        tabBarIconStyle: { marginTop: 10, marginLeft: 10 },
        tabBarStyle: { height: 55 },
      }} />
    </Tab.Navigator>
  );
}

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Dashboard" component={Dashboard} options={{
      headerShown: false,
    }} />
    {/* <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} /> */}
  </Drawer.Navigator>;
};

const StackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="SplashScreen">
      <Screen name="SplashScreen" component={SplashScreen} options={{
        headerShown: false,
      }} />
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
      <Screen name="MyTabs" component={MyTabs} options={{
        headerShown: false,
      }} />
      <Screen name="Wellcome" component={Wellcome} options={{
        headerShown: false,
      }} />
      <Screen name="Product" component={Product} options={{
        headerShown: false,
      }} />
      <Screen name="Cart" component={Cart} options={{
        headerShown: false,
      }} />
      <Screen name="ProductDetail" component={ProductDetail} options={{
        headerShown: false,
      }} />
      <Screen name="History" component={History} options={{
        headerShown: false,
      }} />
      <Screen name="EditProfile" component={EditProfile} options={{
        headerShown: false,
      }} />
      <Screen name="Delivery" component={Delivery} options={{
        headerShown: false,
      }} />
      <Screen name="Payment" component={Payment} options={{
        headerShown: false,
      }} />
      <Screen name="ChatDetail" component={ChatDetail} options={{
        headerShown: false,
      }} />
      <Screen name="AddProduct" component={AddProduct} options={{
        headerShown: false,
      }} />
      <Screen name="AddPromo" component={AddPromo} options={{
        headerShown: false,
      }} />
      <Screen name="EditProduct" component={EditProduct} options={{
        headerShown: false,
      }} />
      <Screen name="ManageOrder" component={ManageOrder} options={{
        headerShown: false,
      }} />
      <Screen name="Promo" component={Promo} options={{
        headerShown: false,
      }} />
    </Navigator>
  );
};


const Router = () => {
  return <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>;
};

export default Router;
