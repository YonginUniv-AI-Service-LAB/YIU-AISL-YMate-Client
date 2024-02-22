import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { WriteButton, DeliveryCard, TopMenu } from "../../components";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';


const Delivery = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)
	const [deliveryData, setDeliveryData] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
		  fetchData(); // 화면이 focus되면 fetchData 함수 호출
		}, [])
	  );
	
	  const fetchData = async () => {
		try {
		  const response = await axios.get(`${process.env.API_URL}/delivery`, {
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded",
			},
			withCredentials: true,
		  });
	  
		  // 가져온 데이터를 state에 저장
		  setDeliveryData(response.data);
		} catch (error) {
		  console.error("데이터 가져오기 실패:", error);
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
						<View name="deliverySection" style={styles.mainSection}>
							<View style={styles.mainSectionTitle}>
								<View style={styles.rowView}>
									<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
									<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
								</View>
								{/* <Pressable style={styles.rowView} onPress={()=>Alert.alert("배달더보기")}>
									<Text style={styles.clickText13}>마감 가가운 순</Text>
									<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
								</Pressable> */}
							</View>
								<FlatList
									contentContainerStyle={styles.bigCardScroll}
									showsHorizontalScrollIndicator={false}
									data={deliveryData}
									renderItem={({item}) => <DeliveryCard size={1} dId={item.did} state={item.state} title={item.title} due={item.due} food={item.foodCode} location={item.locationCode} studentId={item.studentId}/>}
									keyExtractor={item => item.did}
									refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
								/>
						</View>
					</View>
      			</View>
    		</SafeAreaView>
			<WriteButton onPress={() => navigation.navigate('DeliveryRecruit')}/>
		</>);
};



export default Delivery;
