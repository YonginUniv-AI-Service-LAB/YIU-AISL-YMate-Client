import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"


const Notification = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)
    const [expanded, setExpanded] = React.useState([]);
    const toggleExpand = (noticeId) => {
        setExpanded((prevExpanded) => {
          if (prevExpanded.includes(noticeId)) {
            // 이미 열려있는 경우 닫기
            return prevExpanded.filter((id) => id !== noticeId);
          } else {
            // 닫혀있는 경우 열기
            return [...prevExpanded, noticeId];
          }
        });
      };

	const NoticeData = [
		{
			noticeId: 123123123,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
		},
		{
			noticeId: 123123124,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
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
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		}
	]


	const noticeCard = NoticeData.map((notice) => 
		<Pressable
        key={notice.noticeId}
        style={styles.smallNoticeCard}
        onPress={() => toggleExpand(notice.noticeId)}
      >
        <Text style={styles.noticeTitle} numberOfLines={expanded.includes(notice.noticeId) ? 0 : 1}>
          {notice.title}
        </Text>
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
						<Pressable name="alramButton" onPress={()=>Alert.alert("알림버튼")}>
							<Image style={styles.icon26} resizeMode="cover" source={require("../../assets/images/notification.png")}/>
							<Image style={styles.activeAlramIcon} resizeMode="cover" source={require("../../assets/images/dot_red.png")}/>
						</Pressable>
					</View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerText}>공지 사항</Text>
                    </View>
					<View style={styles.mainBody}>
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}>
							<View style={styles.mainSection}>
								<View style={styles.notificationSectionList}>
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
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("내가쓴글버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/list_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>내가 쓴 글</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("내정보버튼")}>
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



export default Notification;
