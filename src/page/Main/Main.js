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
	
		}
	  };

	  const onRefresh = useCallback(() => {
		setRefreshing(true)
		fetchData()
		setRefreshing(false)
	  })

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