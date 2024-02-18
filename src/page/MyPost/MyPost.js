
import React, { useState, useEffect, useCallback,useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import {TopMenu, WriteButton, MyPostCard} from '../../components'
import axios from 'axios';
import { getUserInfo, getAccessTokenInfo , callApi} from '../../components/utils'
import { useFocusEffect } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import {AuthContext} from '../../../App';
import moment from "moment-timezone";

const MyPost = ({navigation}) => {
	const { logout } = useContext(AuthContext);
	const [refreshing, setRefreshing] = React.useState(false)
	const [myPostData, setMyPostData] = useState([]);
	const options = ['전체 글', '활성화 글', '마감된 글'];
 	const [selectedOption, setSelectedOption] = useState(options[0]);  // 초기값 설정
	 const [filteredData, setFilteredData] = useState([]);

	 const isPastDue = (due) => {
		let now = moment.tz('Asia/Seoul');
		let dueDate = moment(due);
		let minutesDiff = moment.utc(dueDate).diff(moment.utc(now), 'minutes');
		return minutesDiff < 0;
	  };

	useFocusEffect(
		React.useCallback(() => {
		  fetchData(); // 화면이 focus되면 fetchData 함수 호출
		  setSelectedOption(options[0]);
		}, [])
	  );

	  useEffect(() => {
		switch (selectedOption) {
		  case '활성화 글':
			setFilteredData(myPostData.filter(item => {
			  if (item.did) return item.state === 'ACTIVE' && !isPastDue(item.due);
			  if (item.dcId) return item.delivery.state === 'ACTIVE'&& !isPastDue(item.delivery.due);
			  if (item.tid) return item.state === 'ACTIVE' && !isPastDue(item.due);
			  if (item.tcId) return item.taxi.state === 'ACTIVE'&& !isPastDue(item.taxi.due);
			  return false; // 예외 처리
			}));
			break;
		  case '마감된 글':
			setFilteredData(myPostData.filter(item => {
			  if (item.did) return item.state === 'FINISHED' && isPastDue(item.due);
			  if (item.dcId) return item.delivery.state === 'FINISHED' && isPastDue(item.delivery.due);
			  if (item.tid) return item.state === 'FINISHED' && isPastDue(item.due);
			  if (item.tcId) return item.taxi.state === 'FINISHED' && isPastDue(item.taxi.due);
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
		  const response = await callApi(`${API_URL}/user/post`, 'get');
		  const data = response.data;
		  setMyPostData(data);		  
		  setFilteredData(data);
		} catch (error) {
		  if (error.message === 'Session expired. Please login again.') {
			Alert.alert('세션에 만료되었습니다.')
			logout();
		  } else {
			console.error("데이터 가져오기 실패:", error);
		  }
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
										state = {
											item.did ? item.state :
											item.dcId ? item.delivery.state :
											item.tid ? item.state :
											item.tcId ? item.taxi.state :
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
