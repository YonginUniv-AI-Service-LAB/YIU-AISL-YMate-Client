import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import {TopMenu, WriteButton, DeliveryCard, TaxiCard} from "../../components"


const Main = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

	const DeliveryData = [
		{
			dId: 123123123,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 332211,
			location: 10000001,
			createAt: 3322111,
		},
		{
			dId: 123123124,
			title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3321,
			location: 10000009,
			createAt: 3322111,
		},
		{
			dId: 123123125,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 341211,
			location: 10000002,
			createAt: 3322111,
		},
		{
			dId: 123123126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 33123412211,
			location: 10000002,
			createAt: 3322111,
		},
		{
			dId: 123123127,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 31234211,
			location: 10000002,
			createAt: 3322111,
		}
	]

	const TaxiData = [
		{
			tId: 123123123,
			title: "집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000001,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			tId: 123123124,
			title: "집 가고싶다집 가고싶다집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000002,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			tId: 123123125,
			title: "집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000003,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			tId: 123123126,
			title: "집 가고싶다",
			due: new Date('2023-12-05T11:55:00'),
			startCode: 10000004,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			tId: 123123127,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		}
	]

	const NoticeData = [
		{
			noticeId: 123123123,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123124,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123125,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123126,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		}
	]
	const noticeCard = NoticeData.map((notice) => 
		<Pressable key={notice.noticeId} style={styles.smallNoticeCard} onPress={()=>Alert.alert(`${notice.noticeId}`)}>
				<Text style={styles.noticeTitle} numberOfLines={1}>{notice.title}</Text>
				<Text style={styles.centerText10}>10.30</Text>
		</Pressable>
	)

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<TopMenu/>
					<View style={styles.mainBody}>
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}>
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
										data={DeliveryData}
										renderItem={({item}) => <DeliveryCard dId={item.dId} title={item.title} due={item.due} food={item.food} location={item.location}/>}
										keyExtractor={item => item.dId}
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
										data={TaxiData}
										renderItem={({item}) => <TaxiCard tId={item.tId} title={item.title} due={item.due} startCode={item.startCode} endCode={item.endCode} current={item.current} max={item.max}/>}
										keyExtractor={item => item.tId}
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
								<View style={styles.mainSectionList}>
									{noticeCard}
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
