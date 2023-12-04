import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, SafeAreaView} from 'react-native';
import { Dimensions } from 'react-native';
import GuideModal from '../Modal/GuideModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {styles} from "../Style"

const screenWidth = Dimensions.get('window').width;


const Signup = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [studentId, setStudentId] = useState('');
  const [studentIdCheckError, setStudentIdCheckError] = useState('');
  const [isStudentIdValid,setIsStudentIdValid] = useState(false);
  const [emailCheckNumber, setemailCheckNumber] = useState('');
  const [emailCheckError, setEmailCheckError] = useState(''); 
  const [isEmailNumberValid,setIsEmailNumberValid] = useState(false);
  const [nickname, setnickname] = useState('');
  const [nickNameCheckError,setNickNameCheckError] = useState('');
  const [isNickNameValid,setIsNickNameValid] = useState(false);
  const [pwd, setpwd] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const [isPasswordValid,setIsPasswordValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupCheckError, setSignupCheckError] = useState('');

  const handleStudentId = async () => {
    const studentIdPattern = /^\d{9}$/;
  
    if (!studentIdPattern.test(studentId)) {
      setStudentIdCheckError('유효한 학번을 입력해주세요.');
      setIsEmailVerified(false);
      setIsStudentIdValid(false);
      setEmailCheckError('');
    } else {
      const apiUrl = 'https://example.com/api/mail';
      try {
        // 학번을 백엔드로 전송
        const response = await axios.post(apiUrl, {
          studentId,
        });
  
        if (response.status===200) {
          // 성공적으로 이메일을 보낸 경우, 이메일 인증이 필요하다는 메시지를 표시할 수 있습니다.
          setIsEmailVerified(true);
          setIsStudentIdValid(true);
          setStudentIdCheckError('');
        } else {
          // 백엔드에서 실패한 경우, 에러 메시지 표시 또는 적절한 조치 수행
          setStudentIdCheckError(response.data.message || '이메일 전송에 실패했습니다.');
          setIsEmailVerified(false);
          setIsStudentIdValid(false);
          setEmailCheckError('');
        }
      } catch (error) {
        console.error('이메일 전송 실패:', error);
        setStudentIdCheckError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        setIsEmailVerified(true);
          setIsStudentIdValid(true);
          setStudentIdCheckError('');
      }
    }
  };

  const handleEmailCheck = async () => {
    if(isEmailVerified){
      if(emailCheckNumber != 666){
        setEmailCheckError('인증번호가 일치하지 않습니다.');
        setIsEmailNumberValid(false);
      }
      else{
        setEmailCheckError('')
        setIsEmailNumberValid(true);
      }
    }
    else {
      setEmailCheckError('이메일 확인이 필요합니다.');
    }
    
  }
  const handleNickNameCheck = async() => {
    if (nickname.length < 2) {
      setNickNameCheckError('닉네임은 두 글자 이상이어야 합니다.');
      setIsNickNameValid(false);
    } else {
      const apiUrl = 'https://example.com/api/mail';
      try {
        // 학번을 백엔드로 전송
        const response = await axios.post(apiUrl, {
          nickname,
        });
        if (response.status===200) {
          setNickNameCheckError('');
          setIsNickNameValid(true);
        }
        else{
          setNickNameCheckError('닉네임 중복');
          setIsNickNameValid(flase);
        }
      }catch(error){
        console.error('닉네임 전송 실패:', error);
        setNickNameCheckError('닉네임 전송에 실패했습니다. 다시 시도해주세요.');
        setIsNickNameValid(flase);
      }

    }
  };

  const handlePasswordChange = (text) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-z\d!@#$%^&*()_+]{8,}$/;

    if (!passwordPattern.test(text)) {
      setPasswordError('비밀번호는 영문, 숫자, 기호를 포함하고 8자리 이상이어야 합니다.');
    }
    else {
      setPasswordError('');
    }

    setpwd(text);
  };

  const handlePasswordConfirmationChange = (text) => {
    if (text !== pwd) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
      setIsPasswordValid(false);
    } else {
      setPasswordConfirmationError('');
      setIsPasswordValid(true);
    }

    setPasswordConfirmation(text);
  };

  const handleSignup = async () => {
      if(!isStudentIdValid){
        setSignupCheckError('올바른 학번을 입력해주세요.');
      }
      else if(!isEmailNumberValid){
        setSignupCheckError('올바른 인증번호를 입력해주세요.');
      }
      else if(!isNickNameValid){
        setSignupCheckError('올바른 닉네임을 입력해주세요.');
      }
      else if(passwordError){
        setSignupCheckError('올바른 비밀번호를 입력해주세요.');
      }
      else if(!isPasswordValid){
        setSignupCheckError('올바른 비밀번호를 입력해주세요.');
      }
      else if(pwd !== passwordConfirmation){
        setSignupCheckError('비밀번호가 일치하지 않습니다.');
      } 
      else{
        setSignupCheckError('');
        navigation.navigate('Login');
        const apiUrl = "http://localhost:8080/join";
        try {
          // 백엔드 API에 POST 요청 보내기
          const response = await axios.post(apiUrl, {
            studentId: studentId,
            nickname: nickname,
            pwd: pwd,
          });
    
          // 서버에서의 응답 처리
          if (response.status === 200) {
            // 가입 성공 시, 이전 화면으로 돌아가기
            navigation.goBack(); // 또는 navigation.navigate('PreviousScreen');
          } else {
            // 가입 실패 시, 에러 메시지 표시 또는 적절한 조치 수행
            setSignupCheckError(response.data.message || '가입 실패했습니다.');
          }
        } catch (error) {
          // 네트워크 오류 또는 요청 중 발생한 다른 오류 처리
          console.error('가입 실패:', error);
          setSignupCheckError('가입에 실패했습니다. 다시 시도해주세요.');
        }
      }
  };
  const handleGuideButtonPress = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
    <View style={styles.mainBackground}>
        <View style={styles.uppermenu}>
          <Pressable style={styles.locationButton} onPress={() => navigation.pop()}>
              <Image
              style={styles.icon20}
              resizeMode="cover"
              source={require("../../assets/images/left.png")}
              />
          </Pressable>
          <Text style={[styles.text20]}>
              회원 가입
          </Text>
          <View style={[styles.icon20]} />
        </View>
        <View style = {[styles.spacebetween, styles.flexView, styles.backgroundWhite]}>
          <KeyboardAwareScrollView>
          <View style={[styles.recruitSection]}>
            <View style={[styles.rowView, styles.margintop11]} >
              <View style = {styles.flex025}>
                <Text style={[styles.text12]}>학번</Text>
              </View>
              <View style={[styles.rowView, styles.flexView]}>
                <TextInput
                  style={[styles.loginInput]}
                  value={studentId}
                  onChangeText={(text) => {
                    setStudentId(text);
                    setIsStudentIdValid(false);
                    setIsEmailVerified(false);
                  }}
                />
                <Pressable style={[styles.checkBox,styles.marginLeft12]} onPress={handleStudentId}>
                  <Text style={[styles.text11, styles.blueText]}>인증메일 발송</Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.emptySpace,styles.rowView, styles.spacebetween]}>
                <Pressable onPress={handleGuideButtonPress}>
                    <Text style={[styles.text11, styles.blueText, styles.underline]}>
                      학번 인증 가이드 
                    </Text>
                </Pressable>
                  {studentIdCheckError ? (
                    <Text style={[styles.text11,styles.errorText]}>{studentIdCheckError}</Text>
                  ) : null}
            </View>
            <View style={[styles.rowView, styles.margintop11]} >
              <View style = {styles.flex025}>
                <Text style={[styles.text12]}>이메일 확인</Text>
              </View>
              <View style={[styles.rowView, styles.flexView]}>
                <TextInput
                  style={[styles.loginInput]}
                  value={emailCheckNumber}
                  onChangeText={(text) => {
                    setemailCheckNumber(text)
                    setIsEmailNumberValid(false);
                  }}
                />
                <Pressable style={[styles.checkBox,styles.marginLeft12]} onPress={handleEmailCheck} disabled={!isEmailVerified}>
                  <Text style={[styles.text11, styles.blueText]}>인증번호 발송</Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.emptySpace]}>
                  {emailCheckError ? (
                    <Text style={[styles.text11,styles.errorText]}>{emailCheckError}</Text>
                  ) : null}
              </View>
            <View style={[styles.rowView, styles.margintop11]} >
              <View style = {styles.flex025}>
                <Text style={[styles.text12]}>닉네임</Text>
              </View>
              <View style={[styles.rowView, styles.flexView]}>
                <TextInput
                  style={[styles.loginInput]}
                  value={nickname}
                  onChangeText={(text) => {
                    setnickname(text);
                    setIsNickNameValid(false);
                  }}
                />
                <Pressable style={[styles.checkBox,styles.marginLeft12]} onPress={handleNickNameCheck}>
                  <Text style={[styles.text11, styles.blueText]}>중복확인</Text>
                </Pressable>
              </View>
            </View>
            <View style={[styles.emptySpace]}>
                  {nickNameCheckError ? (
                    <Text style={[styles.text11,styles.errorText]}>{nickNameCheckError}</Text>
                  ) : null}
              </View>
            <View style={[styles.rowView, styles.margintop11]} >
                <Text style={[styles.text12, styles.flex025]}>비밀번호</Text>
                <TextInput
                  style={[styles.loginInput]}
                  value={pwd}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={true}
                />
            </View>
            <View style={[styles.emptySpace]}>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>
            <View style={[styles.rowView, styles.margintop11]} >
                <Text style={[styles.text12, styles.flex025]}>비밀번호 확인</Text>
                <TextInput
                  style={[styles.loginInput,  pwd !== passwordConfirmation ? styles.errorInput : null]}
                  value={passwordConfirmation}
                  onChangeText={handlePasswordConfirmationChange}
                  secureTextEntry={true}
                />
            </View>
          </View>
          <View style={[styles.emptySpace]}>
            {passwordConfirmationError ? (
              <Text style={styles.errorText}>{passwordConfirmationError}</Text>
            ) : null}
            </View>
            </KeyboardAwareScrollView>
          <View style={[styles.bottomContainer]}>
            {signupCheckError ? (
              <Text style={[styles.text11,styles.errorText]}>{signupCheckError}</Text>
            ) : null}
            <Pressable style={styles.bottomButton} onPress={handleSignup}>
              <Text style={[styles.text16, styles.whiteText]}>회원가입</Text>
            </Pressable>
          </View>
        </View>
    </View>
    <GuideModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />    
  </SafeAreaView>
  )

};

export default Signup;