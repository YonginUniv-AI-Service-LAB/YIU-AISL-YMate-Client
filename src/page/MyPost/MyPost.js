
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
										food={item.did ? item.foodCode :
											item.dcId ? item.delivery.foodCode :
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
