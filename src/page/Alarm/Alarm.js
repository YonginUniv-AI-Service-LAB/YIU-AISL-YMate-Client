import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, FlatList, RefreshControl, Alert } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {styles} from "../Style"

const Alarm = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

	const AlarmData = [
		{
			pushId: 123123123,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123124,
			contents: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123125,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123126,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123127,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123128,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123129,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		},
		{
			pushId: 123123130,
			contents: "장충동 왕족발보쌈",
			type: 11222333344,
			createAt: 3322111,
		}
	]

	const AlarmCard = ({pushId, contents, type, createAt}) => (
    <Pressable style={styles.alarmCard} onPress={() => Alert.alert(`${pushId}`)}>
      <View style={styles.alarmViewed} backgroundColor={'#22a2f2'}/>
      <Image style={[styles.icon21, styles.marginHorizontal6]} resizeMode="cover" source={require("../../assets/images/taxi.png")}/>
      {/* <Image style={[styles.icon21, styles.iconLayout]} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/> */}
      <View style={styles.alarmContentBox}>
        <Text style={[styles.text14, styles.alarmContent]} numberOfLines={1}>
          가치 택시 : 응답을 기다리는 신청이 4건 있습니다.
        </Text>
        <Text style={[styles.text10, styles.alarmCreateAt]}>
          2023-11-05 23:32
        </Text>
      </View>
    </Pressable>
	)

  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.mainBackground}>
          <View style={styles.uppermenu}>
            <Pressable style={styles.locationButton} onPress={() => navigation.pop()}>
                <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/left.png")}/>
            </Pressable>
            <Text style={[styles.text20]}>
                알림 목록
            </Text>
            <View style={[styles.icon20]} />
          </View>
          <View style={[styles.flexView, styles.backgroundWhite]}>
            <FlatList
              contentContainerStyle={styles.bigCardScroll}
              showsHorizontalScrollIndicator={false}
              data={AlarmData}
              renderItem={({item}) => <AlarmCard contents={item.contents} pushId={item.pushId}/>}
              keyExtractor={item => item.pushId}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}
            />
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
  );
};


export default Alarm;
