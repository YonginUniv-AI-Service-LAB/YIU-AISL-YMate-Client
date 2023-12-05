import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, SafeAreaView } from 'react-native';
import Signup from '../Signup/Signup';
import Main from '../Main/Main';
import Password from '../Password/Password';
import axios from 'axios';
import {styles} from "../Style"

const Login = ({ navigation, route }) => {
  const { onLogin } = route.params || {};
    const [studentId, setStudentId] = useState('');
  const [pwd, setpwd] = useState('');

  const handleLogin = async () => {
    if (!studentId || !pwd) {
      navigation.navigate('Main');
    }else{
      const apiUrl = "http://localhost:8080/join";
    try {
      // Axios를 사용하여 POST 요청 보내기
      const response = await axios.post(apiUrl, {
        studentId,
        Password: pwd,
        fcm: 1234,
      });

      // 응답이 성공적인지 확인
      if (response.status === 200) {
        // 성공적인 로그인
        alert('로그인 성공!');
        // 부모 컴포넌트에 로그인 상태 전달
        onLogin();
      } else {
        // 로그인 실패 처리
        alert('로그인 실패. 올바른 학번과 비밀번호를 입력하세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }
  };



  return (
    <SafeAreaView style={[styles.mainScreen]}>
      <View style={[styles.mainBackground,styles.backgroundWhite,styles.center]}>
        <View style= {[styles.columnView]}>
          <View style={styles.flex025}></View>
          <View style={styles.mainLogo}>
            <Image
              source = {require('../../assets/images/ymate_logo.png')}
              style={styles.icon100}
            />
            <Text style={styles.centerText20}>YMATE</Text>
          </View>
          <View style={styles.loginSection}>
            <View style={[styles.rowView, styles.margintop11]} >
              <Text style={[styles.text15, styles.flex03]}>학번</Text>
              <TextInput
                style={[styles.loginInput]}
                value={studentId}
                onChangeText={(text) => {
                  setStudentId(text);
                }}
              />
            </View>
            <View style={[styles.rowView, styles.margintop11]} >
              <Text style={[styles.text15, styles.flex03]}>비밀번호</Text>
              <TextInput
                style={[styles.loginInput]}
                value={pwd}
                onChangeText={(text) => {
                  setpwd(text);
                }}
              />
            </View>
            <View style={[styles.flexView,styles.margintop3]}>
              <Pressable onPress={() => {navigation.navigate(Password)}}>
                <Text style={[styles.text11,styles.errorText]}>비밀번호를 잊으셨나요?</Text>
              </Pressable>
            <View style={styles.center}>
              <Pressable style = {styles.loginButton} onPress={handleLogin}>
                  <Text style={[styles.text16, styles.whiteText]}>로그인</Text>
              </Pressable>
              <View style={[styles.rowView, styles.margintop6]}>
                <Text style={styles.text11}>아직 회원이 아니신가요? </Text>
                <Pressable onPress={() => {navigation.navigate(Signup)}}>
                  <Text style={[styles.text11, styles.blueText]}>회원가입</Text>
                </Pressable>
              </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;