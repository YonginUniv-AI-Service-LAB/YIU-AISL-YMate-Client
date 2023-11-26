import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"


const Delivery = ({navigation}) => {
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
			title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
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
		},
		{
			dId: 123123128,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123129,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123130,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		}
	]

	const BigDeliveryCard = ({title, dId}) => (
		<Pressable style={styles.bigCard} onPress={()=>Alert.alert(`${dId}`)}>
				{/* change view to image */}
				<View style={styles.tempViewToImage} />
				<View style={styles.flexView}>
					<View style={styles.smallCardContent}>
						<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
						</View>
						<Text style={styles.centerText10}>3분 후 마감</Text>
					</View>
					<View style={styles.bigCardContent}>
						<Text style={styles.cardTitle} numberOfLines={3}>{title}</Text>
					</View>
				</View>
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
						<Pressable name="alramButton" onPress={()=>Alert.alert("알림버튼")}>
							<Image style={styles.icon26} resizeMode="cover" source={require("../../assets/images/notification.png")}/>
							<Image style={styles.activeAlramIcon} resizeMode="cover" source={require("../../assets/images/dot_red.png")}/>
						</Pressable>
					</View>
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
									data={DeliveryData}
									renderItem={({item}) => <BigDeliveryCard title={item.title} dId={item.dId}/>}
									keyExtractor={item => item.dId}
									refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
								/>
						</View>
					</View>
					<View style={styles.navigationBar}>
						<Pressable style={[styles.navigationButton]} onPress={()=>Alert.alert("배달버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/restaurant_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>배달</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Taxi')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/taxi_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>택시</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Main')}>
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



export default Delivery;
