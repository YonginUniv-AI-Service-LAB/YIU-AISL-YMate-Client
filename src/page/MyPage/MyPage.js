import React, { useState, useEffect,useContext} from "react";
import { Image, StyleSheet, Text, View, Pressable, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { symbol } from "prop-types";
import { TopMenu } from "../../components";
import { useIsFocused } from '@react-navigation/native';
import { getUserInfo, getAccessTokenInfo, callApi } from '../../components/utils'
import axios from 'axios';
import NicknameModal from "../Modal/NicknameModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../App';


const MyPage = ({navigation}) => {
  const [myData, setMyData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if(myData === null){
      fetchData();
    }
  }, [myData,isModalVisible]);
	
	  const fetchData = async () => {
      try {
        const response = await callApi(`${API_URL}/user/mypage`, 'get');
        console.log('>>> [mypage] ✅ SUCCESS', response.data);
    
        if (response.status === 200) {
          setMyData(response.data);
        }
      } catch (error) {
        if (error.message === 'Session expired. Please login again.') {
          navigation.navigate('Login');
        }
        console.log('>>> [mypage] 🤬 ERROR', error);
      }
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
            <Pressable style={[styles.buttonContainer,styles.marginRight12]} onPress={async () => {
                // 로그아웃 시 AsyncStorage에서 토큰 삭제
                logout();
              }}
            >
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
                            <Pressable style = {styles.myPageOption} onPress={()=> setModalVisible(true)}>
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
                              <View>
                              <Pressable style={styles.myPageOption} onPress={() => navigation.navigate('NoticeCreate')}>
                                  <View style={[styles.rowView, styles.spacebetween]}>
                                      <Text style={styles.text16}>공지사항 작성하기</Text>
                                      <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")} />
                                  </View>
                              </Pressable>
                              <Pressable style={styles.myPageOption} onPress={() => navigation.navigate('Report')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>신고 글 조회</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")} />
                                </View>
                              </Pressable>
                              </View>
                            ) : null}
                        </View>
                    </View>
                    <NicknameModal 
                      isVisible={isModalVisible} 
                      onClose={() => setModalVisible(false)} 
                      onSave={async () => {
                          // 이 부분에 닉네임을 저장하는 로직을 추가하세요.
                          await fetchData();
                          setModalVisible(false);
                          
                      }} 
                  />
      			</View>
    		</View>
		</>);
};



export default MyPage;