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
import Alarm from '../Alarm/Alarm';
import Report from "../Report/Report";

const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const MainStackScreen = () => {
    return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Alarm" component={Alarm} />
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
        <Stack.Screen name="Report" component={Report} />
      </Stack.Navigator>
    )
  };

const TabStackScreen = () => {
    return (
      <TabStack.Navigator initialRouteName="홈" tabBar={props => <TabBar {...props} />}>
        <TabStack.Screen name="배달" component={DeliveryStackScreen} options={{ unmountOnBlur: true }}/>
        <TabStack.Screen name="택시" component={TaxiStackScreen} options={{ unmountOnBlur: true }}/>
        <TabStack.Screen name="홈" component={MainStackScreen} options={{ unmountOnBlur: true }}/>
        <TabStack.Screen name="내가 쓴 글" component={MyPostStackScreen} options={{ unmountOnBlur: true }}/>
        <TabStack.Screen name="내 정보" component={MyPageStackScreen} options={{ unmountOnBlur: true }}/>
      </TabStack.Navigator>
  );
};

export default TabStackScreen;