import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Main from './src/page/Main/Main';
import Login from './src/page/Login/Login';
import Signup from './src/page/Signup/Signup';
import Delivery from './src/page/Delivery/Delivery';
import Taxi from './src/page/Taxi/Taxi';

const Stack = createStackNavigator()
enableScreens()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Taxi" component={Taxi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;