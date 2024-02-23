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
import {requestNotifications} from 'react-native-permissions';

const Stack = createStackNavigator();

export const AuthContext = createContext();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});


function App () {
  
  useEffect(()=>{
    //최초 시작 시 푸시알림 권한 얻기
    requestNotifications(['alert', 'sound']).then(({status, settings}) => {
      console.log(status, settings);
  });
},[])

useEffect(() => {
  PushNotification.createChannel(
    {
      channelId: "my-channel-id", // 채널 ID
      channelName: "My Channel", // 채널 이름
      channelDescription: "A channel to categorise your notifications", // 채널 설명
      soundName: "default", // 채널에서 사용할 소리의 이름
      importance: 4, // 채널의 중요도. 0 ~ 4 사이의 값을 가짐
      vibration: true, // 진동 설정
      smallIcon: "ic_launcher",
      largeIcon: "ic_launcher",
    },
    created => console.log(`createChannel returned '${created}'`) // 성공적으로 채널이 만들어졌는지 확인
  );
}, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Foreground Push: ", remoteMessage);
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "my-channel-id",
        // ... 기타 설정들 ...
        
        /* iOS and Android properties */
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        // ... 기타 설정들 ...
        smallIcon: "ic_launcher",
        largeIcon: "ic_launcher",
      });
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