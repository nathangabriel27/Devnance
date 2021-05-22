import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import Login from '../src/Pages/Login'
import Main from '../src/Pages/Main'
import ShowDetails from '../src/Pages/ShowDetails'
import FindEnterprice from '../src/Pages/FindEnterprice'

const Stack = createStackNavigator();

export default function Routes() {
  function RootStack() {
    return (
      <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: true, animationEnabled: false }}>
        <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="Main" component={Main} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="ShowDetails" component={ShowDetails} options={{ title: '', headerShown: false, }} />
        <Stack.Screen name="FindEnterprice" component={FindEnterprice} options={{ title: '', headerShown: false, }} />
      </Stack.Navigator >
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, animationEnabled: false }}>
        <Stack.Screen
          name="RootStack"
          component={RootStack}
          options={{ headerShown: false, }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}











