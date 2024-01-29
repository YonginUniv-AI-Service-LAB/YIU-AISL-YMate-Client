import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, FlatList, RefreshControl, Alert } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {styles} from "../Style"
import { Header } from "../../components";

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
          서비스 개발 중입니다.
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
		  <Header title="알림 목록" onPressBack={() => navigation.pop()}/>
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
      </View>
    </SafeAreaView>
  );
};


export default Alarm;
