import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import {styles} from "../Style"
import moment from 'moment-timezone';
import {Header} from "../../components"


const DeliveryDetail = ({navigation, route}) => {

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

	  const { deliveryDetailData } = route.params;

	  const { deliveryData, type } = deliveryDetailData;

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

	const handleButtonPress  = async () => { 
		if(type === 2){
			navigation.navigate('DeliveryRequest');
		}
	}


	const DeliveryDetailCard = ({title, location, food, nickname, createAt, due, contents}) => {
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
					{type === 1 && ( //type이 1일 때만 마감하기 버튼 렌더링 type 1은 자기글
					<View style={styles.rowView}>
							<Pressable style={[styles.redContainer,styles.marginRight6]} onPress={() => Alert.alert("마감하기")}>
								<Text style={styles.redText}>마감하기</Text>
							</Pressable>
							<Pressable style={styles.redContainer} onPress={() => Alert.alert("삭제하기")}>
								<Text style={styles.redText}>삭제하기</Text>
							</Pressable>
					</View>
						)}
				</View>
				<View style={[styles.bigCard, styles.padding10]}>
				<View style={styles.tempViewToImage} />
				<View style={styles.flexView}>
					<View style={styles.smallCardContent}>
						<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
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
							<Text style={styles.buttonText}>{type === 1 ? "수정하기" : "신청하기"}</Text>
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

	// 후후 ~@~
    const commentCard = CommentData.map((comment) => 
	<View>
    <View style={[styles.commentContainer, { borderColor: comment.state === 0 ? Color.colorGray_100 : '#22A2F2'}]}>
        <View style={[styles.commentheader, styles.spacebetween, styles.rowView, styles.margintop3]}>
			<Text style={styles.text16}>{comment.nickname}</Text>
			<View style={styles.rowView}>
				<Text style={styles.text16}>인원 : {comment.count} </Text>
				{comment.state === 1 && (
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
		{comment.state === 2 && (
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
					<Header title="모집 글 상세" isReport={true} onPressBack={() => navigation.pop()} onPressReport={() => Alert.alert("신고하기긱")}/>
                    	<DeliveryDetailCard title={deliveryData.title} nickname={type} food={deliveryData.food} location={deliveryData.location} createAt={deliveryData.createdAt} due={deliveryData.due} contents={deliveryData.contents}/>
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
