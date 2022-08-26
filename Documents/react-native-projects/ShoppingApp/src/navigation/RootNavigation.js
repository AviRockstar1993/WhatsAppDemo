import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerScreen from '../screens/DrawerScreen';
import NavHomePage from '../screens/NavHomePage';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen
          name="DrawerScreen"
          component={DrawerScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="NavHomePage" component={NavHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
