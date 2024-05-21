import React, { useState, useEffect,useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import {styles} from "../Style"
import { getUserInfo, getAccessTokenInfo,callApi } from '../../components/utils'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import LocationTag from '../../components/LocationTag'
import moment from 'moment-timezone';
import {Header, LocationImage} from "../../components"
import {AuthContext} from '../../../App';


const TaxiDetail = ({navigation, route}) => {
	const { logout } = useContext(AuthContext);
	const { tId } = route.params;
	const [refreshing, setRefreshing] = React.useState(false)
	const [CommentData, setCommentData] = useState([]);
	const [taxiData, setTaxiData] = useState(null);
	const [type, setType] = useState('');
	const [isPastDue, setIsPastDue] = useState('');
	const [userInfo, setUserInfo] = useState('');
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
	useFocusEffect(
		React.useCallback(() => {
		  // 화면이 포커스를 얻었을 때 데이터를 가져오도록 설정
		  fetchTaxiData();
		}, [refreshing])
	);

	const fetchTaxiData = async () => {
		const userInfo = await getUserInfo();
		const data = { tId : tId };
		try {
		  const response = await callApi(`${process.env.API_URL}/taxi/detail`, 'post', data);
		  if (response.status === 200) {
			setTaxiData(response.data);
			setType(userInfo === response.data.studentId ? 1 : 2);
			setCommentData(response.data.comment);
			setUserInfo(userInfo);
		  }
		} catch (error) {
			if (error === 'Session expired. Please login again.') {
				Alert.alert('세션이 만료되었습니다.')
				logout();
			  }
			  else{
		  		Alert.alert('삭제됐거나 존재하지 않는 글입니다.');
		  		navigation.goBack();
			  }
		}
	  };
	  
	  
	if (taxiData === null) {
        return (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="#0000ff" />
			</View>
		  );
      }

	const handleButtonPress  = async () => { 
		if(isPastDue || taxiData.state ==='FINISHED'){
			Alert.alert('이미 마감된 글입니다.');
		}
		else if(type === 1){
			navigation.navigate('TaxiRecruit', {
				tid: taxiData.tid,
				end: taxiData.end,
				endCode: taxiData.endCode,
				max: taxiData.max,
				start: taxiData.start,
				startCode: taxiData.startCode,
				title: taxiData.title,
				contents: taxiData.contents,
				current: taxiData.contents
			});
		}
		else{
			navigation.navigate('TaxiRequest', {tid: taxiData.tid, max: taxiData.max});
		}
	}

	const handleAcceptRequest = async (tcId) => {
		if(isPastDue || taxiData.state === 'FINISHED'){
		  Alert.alert('이미 마감된 글입니다.');
		} else {
		  try {
			const data = { tcId: tcId };
			const response = await callApi(`${process.env.API_URL}/taxi/accept`, 'post', data);
			setRefreshing(false);
			if (response.status === 200) {
			  Alert.alert("수락 완료");
			  fetchTaxiData();
			}
		  } catch (error) {
			if (error=== 'Session expired. Please login again.') {
				Alert.alert('세션이 만료되었습니다.')
				logout();
			}
			else if (error.response && error.response.status === 409) {
			  Alert.alert('이미 마감된 글입니다.');
			} else { 
			  Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  }
		}
	  };
	  

	  const handleRejectRequest = async (tcId) => {
		if(isPastDue || taxiData.state === 'FINISHED'){
		  Alert.alert('이미 마감된 글입니다.');
		} else {
		  try {
			const data = { tcId: tcId };
			const response = await callApi(`${process.env.API_URL}/taxi/reject`, 'post', data);
			setRefreshing(false);
			if (response.status === 200) {
			  Alert.alert("거절 완료");
			  fetchTaxiData();
			}
		  } catch (error) {
			if (error=== 'Session expired. Please login again.') {
				Alert.alert('세션이 만료되었습니다.')
				logout();
			  }
			else if (error.response && error.response.status === 409) {
			  Alert.alert('이미 마감된 글입니다.');
			} else { 
			  Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  }
		}
	  };
	  

	  const handleCancelRequest = async (tcId) => {
		try {
		  const data = { tcId: tcId };
		  const response = await callApi(`${process.env.API_URL}/taxi/cancel`, 'post', data);
		  setRefreshing(false);
		  if (response.status === 200) {
			Alert.alert("취소 완료");
			fetchTaxiData();
		  }
		} catch (error) {
			if (error === 'Session expired. Please login again.') {
				Alert.alert('세션이 만료되었습니다.')
				logout();
			}
			else{
		  		Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		}
	  };
	  

	  const handleFinishDetail = async() => {
		if(isPastDue || taxiData.state === 'FINISHED'){
		  Alert.alert('이미 마감된 글입니다.');
		} else {
		  try {
			const data = { tId: tId };
			const response = await callApi(`${process.env.API_URL}/taxi/finish`, 'post', data);
			setRefreshing(false);
			if (response.status === 200) {
			  Alert.alert("마감 완료");
			  navigation.goBack();
			}
		  } catch (error) {
			if (error === 'Session expired. Please login again.') {
				Alert.alert('세션이 만료되었습니다.')
				logout();
			} else if (error.response && error.response.status === 409) {
			  Alert.alert('이미 마감된 글입니다.');
			} else {
			  Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  }
		}
	  };
	  
	  const handleDeleteDetail = async() => {
		try {
		  const data = { tId: tId };
		  const response = await callApi(`${process.env.API_URL}/taxi/delete`, 'post', data);
		  setRefreshing(false);
		  if (response.status === 200) {
			Alert.alert("삭제 완료");
			navigation.goBack();
		  }
		} catch (error) {
		  if (error === 'Session expired. Please login again.') {
			Alert.alert('세션이 만료되었습니다.')
				logout();
		  } else if (error.response && error.response.status === 409) {
			Alert.alert('신청글이 존재합니다.');
		  } else {
			Alert.alert('삭제 되었거나 없는 신청글입니다.');
		  }
		}
	  };
	  

    //   const TaxiData = [
	// 	{
	// 		tId: 123123123,
    //         nickname: "두글자",
    //         studentId: 201933008,
	// 		title: "같이 먹어용",
	// 		due: new Date('2023-11-28T21:55:00'),
	// 		contents: "오늘 저녁 같이 학교에서 시켜드실 분 제가 아주아주아주 많이 먹어서 많이 시켜서 나눠드실 분이면 더욱더욱 좋습니다!!",
	// 		food: 332211,
	// 		location: 332211,
	// 		createAt: new Date('2023-11-28T07:45:00'),
    //         type: 1,
	// 	},
	// ]

    // const CommentData = [
	// 	{
	// 		nickname: 123123123,
	// 		title: "이이이잉잉이잉이이이이이잉",
	// 		count:2,
	// 		details: "안녕하세요 반갑습니다",
	// 		state: 1,
	// 	},
	// 	{
	// 		nickname: 123123123,
	// 		title: "이이이잉잉이잉이이이이이잉",
	// 		count:1,
	// 		details: "안녕하세요 반갑습니다",
	// 		state: 0,
	// 	},
	// 	{
	// 		nickname: 123123123,
	// 		title: "이이이잉잉이잉이이이이이잉",
	// 		count:1,
	// 		details: "안녕하세요 반갑습니다",
	// 		state: 2,
	// 	},
	// ]


	const TaxiDetailCard = ({title, state, nickname, createdAt, due, current, max, startCode, endCode, contents}) => {
        const [now, setNow] = React.useState(moment().tz('Asia/Seoul'));
        const [writeType, setWriteType] = React.useState('');
        React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment().tz('Asia/Seoul'));
        }, 60000); // 1분마다 갱신 (설정에 따라 조절 가능)
        
            return () => clearInterval(interval);
        }, []);

        let dueDate = moment.tz(due, 'Asia/Seoul');
        setIsPastDue(now.isAfter(dueDate));
        let minutesDiff =  dueDate.diff(now, 'minutes');
        let dueStatusText;
        if (isPastDue || state === 'FINISHED') {
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
        const dueStatusStyle = isPastDue || state === 'FINISHED' ? { color: 'red' } : {};
		

        return(
			<View style={[styles.myPostContainer,styles.margintop6, styles.boxShadow]}>
				
                <View style={[styles.deliveryDetailheader, styles.margintop6]}>
						<View style={styles.rowView}>
							<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/taxi.png")}/>
							<Text style={[styles.centerText18, styles.marginLeft3]}>같이 택시</Text>
						</View>
						<View>
						{type === 1 && ( //type이 1일 때만 마감하기 버튼 렌더링 type 1은 자기글
							<View style={styles.rowView}>
							<Pressable style={[styles.redContainer,styles.marginRight6]} onPress={() => {
									Alert.alert(
										"마감하기",
										"마감하시겠습니까?",
										[
										{
											text: "취소",
											style: "cancel",
										},
										{
											text: "확인",
											onPress: async () => handleFinishDetail(),
										},
										],
										{ cancelable: false }
									);
									}}
								>
								<Text style={styles.redText}>마감하기</Text>
								</Pressable>
								<Pressable style={styles.redContainer} onPress={() => {
									Alert.alert(
										"삭제하기",
										"삭제하시겠습니까?",
										[
										{
											text: "취소",
											style: "cancel",
										},
										{
											text: "확인",
											onPress: async () => handleDeleteDetail(),
										},
										],
										{ cancelable: false }
									);
									}}
								>
								<Text style={styles.redText}>삭제하기</Text>
							</Pressable>
							</View>
						)}
						</View>
				</View>
				<View style={[styles.bigCard, styles.padding10]}>
                <LocationImage location={startCode}/>
				<View style={styles.flexView}>
					<View style={styles.smallCardContent}>
        
                    <View name="taxi location" flexDirection="row">
                        <LocationTag location={startCode}/>
						{
                            startCode === 0 && endCode === 0 ?
                                null
                                :
                                <Image style={styles.icon17} resizeMode="cover" source={require("../../assets/images/arrowRight.png")}/>
                        }
                        <LocationTag location={endCode}/>
                    </View>
						<Text style={[styles.centerText10, styles.textAlignRight,  dueStatusStyle]}>{dueStatusText}</Text>
					</View>
					<View style={styles.cardStatusContainer}>
						<View style={[styles.infoContainer, styles.rowView, styles.spacebetween]}>
							<Text style={styles.text12}>작성자 : {nickname}</Text>
							<Text style={styles.text12}>{current}/{max}</Text>
						</View>
						<View style={styles.infoContainer}>
							<Text style={styles.text10}>작성 : {moment(createdAt).format('YYYY년 MM월 DD일 HH:mm')}</Text>
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

    const commentCard = CommentData.map((comment) => 
	comment.state !== 'CANCELED' && (
	<View key={comment.tcId}>
    <View style={[styles.commentContainer, { borderColor: comment.state === 'REJECTED' ? Color.colorGray_100 : '#22A2F2'}]}>
        <View style={[styles.commentheader, styles.spacebetween, styles.rowView, styles.margintop3]}>
			<Text style={styles.text16}>{comment.nickname}</Text>
			<View style={styles.rowView}>
				<Text style={styles.text16}>인원 : {comment.number} </Text>
				{/* 작성자 + 대기중 */}
				{comment.state === 'WAITING' && type === 1 &&(
				<>
					<Pressable style={[styles.bluebuttonContainer]} onPress={async () => handleAcceptRequest(comment.tcId)}>
					<Text style={styles.buttonText}>수락</Text>
					</Pressable>
					<Pressable style={[styles.redbuttonContainer, styles.marginLeft3]} onPress={async () => handleRejectRequest(comment.tcId)}>
					<Text style={[styles.redText,styles.text13]}>거절</Text>
					</Pressable>
				</>
				)}
				{/* 신청자 + 대기중 */}
				{comment.state === 'WAITING' && comment.studentId === userInfo &&(
				<>
					<Pressable style={[styles.bluebuttonContainer]} onPress={async () => handleCancelRequest(comment.tcId)}>
						<Text style={styles.buttonText}>취소</Text>
					</Pressable>
				</>
				)}
				{/* 수락됨 */}
				{comment.state === 'ACCEPTED' && (
				<View style={[styles.realbluebuttonContainer, styles.shadow]}>
					<Text style={styles.realblueText}>수락됨</Text>
				</View>
				)}
				{/* 거절됨 */}
				{comment.state ===  'REJECTED'&& (
				<View style={[styles.redbuttonContainer,styles.shadow]}>
					<Text style={[styles.redText,styles.text13]}>거절됨</Text>
				</View>
				)}
			</View>
		</View>
		<View style={styles.commentheader}>
			<Text style={styles.text12}>{comment.contents}</Text>
		</View>
	</View>
		{(userInfo === comment.studentId || (comment.state === 'ACCEPTED' && type === 1)) && (
			<View style={styles.commentDetails}>
				<Text style={styles.text12} selectable={true}>{comment.details}</Text>
			</View>
		)}
	</View>
	)
    )

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
				  <Header title="모집 글 상세" isReport={type !== 1} toId={taxiData.studentId} postId={tId} postType={3} onPressBack={() => navigation.pop()}/>
                    	<TaxiDetailCard title={taxiData.title} state={taxiData.state} nickname={taxiData.nickname} createdAt={taxiData.createdAt} due={taxiData.due} current={taxiData.current} max={taxiData.max} startCode={taxiData.startCode} endCode={taxiData.endCode} contents={taxiData.contents}/>
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



export default TaxiDetail;
