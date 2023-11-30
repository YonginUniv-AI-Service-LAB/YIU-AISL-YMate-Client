import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"


const Main = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

	const DeliveryData = [
		{
			dId: 123123123,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123124,
			title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123125,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123126,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123127,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		}
	]

	const TaxiData = [
		{
			tId: 123123123,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123124,
			title: "집 가고싶다집 가고싶다집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123125,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123126,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123127,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
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

	const SmallDeliveryCard = ({title, dId}) => (
		<Pressable style={styles.smallCard} onPress={()=>navigation.navigate('DelivertDetail')}>
				{/* change view to image */}
				<View style={styles.tempViewToImage} />
				<View style={styles.smallCardContent}>
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
					<Text style={styles.centerText10}>3분 후 마감</Text>
				</View>
				<View style={styles.smallCardContent}>
					<Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
				</View>
		</Pressable>
	)

	const SmallTaxiCard = ({title, tId}) => ( 
		<Pressable style={styles.smallCard} onPress={()=>Alert.alert(`${tId}`)}>
			{/* change view to image */}
			<View style={styles.tempViewToImage} />
			<View style={styles.smallCardContent}>
				<View name="taxi location" flexDirection="row">
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
					<Image style={styles.icon17} resizeMode="cover" source={require("../../assets/images/arrowRight.png")}/>
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
				</View>
				<Text style={styles.centerText10}>3분 후 마감</Text>
			</View>
			<View style={styles.smallCardContent}>
				<Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
				<Text style={styles.centerText10}>3/4</Text>
			</View>
		</Pressable>
	)

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
					<View style={styles.uppermenu}>
						<Pressable style={styles.locationButton} onPress={()=>Alert.alert("위치재설정버튼")}>
							<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/location.png")}/>
							<Text style={styles.locationText}>AI융합대학</Text>
							<Image style={[styles.icon16, styles.marginLeft3]} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
						</Pressable>
						<Pressable name="alramButton" onPress={()=>navigation.navigate("Alarm")}>
							<Image style={styles.icon26} resizeMode="cover" source={require("../../assets/images/notification.png")}/>
							<Image style={styles.activeAlramIcon} resizeMode="cover" source={require("../../assets/images/dot_red.png")}/>
						</Pressable>
					</View>
					<View style={styles.mainBody}>
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}>
							<Image style={styles.advertiseImage} resizeMode="cover" source={require("../../assets/images/advertise.png")}/>
							<View name="deliverySection" style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
									</View>
									<Pressable style={styles.rowView} onPress={()=>navigation.navigate('Delivery')}>
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
										renderItem={({item}) => <SmallDeliveryCard title={item.title} dId={item.dId}/>}
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
									<Pressable style={styles.rowView} onPress={()=>navigation.navigate('Taxi')}>
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
										renderItem={({item}) => <SmallTaxiCard title={item.title} tId={item.tId}/>}
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
					<View style={styles.navigationBar}>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Delivery')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/restaurant_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>배달</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Taxi')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/taxi_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>택시</Text>
						</Pressable>
						<Pressable style={[styles.navigationButton]} onPress={()=>Alert.alert("홈버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/home_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>홈</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('MyPost')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/list_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>내가 쓴 글</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('MyPage')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/user_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>내 정보</Text>
						</Pressable>
					</View>
      			</View>
    		</SafeAreaView>
			<Pressable style={styles.writeButton} onPress={()=> Alert.alert("글작성버튼")}>
				<Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../../assets/images/writeButton_blue.png")}/>
			</Pressable>
		</>);
};



export default Main;
