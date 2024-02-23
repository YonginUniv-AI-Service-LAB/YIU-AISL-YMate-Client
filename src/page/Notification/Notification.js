import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import axios from "axios";
import { Header, NoticeCard, TopMenu} from "../../components";
import { useFocusEffect } from '@react-navigation/native';


const Notification = ({navigation}) => {
	const [refreshing, setRefreshing] = useState(false)
	const [noticeData, setNoticeData] = useState([])

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
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
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
	// 		noticeId: 223123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 323123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 423123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 523123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 623123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 723123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 823123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 923123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 143123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
    //     {
	// 		noticeId: 163123127,
	// 		title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉",
	// 		contents: "업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용업데이트 상세 내용",
	// 		updatedAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// ]
	useFocusEffect(
		React.useCallback(() => {
			fetchData(); // 화면이 focus되면 fetchData 함수 호출
		}, [])
	);
			
	const fetchData = async () => {
		try {
			const response = await axios.get(`${process.env.API_URL}/notice`, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				withCredentials: true,
			});

			// 가져온 데이터를 state에 저장
			setNoticeData(response.data);
		} catch (error) {
			console.error("데이터 가져오기 실패:", error);
		}
	};

	return (
		<SafeAreaView style={styles.mainScreen}>
			<View style={styles.mainBackground}>
				<Header title="공지사항" onPressBack={() => navigation.pop()}/>
				<View style={styles.mainBody}>
					<FlatList
						contentContainerStyle={[styles.bigCardScroll, styles.paddingHorizontal0]}
						showsHorizontalScrollIndicator={false}
						data={noticeData}
						renderItem={({item}) => 
							<NoticeCard
								noticeId={item.noticeId}
								title={item.title}
								updatedAt={item.updatedAt}
								contents={item.contents}
						/>}
						keyExtractor={item => item.noticeId}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
};



export default Notification;
