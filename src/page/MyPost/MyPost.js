import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import moment from 'moment-timezone';


const MyPost = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

	
	const MyPostData = [
		{
			tId: 123123123,
			title: "집 가고싶다",
			due: new Date('2023-11-28T17:55:00'),
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-28T07:45:00'),
            type: 1,
		},
        {
			tId: 1231231224,
			title: "집 가고싶다",
			due: new Date('2023-11-25T22:45:00'),
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-25T07:35:00'),
            type: 2,
		},
        {
			tId: 1231231225,
			title: "집 가고싶다",
			due: new Date('2023-11-25T22:45:00'),
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-25T07:35:00'),
            type: 2,
		},
        {
			tId: 1231231226,
			title: "집 가고싶다",
			due: new Date('2023-11-25T22:45:00'),
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-25T07:35:00'),
            type: 2,
		},
        {
			tId: 1231231227,
			title: "집 가고싶다",
			due: new Date('2023-11-25T22:45:00'),
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-25T07:35:00'),
            type: 2,
		},
	]


	const MyPostCard = ({title, tId, createAt, due, type}) => {
        const [now, setNow] = React.useState(moment().tz('Asia/Seoul'));
		const [writeType, setWriteType] = React.useState('');
        React.useEffect(() => {
			const interval = setInterval(() => {
					setNow(moment().tz('Asia/Seoul'));
				}, 60000); // 1분마다 갱신 (설정에 따라 조절 가능)
			
				return () => clearInterval(interval);
			}, []);

        let dueDate = moment(due);
        let isPastDue = now.isAfter(dueDate);
        let minutesDiff = Math.abs(moment.utc(dueDate).diff(moment.utc(now), 'minutes'))-540; 
        let dueStatusText;
        if (isPastDue) {
            dueStatusText = "마감";
        } else {
            if (minutesDiff < 60) {
                dueStatusText = `${minutesDiff}분 후 마감`;
            } else {
                let hoursDiff = Math.floor(minutesDiff / 60);
                let remainingMinutes = minutesDiff % 60;
                dueStatusText = `${hoursDiff}시간 ${remainingMinutes}분 후 마감`;
            }
        }
        const dueStatusStyle = isPastDue ? { color: 'red' } : {};
		React.useEffect(() => {
			let mounted = true;
		
			if (mounted) {
			  let newWriteType;
		
			  if (type === 1) {
				newWriteType = '모집';
			  } else if (type === 2) {
				newWriteType = '신청';
			  }
			  setWriteType(newWriteType);
			}
			return () => (mounted = false);
		  }, [type]);

        return(
			<Pressable style={styles.myPostContainer} onPress={()=>Alert.alert(`${tId}`)}>
				<View style={styles.postType}>
					<View>
						<Text style={styles.timeText}>{moment(createAt).format('YYYY년 MM월 DD일 HH:mm')}</Text>
					</View>
					<View style= {type === 1 ? styles.writeTypeRecruitContainer : styles.writeTypeApplyContainer}>
						<Text style={type === 1 ? styles.writeTypeRecruit : styles.writeTypeApply}>{writeType}</Text>
					</View>
				</View>
				<Pressable style={styles.myPostCard}>
						{/* change view to image */}
					<View style={styles.tempViewToImage} />
					<View style={styles.flexView}>
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
							<Text style={[styles.centerText10, dueStatusStyle]}>{dueStatusText}</Text>
						</View>
						<View style={styles.bigCardContent}>
							<Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
							<Text style={[styles.centerText10, styles.bigTaxiCardNumber]}>3/4</Text>
						</View>
					</View>
				</Pressable>
			</Pressable>
		);
}

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
						<View name="mypostSection" style={styles.mainSection}>
							<View style={styles.mainSectionTitle}>
								<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/list.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>내가 쓴 글</Text>
								</View>
								<Pressable style={styles.rowView} onPress={()=>Alert.alert("마감순")}>
									<Text style={styles.clickText13}>마감 가까운 순</Text>
									<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
								</Pressable>
							</View>
							<FlatList
								contentContainerStyle={styles.mypostCardScroll}
								showsHorizontalScrollIndicator={false}
								data={MyPostData}
								renderItem={({ item }) => <MyPostCard title={item.title} tId={item.tId} createAt={item.createAt} due={item.due} type={item.type}/>}
								keyExtractor={item => item.tId}
								refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => Alert.alert("새로고침")} />}
							/>
						</View>
					</View>
					<View style={styles.navigationBar}>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Delivery')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/restaurant_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>배달</Text>
						</Pressable>
						<Pressable style={[styles.opacity70,styles.navigationButton]} onPress={()=>navigation.navigate('Taxi')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/taxi_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>택시</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Main')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/home_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>홈</Text>
						</Pressable>
						<Pressable style={[styles.navigationButton]} onPress={()=>Alert.alert("내가쓴글버튼")}>
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



export default MyPost;
