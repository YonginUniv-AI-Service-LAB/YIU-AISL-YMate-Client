import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { WriteButton, DeliveryCard, TopMenu } from "../../components";


const Delivery = ({navigation}) => {
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
		},
		{
			dId: 12312124124126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 331235678211,
			location: 10000002,
			createAt: 3322111,
		},
		{
			dId: 1212455233126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3367895678211,
			location: 10000002,
			createAt: 3322111,
		},
		{
			dId: 12543586226,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 33123123111,
			location: 10000002,
			createAt: 3322111,
		},
		{
			dId: 1123458673126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3376831,
			location: 10000002,
			createAt: 3322111,
		},
	]

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
									data={DeliveryData}
									renderItem={({item}) => <DeliveryCard size={1} dId={item.dId} title={item.title} due={item.due} food={item.food} location={item.location}/>}
									keyExtractor={item => item.dId}
									refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
								/>
						</View>
					</View>
					<View style={styles.navigationBar}>
						<Pressable style={[styles.navigationButton]} onPress={()=>navigation.navigate('DeliveryRequest')}>
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
			<WriteButton onPress={() => navigation.navigate('DeliveryRecruit')}/>
		</>);
};



export default Delivery;
