import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, SafeAreaView } from 'react-native';
import Signup from '../Signup/Signup';
import Main from '../Main/Main';
import Password from '../Password/Password';
import axios from 'axios';
import {styles} from "../Style"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, route }) => {
  const { onLogin } = route.params || {};
  const [studentId, setStudentId] = useState('');
  const [pwd, setpwd] = useState('');

  const handleLogin = async () => {
    if (!studentId || !pwd) {
      alert('아이디나 비밀번호를 입력해주세요');
    } else {
      try {
        const response = await axios.post(
          "http://172.30.1.67:8080/login",
          {
            studentId: studentId,
            pwd: pwd,
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
          }
        );

        console.log('>>> [LOGIN] ✅ SUCCESS', response.data);

        if (response.status === 200) {
          // 로그인 성공 시 studentId와 accessToken을 AsyncStorage에 저장
          await AsyncStorage.setItem('user', studentId);
          await AsyncStorage.setItem('accessToken', response.data.token.accessToken);
          navigation.navigate('Main');
        }
      } catch (error) {
        console.log('>>> [LOGIN] 🤬 ERROR', error);
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
                secureTextEntry={true}
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