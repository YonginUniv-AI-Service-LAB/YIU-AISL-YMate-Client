import React, { useState, useEffect, createContext, useCallback } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAccessTokenInfo, callApi } from './src/components/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Login from './src/page/Login/Login';
import Signup from './src/page/Signup/Signup';
import DeliveryRecruit from './src/page/Delivery/DeliveryRecruit';
import DeliveryRequest from './src/page/Delivery/DeliveryRequest';
import TaxiRecruit from './src/page/Taxi/TaxiRecruit';
import TaxiRequest from './src/page/Taxi/TaxiRequest';
import Password from './src/page/Password/Password';
import Notification from './src/page/Notification/Notification';
import Alarm from './src/page/Alarm/Alarm';

import DeliveryDetail from './src/page/DeliveryDetail/DeliveryDetail';
import TaxiDetail from './src/page/TaxiDetail/TaxiDetail';
import TabStackScreen from './src/page/BottomTab/TabStackScreen';
import Location from './src/page/Location/Location';
import NoticeCreate from './src/page/Notification/NoticeCreate';

const Stack = createStackNavigator();

export const AuthContext = createContext();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});


function App () {
 
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Foreground Push: ", remoteMessage);
      PushNotification.localNotification({
        title: remoteMessage.notification.title,  // 알림의 제목
        message: remoteMessage.notification.body,  // 알림의 내용
        smallIcon: 'ic_notification',  // 알림의 아이콘
        largeIcon: 'ic_launcher',  // 알림의 큰 아이콘
        color: 'blue',  // 알림의 색상
        soundName: 'default',  // 알림의 사운드
      });
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  
      if (isLoggedIn === 'true') {
        setIsLoggedIn(true);
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  }, []);

  const onLogin = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };
  

  return (
    <AuthContext.Provider value={{ logout }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main">
              {props => <TabStackScreen {...props} logout={logout} />}
            </Stack.Screen>
            <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
            <Stack.Screen name="DeliveryRecruit" component={DeliveryRecruit} />
            <Stack.Screen name="DeliveryRequest" component={DeliveryRequest} />
            <Stack.Screen name="TaxiDetail" component={TaxiDetail} />
            <Stack.Screen name="TaxiRecruit" component={TaxiRecruit} />
            <Stack.Screen name="TaxiRequest" component={TaxiRequest} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="NoticeCreate" component={NoticeCreate} />
            <Stack.Screen name="Alarm" component={Alarm} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <Login {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Password" component={Password} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;