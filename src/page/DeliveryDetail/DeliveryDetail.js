import React, { useState, useEffect,useContext } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import {styles} from "../Style"
import moment from 'moment-timezone';
import {FoodImage, Header} from "../../components"
import axios from 'axios';
import { getUserInfo} from '../../components/utils'
import { callApi } from "../../components/utils";
import LocationTag from '../../components/LocationTag';
import { useFocusEffect } from '@react-navigation/native';
import DeliveryRecruit from "../Delivery/DeliveryRecruit";
import {AuthContext} from '../../../App';

const DeliveryDetail = ({navigation, route}) => {
	const { dId } = route.params;
	const [refreshing, setRefreshing] = React.useState(false)
	const [CommentData, setCommentData] = useState([]);
	const [deliveryData, setDeliveryData] = useState(null);
	const [type, setType] = useState('');
	const [isPastDue, setIsPastDue] = useState('');
	const [userInfo, setUserInfo] = useState('');
    const [expanded, setExpanded] = React.useState([]);
	const { logout } = useContext(AuthContext);
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

	const handleButtonPress  = async () => { 
		if(isPastDue || deliveryData.state ==='FINISHED'){
			alert('이미 마감된 글입니다.');
		}
		else if(type === 1){
			navigation.navigate('DeliveryRecruit', {
				did: deliveryData.did,
				location: deliveryData.location,
				locationCode: deliveryData.locationCode,
				food: deliveryData.food,
				foodCode: deliveryData.foodCode,
				title: deliveryData.title,
				contents: deliveryData.contents,
				link: deliveryData.link,
			});
		}
		else{
			navigation.navigate('DeliveryRequest', {did: deliveryData.did});
		}
	}
	useFocusEffect(
		React.useCallback(() => {
		  // 화면이 포커스를 얻었을 때 데이터를 가져오도록 설정
		  fetchDeliveryData();
		}, [refreshing])
	  );

	  const fetchDeliveryData = async () => {
		const userInfo = await getUserInfo(); // 예시: getUserInfo가 Promise를 반환하는 경우
		const data = { dId: dId };
		try {
		  const response = await callApi(`${process.env.API_URL}/delivery/detail`, 'post', data);
		  console.log('>>> [deliverydetail] ✅ SUCCESS', response.data);
		  if (response.status === 200) {
			setDeliveryData(response.data);
			setType(userInfo === response.data.studentId ? 1 : 2); // 1: 작성자, 2: 일반유저
			setCommentData(response.data.comment);
			setUserInfo(userInfo);
			console.log(deliveryData)
			// deliverydetail로 데이터를 전달하며 이동
			const iscommentAccepted = response.data.comment.some(comment => comment.studentId === userInfo && comment.state === 'ACCEPTED');
			if (iscommentAccepted) {
				setType(3); // 
			}
		  }
		} catch (error) {
		  if (error.message === 'Session expired. Please login again.') {
			Alert.alert('세션에 만료되었습니다.')
			logout();
		  } else {
			console.log('>>> [deliverydetail] 🤬 ERROR', error);
			alert('삭제됐거나 존재하지 않는 글입니다.');
			navigation.goBack();
		  }
		}
	  };
	if (deliveryData === null) {
        return (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="#0000ff" />
			</View>
		  );
      }

	const handleAcceptRequest = async (dcId) => {
		if(isPastDue|| deliveryData.state === 'FINISHED'){
			alert('이미 마감된 글입니다.');
		  }
		  else{
			try {
			  const data = { dcId: dcId };
			  const response = await callApi(`${process.env.API_URL}/delivery/accept`, 'post', data);
			  setRefreshing(false);
			  if (response.status === 200) {
				Alert.alert("수락 완료");
				fetchDeliveryData();
			  }
			} catch (error) {
				if (error.message === 'Session expired. Please login again.') {
					Alert.alert('세션에 만료되었습니다.')
					logout();
				  } 
				else if (error.response && error.response.status === 409) {
					Alert.alert('이미 마감된 글입니다.');
				}
				else{ 
					Alert.alert('삭제 되었거나 없는 신청글입니다.');
			
				}
		}
	}
	};

	const handleRejectRequest = async (dcId) => {
		if(isPastDue|| deliveryData.state === 'FINISHED'){
			alert('이미 마감된 글입니다.');
		  }
		  else{
			try {
			  const data = { dcId: dcId };
			  const response = await callApi(`${process.env.API_URL}/delivery/reject`, 'post', data);
			  setRefreshing(false);
			  if (response.status === 200) {
				Alert.alert("거절 완료");
				fetchDeliveryData();
			  }
			} catch (error) {
				if (error.message === 'Session expired. Please login again.') {
					Alert.alert('세션에 만료되었습니다.')
					logout();
				  } 
				else if (error.response && error.response.status === 409) {
					Alert.alert('이미 마감된 글입니다.');
				}
				else{ 
					Alert.alert('삭제 되었거나 없는 신청글입니다.');
			
				}
		  }
		}
	};

	const handleCancelRequest = async (dcId) => {
		try {
			const data = { dcId: dcId };
			const response = await callApi(`${process.env.API_URL}/delivery/cancel`, 'post', data);
			setRefreshing(false);
			if (response.status === 200) {
			  Alert.alert("취소 완료");
			  fetchDeliveryData();
			}
		  } catch (error) {
			if (error.message === 'Session expired. Please login again.') {
				Alert.alert('세션에 만료되었습니다.')
				logout();
			  } 
			else {
				console.error("데이터 가져오기 실패:", error);
				Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  }
		
	}

	const handleFinishDetail = async() => {
		if(isPastDue || deliveryData.state === 'FINISHED'){
			alert('이미 마감된 글입니다.');
		  }
		  else{
			try {
			  const data = { dId: dId };
			  const response = await callApi(`${process.env.API_URL}/delivery/finish`, 'post', data);
			  setRefreshing(false);
			  if (response.status === 200) {
				Alert.alert("마감 완료");
				navigation.goBack();
			  }
			} catch (error) {
				if (error.message === 'Session expired. Please login again.') {
					Alert.alert('세션에 만료되었습니다.')
					logout();
				  } 
				else if (error.response && error.response.status === 409) {
				Alert.alert('이미 마감된 글입니다.');
			  }
			else{
				console.error("데이터 가져오기 실패:", error);
				Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  }
		}
	}
	const handleDeleteDetail = async() => {
		try {
			const data = { dId: dId };
			const response = await callApi(`${process.env.API_URL}/delivery/delete`, 'post', data);
			setRefreshing(false);
			if (response.status === 200) {
			  Alert.alert("삭제 완료");
			  navigation.goBack();
			}
		  } catch (error) {
			if (error.message === 'Session expired. Please login again.') {
				Alert.alert('세션에 만료되었습니다.')
				logout();
			  } 
			else if (error.response && error.response.status === 409) {
				Alert.alert('신청글이 존재합니다.');
			  }
			
			else{ 
				Alert.alert('삭제 되었거나 없는 신청글입니다.');
			}
		  
		}
	}

	const DeliveryDetailCard = ({title, state, location, food, nickname, createAt, due, contents, link}) => {
        const [now, setNow] = React.useState(moment().tz('Asia/Seoul'));
		const [writeType, setWriteType] = React.useState('');
        React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment().tz('Asia/Seoul'));
        }, 60000); // 1분마다 갱신 (설정에 따라 조절 가능)
        
            return () => clearInterval(interval);
        }, []);

        let dueDate = moment(due);
        setIsPastDue(now.isAfter(dueDate));
        let minutesDiff = Math.abs(moment.utc(dueDate).diff(moment.utc(now), 'minutes')); 
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
						<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/restaurant.png")}/>
						<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
					</View>
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
								}}>
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
								}}>
								<Text style={styles.redText}>삭제하기</Text>
							</Pressable>
						</View>
					)}
				</View>
				<View style={[styles.bigCard, styles.padding10]}>
                <FoodImage food={food} />
				<View style={styles.flexView}>
					<View style={styles.smallCardContent}>
						<LocationTag location={location}/>
						<Text style={[styles.centerText10, styles.textAlignRight,  dueStatusStyle]}>{dueStatusText}</Text>
					</View>
					<View style={styles.cardStatusContainer}>
						<View style={[styles.infoContainer, styles.rowView, styles.spacebetween]}>
							<Text style={styles.text12}>작성자 : {nickname}</Text>
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
					{(type === 1 || type === 3) && (
						<View style={[styles.deliverytitleContainer, styles.rowView]}>
							<Text style={styles.deliveryTitleText}>{'URL : '}</Text>
							<Text style={styles.deliveryTitleText} numberOfLines={1} selectable={true} dataDetectorType={'link'}>{link}</Text>
						</View>
					)}
				</View>
			</View>
		);
    }

	// 후후 ~@~
    const commentCard = CommentData.map((comment) => 
	comment.state !== 'CANCELED' && (
	<View key={comment.dcId}>
		<View style={[styles.commentContainer, { borderColor: comment.state === 'REJECTED' ? Color.colorGray_100 : '#22A2F2'}]}>
			<View style={[styles.commentheader, styles.spacebetween, styles.rowView, styles.margintop3]}>
				<Text style={styles.text16}>{comment.nickname}</Text>
				<View style={styles.rowView}>
					{comment.state === 'WAITING' && type === 1 &&(
					<>
						<Pressable style={[styles.bluebuttonContainer]} onPress={async () => handleAcceptRequest(comment.dcId)}>
						<Text style={styles.buttonText}>수락</Text>
						</Pressable>
						<Pressable style={[styles.redbuttonContainer, styles.marginLeft3]} onPress={async () => handleRejectRequest(comment.dcId)}>
						<Text style={[styles.redText,styles.text13]}>거절</Text>
						</Pressable>
					</>
					)}
					{comment.state === 'WAITING' && comment.studentId === userInfo &&(
					<>
						<Pressable style={[styles.bluebuttonContainer]} onPress={async () => handleCancelRequest(comment.dcId)}>
							<Text style={styles.buttonText}>취소</Text>
						</Pressable>
					</>
					)}
					{comment.state === 'ACCEPTED' && (
					<View style={[styles.realbluebuttonContainer, styles.shadow]}>
						<Text style={styles.realblueText}>수락됨</Text>
					</View>
					)}
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
				<View style = {styles.commentDetails}>
					<Text style = {styles.text12} selectable={true}>{comment.details}</Text>
				</View>
		)}
	</View>
	)
    )

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<Header title="모집 글 상세" isReport={type !== 1} toId={deliveryData.studentId} postId={dId} postType={1} onPressBack={() => navigation.pop()}/>
					<DeliveryDetailCard title={deliveryData.title} nickname={deliveryData.nickname} state={deliveryData.state} food={deliveryData.foodCode} location={deliveryData.locationCode} createAt={deliveryData.createdAt} due={deliveryData.due} contents={deliveryData.contents} link={deliveryData.link}/>
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
