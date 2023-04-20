import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../Drawer Navigation/MainPage';
import ProductDetail from '../tabs/productDetail/ProductDetail';
import CartPage from '../tabs/cartPage/CartPage';
import Login from '../SignInSteps/Login';
import SignUp from '../SignInSteps/SignUp';
import Notification from '../tabs/notification/Notification';
import Checkout from '../tabs/checkOut/Checkout';
import Addresses from '../tabs/address/Addresses';
import AddAddress from '../tabs/address/AddAddress';
import Profile from '../tabs/profile/Profile';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
