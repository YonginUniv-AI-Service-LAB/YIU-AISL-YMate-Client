import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import { exp } from 'react-native/Libraries/Animated/Easing'
import { getUserInfo, getAccessTokenInfo,callApi} from './utils'
import axios from 'axios'

//size: 0 -> smallCard 1 -> bigCard
const NoticeCard = ({noticeId, title, contents, updatedAt}) => {
    const navigation = useNavigation();
    const [expandState, setExpandState] = useState(0)
    const [userId, setUserId] = useState(null);
    
    const toggleExpand = async expandState => {
		setExpandState(expandState ? 0 : 1)
        if (userId === null) {
            const userInfo = await getUserInfo();
            setUserId(userInfo);
        }
	}

    useFocusEffect(
        React.useCallback(() => {
            // 화면 포커스가 변경될 때마다 AsyncStorage에서 location을 로드합니다.
            setExpandState(0);
        }, [])
    );
    
    const upadatedText = moment(updatedAt).format('MM.DD')

    const handleModifyNotice = async () => {
        navigation.navigate('NoticeCreate', { noticeId: noticeId });
    }

    const handleDeleteNotice = async() => {
        try {
          const postData = {
            noticeId: noticeId,
          };
          const response = await callApi(`${process.env.API_URL}/notice/delete`, 'post', postData);
          if (response.status === 200) {
            Alert.alert("삭제 완료");
          }
        } catch (error) {
            if (error.message === 'Session expired. Please login again.') {
                Alert.alert('세션에 만료되었습니다.')
                logout();
              } else if (error.response && error.response.status === 404) {
            Alert.alert('없는 공지글.');
          }
          console.log(error);
        }
      };
      
   

    return (
        expandState?
            <Pressable key={noticeId} style={styles.smallNoticeCard} onPress={() => toggleExpand(expandState)}>
                <View style={styles.noticeCardTitle}>
                    <Text style={styles.noticeTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.centerText10}>{upadatedText}</Text>
                </View>
                <View style={styles.noticeCardContents}>
                    <Text style={styles.noticeTitle} >{contents}</Text>
                </View>
                {userId === 201933008 || userId === 201933023 || userId === 202033013 ? (
                    <>
                    <View style = {[styles.rowView, { justifyContent: 'flex-end' }]}>
                        <Pressable style={[styles.bluebuttonContainer]} onPress={async () => handleModifyNotice(noticeId)}>
                            <Text style={styles.buttonText}>수정</Text>
                        </Pressable>
                        <Pressable style={[styles.redbuttonContainer, styles.marginLeft3]} onPress={() => {
									Alert.alert(
										"삭제",
										"삭제하시겠습니까?",
										[
										{
											text: "취소",
											style: "cancel",
										},
										{
											text: "확인",
											onPress: async () => handleDeleteNotice(),
										},
										],
										{ cancelable: false }
									);
									}}
								>
                            <Text style={[styles.redText, styles.text13]}>삭제</Text>
                        </Pressable>
                    </View>
                    </>
                ) : null}
                
            </Pressable>
            :
            <Pressable key={noticeId} style={[styles.smallNoticeCard, styles.noticeCardTitle]} onPress={() => toggleExpand(expandState)}>
				<Text style={styles.noticeTitle} numberOfLines={1}>{title}</Text>
				<Text style={styles.centerText10}>{upadatedText}</Text>
		    </Pressable>
            
	)
}

export default NoticeCard
