import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import {styles} from "../Style"
import moment from 'moment-timezone';


const DeliveryDetail = ({navigation, route}) => {
	const { condition } = route.params || {};
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

	  const handleButtonPress = () => {
		if (condition === 1) {
		  // condition이 1일 때 수정하기 버튼을 눌렀을 때 수행할 동작
		  Alert.alert("수정하기");
		  
		} else if (condition === 2) {
		  // condition이 2일 때 신청하기 버튼을 눌렀을 때 수행할 동작
		  navigation.navigate('TaxiRequest');
		}
	  };

      const TaxiData = [
		{
			tId: 123123123,
            nickname: "두글자",
            studentId: 201933008,
			title: "같이 먹어용",
			due: new Date('2023-11-28T21:55:00'),
			contents: "오늘 저녁 같이 학교에서 시켜드실 분 제가 아주아주아주 많이 먹어서 많이 시켜서 나눠드실 분이면 더욱더욱 좋습니다!!",
			food: 332211,
			location: 332211,
			createAt: new Date('2023-11-28T07:45:00'),
            type: 1,
		},
	]

    const CommentData = [
		{
			nickname: 123123123,
			title: "이이이잉잉이잉이이이이이잉",
			count:2,
			details: "안녕하세요 반갑습니다",
			state: 1,
		},
		{
			nickname: 123123123,
			title: "이이이잉잉이잉이이이이이잉",
			count:1,
			details: "안녕하세요 반갑습니다",
			state: 0,
		},
		{
			nickname: 123123123,
			title: "이이이잉잉이잉이이이이이잉",
			count:1,
			details: "안녕하세요 반갑습니다",
			state: 2,
		},
	]


	const TaxiDetailCard = ({title, nickname, createAt, due, contents}) => {
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
		

        return(
			<View style={[styles.myPostContainer,styles.margintop6, styles.boxShadow]}>
				
                <View style={[styles.deliveryDetailheader, styles.margintop6]}>
						<View style={styles.rowView}>
							<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
							<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
						</View>
						{condition === 1 && ( // condition이 1일 때만 마감하기 버튼 렌더링
							<Pressable style={styles.redContainer} onPress={() => Alert.alert("마감하기")}>
								<Text style={styles.redText}>마감하기</Text>
							</Pressable>
						)}
				</View>
				<View style={[styles.bigCard, styles.padding10]}>
				<View style={styles.tempViewToImage} />
				<View style={styles.flexView}>
					<View style={styles.smallCardContent}>
                    <View style={styles.rowView}>
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
					<View style={styles.cardStatusContainer}>
						<View style={[styles.infoContainer, styles.rowView, styles.spacebetween]}>
							<Text style={styles.text12}>작성자 : {nickname}</Text>
							<Text style={styles.text12}>2/4</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.text10}>작성 : {moment(createAt).format('YYYY년 MM월 DD일 HH:mm')}</Text>
							<Text style={styles.text10}>마감 : {moment(due).format('YYYY년 MM월 DD일 HH:mm')}</Text>
						</View>
						<Pressable style={[styles.modifybuttonContainer,styles.marginRight12]} onPress={handleButtonPress}>
							<Text style={styles.buttonText}>{condition === 1 ? "수정하기" : "신청하기"}</Text>
						</Pressable>
					</View>
				</View>
				</View>
				<View style={styles.deliveryDetailContainer}>
					<View style={styles.deliverytitleContainer}>
						<Text style={styles.deliveryTitleText} numberOfLines={1}>{title}</Text>
					</View>
					<ScrollView style={styles.flexView}>
						<View style={[styles.deliveryContentsContainer, styles.margintop6]}> 
							<Text style={styles.deliveryContentsText}>{contents}</Text>
						</View>
					</ScrollView>
				</View>
			</View>
		);
    }

    const commentCard = CommentData.map((comment) => 
	<View>
    <View style={[styles.commentContainer, { borderColor: comment.state === 0 ? Color.colorGray_100 : '#22A2F2'}]}>
        <View style={[styles.commentheader, styles.spacebetween, styles.rowView, styles.margintop3]}>
			<Text style={styles.text16}>{comment.nickname}</Text>
			<View style={styles.rowView}>
				<Text style={styles.text16}>인원 : {comment.count} </Text>
				{condition === 1  && comment.state === 1 && (
				<>
					<Pressable style={[styles.bluebuttonContainer]} onPress={() => Alert.alert("수락")}>
					<Text style={styles.buttonText}>수락</Text>
					</Pressable>
					<Pressable style={[styles.redbuttonContainer, styles.marginLeft3]} onPress={() => Alert.alert("거절")}>
					<Text style={[styles.redText,styles.text13]}>거절</Text>
					</Pressable>
				</>
				)}
				{comment.state === 2 && (
				<View style={[styles.realbluebuttonContainer, styles.shadow]}>
					<Text style={styles.realblueText}>수락됨</Text>
				</View>
				)}
				{comment.state === 0 && (
				<View style={[styles.redbuttonContainer,styles.shadow]}>
					<Text style={[styles.redText,styles.text13]}>거절됨</Text>
				</View>
				)}
			</View>
		</View>
		<View style={styles.commentheader}>
			<Text style={styles.text12}>{comment.title}</Text>
		</View>
	</View>
		{condition === 1 && comment.state === 2 && (
				<View style = {styles.commentDetails}>
					<Text style = {styles.text12}>{comment.details}</Text>
				</View>
		)}
	</View>
    )

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
                    <View style={styles.uppermenu}>
						<Pressable onPress={() => navigation.pop()}>
							<Image
								source={require('./../../assets/images/left.png')}
								style={[styles.icon20]} resizeMode="cover"
							/>
						</Pressable>
					<View style={styles.headerTitle}>
                    	<Text style={[styles.headerText]}>모집 글 상세</Text>
					</View>
                        <Pressable onPress={()=>Alert.alert("신고하기 버튼")}>
							<Image
								source={require('./../../assets/images/reportbutton.png')} 
								style={[styles.icon20]} resizeMode="cover"
							/>
						</Pressable>
                    </View>
                    	<TaxiDetailCard title={TaxiData[0].title} nickname={TaxiData[0].nickname} createAt={TaxiData[0].createAt} due={TaxiData[0].due} contents={TaxiData[0].contents}/>
					<View style={styles.mainBody}>                        
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}>
								<View style={styles.recruiterSectionList}>
									{commentCard}
								</View> 
						</ScrollView>
					</View>
      			</View>
    		</SafeAreaView>
		</>);
};



export default DeliveryDetail;
