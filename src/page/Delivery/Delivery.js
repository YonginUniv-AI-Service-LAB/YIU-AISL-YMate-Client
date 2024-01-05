import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { WriteButton, DeliveryCard, TopMenu } from "../../components";
import axios from "axios";


const Delivery = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)
	const [deliveryData, setDeliveryData] = useState([]);

	useEffect(() => {
		// 컴포넌트가 마운트될 때 데이터를 가져오는 함수 호출
		fetchData();
	  }, []);
	
	  const fetchData = async () => {
		try {
		  const response = await axios.get("http://172.30.1.28:8080/delivery", {
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

	// const DeliveryData = [
	// 	{
	// 		dId: 123123123,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-05T17:55:00'),
	// 		food: 332211,
	// 		location: 10000001,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 123123124,
	// 		title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
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
	// 	},
	// 	{
	// 		dId: 12312124124126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 331235678211,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 1212455233126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 3367895678211,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 12543586226,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 33123123111,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		dId: 1123458673126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 3376831,
	// 		location: 10000002,
	// 		createAt: 3322111,
	// 	},
	// ]

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
								<Pressable style={styles.rowView} onPress={()=>Alert.alert("배달더보기")}>
									<Text style={styles.clickText13}>마감 가가운 순</Text>
									<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
								</Pressable>
							</View>
								<FlatList
									contentContainerStyle={styles.bigCardScroll}
									showsHorizontalScrollIndicator={false}
									data={deliveryData}
									renderItem={({item}) => <DeliveryCard size={1} did={item.did} title={item.title} due={item.due} food={item.food} location={item.location} studentId={item.studentId}/>}
									keyExtractor={item => item.did}
									refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
								/>
						</View>
					</View>
      			</View>
    		</SafeAreaView>
			<WriteButton onPress={() => navigation.navigate('DeliveryRecruit')}/>
		</>);
};



export default Delivery;
