import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { symbol } from "prop-types";
import { TopMenu } from "../../components";
import { useIsFocused } from '@react-navigation/native';
import { getUserInfo, getAccessTokenInfo } from '../../components/utils'
import axios from 'axios';


const MyPage = ({navigation}) => {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    if(myData === null){
      fetchData();
    }
  }, [myData]);
	
	  const fetchData = async () => {
        const accessTokenInfo = await getAccessTokenInfo();
		const response = await axios.post(`${API_URL}/user/mypage`,
        {},
          {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [mypage] ✅ SUCCESS', res.data);
            if (res.status === 200) {
                setMyData(res.data);
            }
        }).catch((error) => {
          console.log('>>> [mypage] 🤬 ERROR', error);
        });
	  };
      if (myData === null) {
        return (
			<View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="#0000ff" />
			</View>
		  );
      }

    const MyPageCard = ({studentId, nickname}) => (
		<View style= {styles.myPageCard}>
            <View style={[styles.columnView,styles.marginLeft12]}>
                <Text style={styles.text20}>{nickname}</Text>
                <Text style={styles.text16}>{studentId}</Text>
            </View>
            <View>
            <Pressable style={[styles.buttonContainer,styles.marginRight12]} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </Pressable>
            </View>
        </View>
	)

  	return (
		<>
    		<View style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
                    <TopMenu/>
                    <View style={styles.myPageHeader}>
                        <View style={styles.icon26}></View>
                        <View style={styles.headerTitle}>
                            <Image style={styles.icon26} resizeMode="cover" source={require('./../../assets/images/user.png')}/>
                            <Text style={[styles.headerText, styles.marginLeft3]}>내 정보</Text>
                        </View>
						<View style={styles.icon26}></View>
                    </View>
                    <View style={styles.myPageBody}>
                        <View style={styles.myPageSection}>
                            <View>
                                <MyPageCard studentId={myData.studentId} nickname={myData.nickname} />
                            </View>
                            <Pressable style = {styles.myPageOption} onPress={()=>navigation.navigate('MyPost')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>내가 작성한 글</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption} onPress={()=>navigation.navigate('TaxiDetail')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>닉네임 변경</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption} onPress={()=>navigation.navigate('Password')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>비밀번호 변경</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption} onPress={() => alert('서비스 정보')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>서비스 정보</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable>
                            {myData.studentId === 201933008 || myData.studentId === 201933023 || myData.studentId === 202033013 ? (
                              <Pressable style={styles.myPageOption} onPress={() => navigation.navigate('NoticeCreate')}>
                                  <View style={[styles.rowView, styles.spacebetween]}>
                                      <Text style={styles.text16}>공지사항 작성하기</Text>
                                      <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")} />
                                  </View>
                              </Pressable>
                            ) : null}
                        </View>
                    </View>
      			</View>
    		</View>
		</>);
};



export default MyPage;