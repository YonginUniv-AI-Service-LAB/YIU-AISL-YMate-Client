import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {styles} from "../Style"

import Main from '../Main/Main';
import Delivery from '../Delivery/Delivery';
import Taxi from '../Taxi/Taxi';
import Notification from '../Notification/Notification';
import MyPost from '../MyPost/MyPost';
import MyPage from '../MyPage/MyPage';
import TabBar from './TabBar';

const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const MainStackScreen = () => {
    return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
    )
 };
  
  const DeliveryStackScreen = () => {
    return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Delivery" component={Delivery} />
    </Stack.Navigator>
    )
  };
  
  const TaxiStackScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Taxi" component={Taxi} />
      </Stack.Navigator>
    )
   };
  
  const MyPostStackScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyPost" component={MyPost} />
      </Stack.Navigator>
    )
  };
  
  const MyPageStackScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyPage" component={MyPage} />
      </Stack.Navigator>
    )
  };
  const DeliveryDetailStackScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
      </Stack.Navigator>
    )
  };

  const TaxiDetailStackScreen = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TaxiDetail" component={TaxiDetail} />
      </Stack.Navigator>
    )
  };

const TabStackScreen = () => {
    return (
      <TabStack.Navigator initialRouteName="홈" tabBar={props => <TabBar {...props} />}>
        <TabStack.Screen name="배달" component={DeliveryStackScreen}/>
        <TabStack.Screen name="택시" component={TaxiStackScreen}/>
        <TabStack.Screen name="홈" component={MainStackScreen}/>
        <TabStack.Screen name="내가 쓴 글" component={MyPostStackScreen}/>
        <TabStack.Screen name="내 정보" component={MyPageStackScreen}/>
    </TabStack.Navigator>
    );
};

export default TabStackScreen;