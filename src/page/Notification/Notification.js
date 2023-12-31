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
			noticeId: 223123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 323123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 423123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 523123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 623123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 723123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 823123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 923123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉dddddddddddddddddddddddddd"
		},
        {
			noticeId: 143123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
        {
			noticeId: 163123127,
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
                    <View style={styles.notificationHeader}>
						<Pressable onPress={() => navigation.goBack()}>
							<Image
								source={require('./../../assets/images/left.png')} // 이미지 경로를 실제 이미지 경로로 변경
								style={[styles.icon26]} resizeMode="cover"
							/>
						</Pressable>
						<View style={styles.headerTitle}>
							<Text style={[styles.headerText]}>공지 사항</Text>
						</View>
						<View style={styles.icon26}></View>
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
      			</View>
    		</SafeAreaView>
		</>);
};



export default Notification;
