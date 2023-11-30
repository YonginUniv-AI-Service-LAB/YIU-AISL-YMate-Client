import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Main from './src/page/Main/Main';
import Login from './src/page/Login/Login';
import Signup from './src/page/Signup/Signup';
import Delivery from './src/page/Delivery/Delivery';
import DeliveryRecruit from './src/page/Delivery/DeliveryRecruit';
import DeliveryRequest from './src/page/Delivery/DeliveryRequest';
import Taxi from './src/page/Taxi/Taxi';
import TaxiRecruit from './src/page/Taxi/TaxiRecruit';
import TaxiRequest from './src/page/Taxi/TaxiRequest';
import Password from './src/page/Password/Password';
import Notification from './src/page/Notification/Notification';
import MyPost from './src/page/MyPost/MyPost';
import MyPage from './src/page/MyPage/MyPage';
import Alarm from './src/page/Alarm/Alarm';
import DelivertDetail from './src/page/DeliveryDetail/DeliveryDetail';

const Stack = createStackNavigator()
enableScreens()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Taxi" component={Taxi} />
        <Stack.Screen name="TaxiRecruit" component={TaxiRecruit} />
        <Stack.Screen name="TaxiRequest" component={TaxiRequest} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="MyPost" component={MyPost} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="DeliveryRecruit" component={DeliveryRecruit} />
        <Stack.Screen name="DelivertDetail" component={DelivertDetail} />
        <Stack.Screen name="DeliveryRequest" component={DeliveryRequest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;