
import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import {TopMenu, WriteButton, MyPostCard} from '../../components'
import axios from 'axios';
import { getUserInfo, getAccessTokenInfo } from '../../components/utils'
import { useFocusEffect } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';

const MyPost = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)
	const [myPostData, setMyPostData] = useState([]);
	const options = ['전체 글', '활성화 글', '마감된 글'];
 	const [selectedOption, setSelectedOption] = useState(options[0]);  // 초기값 설정
	 const [filteredData, setFilteredData] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
		  fetchData(); // 화면이 focus되면 fetchData 함수 호출
		  console.log(filteredData);
		}, [])
	  );

	  useEffect(() => {
		switch (selectedOption) {
		  case '활성화 글':
			setFilteredData(myPostData.filter(item => {
			  if (item.did) return item.state === 'ACTIVE';
			  if (item.dcId) return item.delivery.state === 'ACTIVE';
			  if (item.tid) return item.state === 'ACTIVE';
			  if (item.tcId) return item.taxi.state === 'ACTIVE';
			  return false; // 예외 처리
			}));
			break;
		  case '마감된 글':
			setFilteredData(myPostData.filter(item => {
			  if (item.did) return item.state === 'FINISHED';
			  if (item.dcId) return item.delivery.state === 'FINISHED';
			  if (item.tid) return item.state === 'FINISHED';
			  if (item.tcId) return item.taxi.state === 'FINISHED';
			  return false; // 예외 처리
			}));
			break;
		  default: // '전체 글'
			setFilteredData(myPostData);
			break;
		}
	  }, [selectedOption]);
	
	  const fetchData = async () => {
		try {
		  const accessTokenInfo = await getAccessTokenInfo();
		  const response = await axios.get(`${API_URL}/user/post`, {
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded",
			  "Authorization": `Bearer ${accessTokenInfo}`,
			},
			withCredentials: true,
		  });
	  
		  const data = response.data;
		  setMyPostData(data);
	  
		  switch (selectedOption) {
			case '활성화 글':
			  setFilteredData(data.filter(item => {
				if (item.did) return item.state === 'ACTIVE';
				if (item.dcId) return item.delivery?.state === 'ACTIVE';
				if (item.tid) return item.state === 'ACTIVE';
				if (item.tcId) return item.taxi?.state === 'ACTIVE';
				return false; // 예외 처리
			  }));
			  break;
			case '마감된 글':
			  setFilteredData(data.filter(item => {
				if (item.did) return item.state === 'FINISHED';
				if (item.dcId) return item.delivery?.state === 'FINISHED';
				if (item.tid) return item.state === 'FINISHED';
				if (item.tcId) return item.taxi?.state === 'FINISHED';
				return false; // 예외 처리
			  }));
			  break;
			default: // '전체 글'
			  setFilteredData(data);
			  break;
		  }
		} catch (error) {
		  console.error("데이터 가져오기 실패:", error);
		}
	  };
	  
	// const MyPostData = [
	// 	{
	// 		type: 0,
	// 		isComment: 0,
	// 		dId: 123123123,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 332211,
	// 		location: 10000001,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 1,
	// 		dId: 123123124,
	// 		title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 3321,
	// 		location: 10000009,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 0,
	// 		dId: 123123125,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 341211,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 1,
	// 		dId: 123123126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 33123412211,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 1,
	// 		dId: 12312312711,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 31234211,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 0,
	// 		dId: 12312124124126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 331235678211,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 1,
	// 		dId: 1212455233126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 3367895678211,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 0,
	// 		dId: 12543586226,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 33123123111,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 0,
	// 		isComment: 1,
	// 		dId: 1123458673126,
	// 		title: "장충동 왕족발보쌈",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		food: 3376831,
	// 		location: 10000002,
	// 		createAt: new Date('2023-12-04T17:55:00'),
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 0,
	// 		tId: 123123616123,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000001,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 1,
	// 		tId: 1231232431124,
	// 		title: "집 가고싶다집 가고싶다집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000002,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 0,
	// 		tId: 12312253125,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T17:55:00'),
	// 		startCode: 10000003,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 1,
	// 		tId: 12312613126,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-05T11:55:00'),
	// 		startCode: 10000004,
	// 		endCode: 10000003,
	// 		current: 3,
	// 		max: 4,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 0,
	// 		tId: 123123123213127,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 1,
	// 		tId: 123123123213218,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 0,
	// 		tId: 123123321321129,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 0,
	// 		tId: 123123312312130,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	},
	// 	{
	// 		type: 1,
	// 		isComment: 1,
	// 		tId: 123213123131,
	// 		title: "집 가고싶다",
	// 		due: new Date('2023-12-04T15:55:00'),
	// 		startCode: 10000005,
	// 		endCode: 10000003,
	// 		current: 2,
	// 		max: 7,
	// 		createAt: 3322111,
	// 	}
	// ]

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		setRefreshing(false)
	})

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<TopMenu />
					<View style={styles.mainBody}>
						<View name="mypostSection" style={styles.mainSection}>
							<View style={styles.mainSectionTitle}>
								<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/list.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>내가 쓴 글</Text>
								</View>
								
								<ModalDropdown 
									options={options} 
									defaultValue={selectedOption}
									onSelect={(index, value) => setSelectedOption(value)}>
									<View style={styles.rowView}>
									<Text style={[styles.clickText13,styles.marginRight6]}>{selectedOption}</Text>
									<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
									</View>
								</ModalDropdown>
								
							</View>
							<FlatList
								contentContainerStyle={styles.mypostCardScroll}
								showsHorizontalScrollIndicator={false}
								data={filteredData}
								renderItem={({ item }) => (
									<MyPostCard
										type={
											item.did ? 1 :
											item.dcId ? 2 :
											item.tid ? 3 :
											item.tcId ? 4 :
											-1 // 예외 처리
										}
										Id={item.did ? item.did :
											item.dcId ? item.delivery.did :
											item.tid ? item.tid :
											item.tcId ? item.taxi.tid :
											undefined 
										}
										title={
											item.did ? item.title :
											item.dcId ? item.delivery.title :
											item.tid ? item.title :
											item.tcId ? item.taxi.title :
											undefined // 예외 처리
										}
										due={
											item.did ? item.due :
											item.dcId ? item.delivery.due :
											item.tid ? item.due :
											item.tcId ? item.taxi.due :
											undefined
										}
										startCode={
											item.did ? undefined :
											item.dcId ? undefined :
											item.tid ? item.startCode :
											item.tcId ? item.taxi.startCode :
											undefined 
										}
										endCode={item.did ? undefined :
											item.dcId ? undefined :
											item.tid ? item.endCode :
											item.tcId ? item.taxi.endCode :
											undefined 
										}
										current={item.did ? undefined :
											item.dcId ? undefined :
											item.tid ? item.current :
											item.tcId ? item.taxi.current :
											undefined 
										}
										max={item.did ? undefined :
											item.dcId ? undefined :
											item.tid ? item.max :
											item.tcId ? item.taxi.max :
											undefined 
										}
										food={item.did ? item.food :
											item.dcId ? item.delivery.food :
											item.tid ? undefined :
											item.tcId ? undefined :
											undefined
										}
										locationCode={
											item.did ? item.locationCode :
											item.dcId ? item.delivery.locationCode :
											item.tid ? undefined :
											item.tcId ? undefined :
											undefined
										}
										createdAt={
											item.did ? item.createdAt :
											item.dcId ? item.createdAt :
											item.tid ? item.createdAt :
											item.tcId ? item.createdAt :
											undefined
										}
									/>
								)}
								keyExtractor={
									undefined 
								}
								refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							/>
						</View>
					</View>
      			</View>
    		</SafeAreaView>
			<WriteButton expandable={true}/>
		</>);
};



export default MyPost;
