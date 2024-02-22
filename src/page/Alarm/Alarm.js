import React, { useState, useEffect, useCallback, useContext } from "react";
import { Text, StyleSheet, Image, Pressable, View, FlatList, RefreshControl, Alert, AsyncStorage} from "react-native";
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
			// console.log('AlarmData:',AlarmData);
			// console.log('readAlarmData:',readAlarmData)
		}, [])
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		fetchData()
		setRefreshing(false)
	})

	const fetchData = async () => {
		try {
			const response = await callApi(`${process.env.API_URL}/user/push`, 'get');
			const data = response.data;
			data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			
			let alarmData = await AsyncStorage.getItem('alarmData');
			if (!alarmData) {
				alarmData = [];
			} else {
				alarmData = JSON.parse(alarmData);
			}
			
			const newData = data.map(item => {
				if (alarmData.includes(item.pushId)) {
					return { ...item, read: 1 };
				} else {
					return { ...item, read: 0 };
				}
			});
			
			setAlarmData(newData);
		} catch (error) {
			if (error.message === 'Session expired. Please login again.') {
				Alert.alert('세션에 만료되었습니다.')
				logout();
			} else {
				console.error("데이터 가져오기 실패:", error);
			}
		}
	};
	  
	const saveAlarmData = async (pushId) => {
		try {
			let alarmData = await AsyncStorage.getItem('alarmData');
			// console.log('readAlarmData:', alarmData);
			if (!alarmData) {
				alarmData = [];
			} else {
				alarmData = JSON.parse(alarmData);
			}
			if (!alarmData.includes(pushId)) {
				alarmData.push(pushId);
				await AsyncStorage.setItem('alarmData', JSON.stringify(alarmData));
			} else {
				// console.log('이미 존재하는 pushId입니다.');
			}
		} catch (error) {
			console.error('AsyncStorage에 AlarmData를 저장하는 중 오류 발생:', error);
		}
	};

	const handleAlarmCard = async (type, id, pushId) => {
		saveAlarmData(pushId); // handleAlarmCard가 작동한 AlarmData의 pushId를 AsyncStorage에 저장
		if (type === 'DELIVERY') {
			// deliverydetail 페이지로 이동. dId를 인자로 전달.
			navigation.navigate('DeliveryDetail', { dId: id });
		} else if (type === 'TAXI') {
			// taxidetail 페이지로 이동. tId를 인자로 전달.
			navigation.navigate('TaxiDetail', { tId: id });
		}
    };
	// console.log(AlarmData);

	const AlarmCard = ({id, contents, type, createdAt, pushId, read}) => (
		<Pressable style={styles.alarmCard} onPress={() => handleAlarmCard(type, id, pushId)}>
		{read ? 
			<View style={styles.alarmViewed}/>
			:
			<View style={styles.alarmViewed} backgroundColor={'#22a2f2'}/>
		}
		{type === 'DELIVERY' && 
			<Image style={[styles.icon21, styles.marginHorizontal6]} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
		}
		{type === 'TAXI' && 
			<Image style={[styles.icon21, styles.marginHorizontal6]} resizeMode="cover" source={require("../../assets/images/taxi.png")}/>
		}
		<View style={styles.alarmContentBox}>
			<Text style={[styles.text14, styles.alarmContent]} numberOfLines={2}>
			{contents}
			</Text>
			<Text style={[styles.text10, styles.alarmCreateAt]}>
				{moment(createdAt).format('YYYY-MM-DD HH:mm')}
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
              renderItem={({item}) => <AlarmCard id={item.id}contents={item.contents} createdAt={item.createdAt} type ={item.type} pushId={item.pushId} read={item.read}/>}
              keyExtractor={item => item.pushId}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
          </View>
      </View>
    </SafeAreaView>
  );
};


export default Alarm;
