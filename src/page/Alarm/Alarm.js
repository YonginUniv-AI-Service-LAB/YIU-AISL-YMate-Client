import React, { useState, useEffect, useCallback,useContext } from "react";
import { Text, StyleSheet, Image, Pressable, View, FlatList, RefreshControl, Alert } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import {styles} from "../Style"
import { getUserInfo, getAccessTokenInfo , callApi} from '../../components/utils'
import { Header } from "../../components";
import {AuthContext} from '../../../App';
import moment from 'moment-timezone'

const Alarm = ({navigation}) => {
	const { logout } = useContext(AuthContext);
	const [refreshing, setRefreshing] = React.useState(false)
	const [AlarmData, setAlarmData] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
		  fetchData(); // 화면이 focus되면 fetchData 함수 호출
		  console.log(AlarmData);
		}, [])
	  );

	const fetchData = async () => {
		try {
		  const response = await callApi(`${API_URL}/user/push`, 'get');
		  const data = response.data;
		  setAlarmData(data);
		} catch (error) {
		  if (error.message === 'Session expired. Please login again.') {
			Alert.alert('세션에 만료되었습니다.')
			logout();
		  } else {
			console.error("데이터 가져오기 실패:", error);
		  }
		}
	  };

	  const handleAlarmCard = async (type, id) => {
		if (type === 'DELIVERY') {
			// deliverydetail 페이지로 이동. dId를 인자로 전달.
			navigation.navigate('DeliveryDetail', { dId: id });
		} else if (type === 'TAXI') {
			// taxidetail 페이지로 이동. tId를 인자로 전달.
			navigation.navigate('TaxiDetail', { tId: id });
		}
	}
	

	// const AlarmData = [
	// 	{
	// 		pushId: 123123123,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123124,
	// 		contents: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123125,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123126,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123127,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123128,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123129,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		pushId: 123123130,
	// 		contents: "장충동 왕족발보쌈",
	// 		type: 11222333344,
	// 		createAt: 3322111,
	// 	}
	// ]

	const AlarmCard = ({id, contents, type, createdAt}) => (
    <Pressable style={styles.alarmCard} onPress={() => handleAlarmCard(type, id)}>
      <View style={styles.alarmViewed} backgroundColor={'#22a2f2'}/>
      {type === 'DELIVERY' && 
        <Image style={[styles.icon21, styles.marginHorizontal6]} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
      }
      {type === 'TAXI' && 
        <Image style={[styles.icon21, styles.marginHorizontal6]} resizeMode="cover" source={require("../../assets/images/taxi.png")}/>
      }
      <View style={styles.alarmContentBox}>
        <Text style={[styles.text14, styles.alarmContent]} numberOfLines={1}>
          {contents}
        </Text>
        <Text style={[styles.text10, styles.alarmCreateAt]}>
			{moment(createdAt).format('YYYY년 MM월 DD일 HH:mm')}
        </Text>
      </View>
    </Pressable>
	)

  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.mainBackground}>
		  <Header title="알림 목록" onPressBack={() => navigation.pop()}/>
          <View style={[styles.flexView, styles.backgroundWhite]}>
            <FlatList
              contentContainerStyle={styles.bigCardScroll}
              showsHorizontalScrollIndicator={false}
              data={AlarmData}
              renderItem={({item}) => <AlarmCard id={item.id}contents={item.contents} createdAt={item.createdAt} type ={item.type}/>}
              keyExtractor={item => item.pushId}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};


export default Alarm;
