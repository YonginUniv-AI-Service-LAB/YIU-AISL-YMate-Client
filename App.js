import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Login from './src/page/Login/Login';
import Signup from './src/page/Signup/Signup';
import DeliveryRecruit from './src/page/Delivery/DeliveryRecruit';
import DeliveryRequest from './src/page/Delivery/DeliveryRequest';
import TaxiRecruit from './src/page/Taxi/TaxiRecruit';
import TaxiRequest from './src/page/Taxi/TaxiRequest';
import Password from './src/page/Password/Password';

import DeliveryDetail from './src/page/DeliveryDetail/DeliveryDetail';
import TaxiDetail from './src/page/TaxiDetail/TaxiDetail';
import TabStackScreen from './src/page/BottomTab/TabStackScreen';
import Alarm from './src/page/Alarm/Alarm';
import Location from './src/page/Location/Location';

const Stack = createStackNavigator();



const App = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="Main" component={TabStackScreen }/>
          <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
          <Stack.Screen name="DeliveryRecruit" component={DeliveryRecruit} />
          <Stack.Screen name="DeliveryRequest" component={DeliveryRequest} />
          <Stack.Screen name="TaxiDetail" component={TaxiDetail} />
          <Stack.Screen name="TaxiRecruit" component={TaxiRecruit} />
          <Stack.Screen name="TaxiRequest" component={TaxiRequest} />
          <Stack.Screen name="Alarm" component={Alarm} />
          <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
