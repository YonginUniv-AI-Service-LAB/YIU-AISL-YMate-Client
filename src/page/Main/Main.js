import React, { useState, useCallback} from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import {TopMenu, WriteButton, DeliveryCard, TaxiCard, NoticeCard} from "../../components"
import axios from 'axios';
import { getUserInfo, getAccessTokenInfo } from '../../components/utils'
import { useFocusEffect } from '@react-navigation/native';


const Main = ({navigation}) => {
	const [refreshing, setRefreshing] = useState(false)
	const [deliveryData, setDeliveryData] = useState([]);
	const [taxiData, setTaxiData] = useState([]);
	const [noticeData, setNoticeData] = useState([]);

	useFocusEffect(
		useCallback(() => {
		  fetchData(); // 화면이 focus되면 fetchData 함수 호출
		}, [])
	  );
	
	  const fetchData = async () => {
		try {
		  	const response = await axios.get(`${process.env.API_URL}/main`, {
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
		  });
		  setDeliveryData(response.data.delivery);
		  setTaxiData(response.data.taxi);
		  setNoticeData(response.data.notice);
		} catch (error) {
		  console.error("데이터 가져오기 실패:", error);
		}
	  };

	  const onRefresh = useCallback(() => {
		setRefreshing(true)
		fetchData()
		setRefreshing(false)
	  })

	// const DeliveryData = [
	// 	{
	// 		dId: 123123123,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-27T17:55:00'),
	// 		food: 332211,
	// 		location: 10000001,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 123123124,
	// 		title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
	// 		due: new Date('2023-12-27T10:55:00'),
	// 		food: 3321,
	// 		location: 10000009,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 123123125,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 341211,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 123123126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 33123412211,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 123123127,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 31234211,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	}
	// ]

	// const TaxiData = [
	// 	{
	// 		tId: 123123123,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000001,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		tId: 123123124,
	// 		title: "집 가고싶다집 가고싶다집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000002,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		tId: 123123125,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000003,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		tId: 123123126,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-05T11:55:00'),
	// 		startCode: 10000004,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		tId: 123123127,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	}
	// ]

	// const NoticeData = [
	// 	{
	// 		noticeId: 123123123,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		noticeId: 123123124,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-14T17:55:00'),
	// 	},
	// 	{
	// 		noticeId: 123123125,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		noticeId: 123123126,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		noticeId: 123123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	}
	// ]

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<TopMenu/>
					<View style={styles.mainBody}>
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
							<Image style={styles.advertiseImage} resizeMode="cover" source={require("../../assets/images/advertise.png")}/>
							<View name="deliverySection" style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
									</View>
									<Pressable style={styles.rowView} onPress={()=>navigation.navigate('배달')}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/right_blue.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainSectionList}>
									<FlatList
										contentContainerStyle={styles.smallCardScroll}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={deliveryData}
										renderItem={({item}) => <DeliveryCard dId={item.did} state={item.state} title={item.title} due={item.due} food={item.foodCode} location={item.locationCode} studentId={item.studentId}/>}
										keyExtractor={item => item.did}
									/>
								</View>
							</View>
							<View style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/taxi.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>같이 택시</Text>
									</View>
									<Pressable style={styles.rowView} onPress={()=>navigation.navigate('택시')}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/right_blue.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainSectionList}>
									<FlatList
										contentContainerStyle={styles.smallCardScroll}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={taxiData}
										renderItem={({item}) => <TaxiCard tId={item.tid} state={item.state} title={item.title} due={item.due} startCode={item.startCode} endCode={item.endCode} current={item.current} max={item.max} studentId={item.studentId}/>}
										keyExtractor={item => item.tid}
									/>
								</View>
							</View>
							<View style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<Text style={styles.centerText18}>공지사항</Text>
									<Pressable style={styles.rowView} onPress={()=> navigation.navigate('Notification')}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/right_blue.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainNoticeList}>
									{noticeData.map((item) => (
										<NoticeCard
											key={item.noticeId}
											noticeId={item.noticeId}
											title={item.title}
											updatedAt={item.updatedAt}
											contents={item.contents}
										/>
									))}
								</View>
							</View>
						</ScrollView>
					</View>
      			</View>
    		</SafeAreaView>
			<WriteButton expandable={true}/>
		</>);
};



export default Main;