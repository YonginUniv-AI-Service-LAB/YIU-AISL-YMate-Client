import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, SafeAreaView, TouchableOpacity} from 'react-native';
import GuideModal from '../Modal/GuideModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {styles} from "../Style"
import {BottomButton, ErrorText, Header} from "../../components"


const Signup = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [studentId, setStudentId] = useState('');
  const [studentIdCheckError, setStudentIdCheckError] = useState('');
  const [studentIdCheckSuccess, setStudentIdCheckSuccess] = useState('');
  const [isStudentIdValid,setIsStudentIdValid] = useState(false);
  const [emailCheckNumber, setemailCheckNumber] = useState('');
  const [emailCheckError, setEmailCheckError] = useState('');
  const [emailCheckSuccess, setEmailCheckSuccess] = useState(''); 
  const [isEmailNumberValid,setIsEmailNumberValid] = useState(false);
  const [nickname, setnickname] = useState('');
  const [nickNameCheckError,setNickNameCheckError] = useState('');
  const [nickNameCheckSuccess,setNickNameCheckSuccess] = useState('');
  const [isNickNameValid,setIsNickNameValid] = useState(false);
  const [pwd, setpwd] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [passwordSuccess,setPasswordSuccess] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const [passwordConfirmationSuccess, setPasswordConfirmationSuccess] = useState('');
  const [isPasswordValid,setIsPasswordValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupCheckError, setSignupCheckError] = useState('');

  const [verificationCode, setVerificationCode] = useState('');

  const handleStudentId = async () => {
    const studentIdPattern = /^\d{9}$/;
    setSignupCheckError('');
    setIsEmailVerified(false);
    setIsStudentIdValid(false);
    setIsEmailNumberValid(false);
    setEmailCheckError('');
    setStudentIdCheckSuccess('');
    setEmailCheckSuccess('');
    if (!studentIdPattern.test(studentId)) {
      setStudentIdCheckError('유효한 학번을 입력해주세요.');
    } else {
      const response = await axios.post(`${process.env.API_URL}/mail`,
        { email: studentId },
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        }).then((res) => {
        console.log('>>> [mail] ✅ SUCCESS', res.data);
        if (res.status === 200) {
          setIsEmailVerified(true);
          setIsStudentIdValid(true);
          setStudentIdCheckError('');
          setStudentIdCheckSuccess('인증번호가 전송되었습니다.');
          setVerificationCode(res.data);
        }
      }).catch((error) => {
        console.log('>>> [mail] 🤬 ERROR', error);
        if (error.response && error.response.status === 409) {
          // 중복된 닉네임인 경우
          setStudentIdCheckError('이미 존재하는 회원입니다.');
        } 
        else{
          setStudentIdCheckError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
      });
    }
  };
  

  const handleEmailCheck = async () => {
    setEmailCheckSuccess('');
    setSignupCheckError('');
    if(isEmailVerified){
      if(emailCheckNumber != verificationCode){
        setEmailCheckError('인증번호가 일치하지 않습니다.');
        setIsEmailNumberValid(false);
      }
      else{
        setEmailCheckError('')
        setIsEmailNumberValid(true);
        setEmailCheckSuccess('인증번호가 일치합니다.');
      }
    }
    else {
      setEmailCheckError('이메일 확인이 필요합니다.');
    }
    
  }

  const handleNickNameCheck = async() => {
    setSignupCheckError('');
    setIsNickNameValid(false);
    if (nickname.length < 2) {
      setNickNameCheckError('닉네임은 두 글자 이상이어야 합니다.');
      setNickNameCheckSuccess('');
    } else {
      const response = await axios.post(`${process.env.API_URL}/nickcheck`,
        { nickname: nickname },
        {
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        }).then((res) => {
        console.log('>>> [nickcheck] ✅ SUCCESS', res.data);
        if (res.status===200) {
          setNickNameCheckError('');
          setIsNickNameValid(true);
          setNickNameCheckSuccess('사용 가능한 닉네임입니다.');
        }
      }).catch((error) => {
        if (error.response && error.response.status === 409) {
          // 중복된 닉네임인 경우
          setNickNameCheckError('중복된 닉네임입니다.');
        } 
        else{
          console.error('닉네임 전송 실패:', error);
          setNickNameCheckError('닉네임 전송에 실패했습니다. 다시 시도해주세요.');
        }
      });

    }
  };

  const handlePasswordChange = (text) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordPattern.test(text)) {
      setPasswordError('비밀번호는 영문, 숫자, 기호를 포함하고 8자리 이상이어야 합니다.');
      setPasswordSuccess('');
    }
    else {
      setPasswordError('');
      setPasswordSuccess('사용가능한 비밀번호입니다.');
    }

    setpwd(text);
  };

  const handlePasswordConfirmationChange = (text) => {
    setPasswordConfirmationSuccess('');
    if (text !== pwd) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
      setIsPasswordValid(false);
    } else {
      setPasswordConfirmationError('');
      setIsPasswordValid(true);
      setPasswordConfirmationSuccess('비밀번호가 일치합니다.');
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
        console.log("학번:", studentId);
        console.log("닉네임:", nickname);
        console.log("비번:", pwd);
          // 백엔드 API에 POST 요청 보내기
          const response = await axios.post(`${process.env.API_URL}/join`,
          {
            studentId: studentId,
            nickname: nickname,
            pwd: pwd,
          }, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [signup] ✅ SUCCESS', res.data);
            if (res.status === 200) {
              alert('회원가입이 완료되었습니다.');
              navigation.goBack();
            }
        }).catch((error) => {
          console.log('>>> [signup] 🤬 ERROR', error);
        });
      }   
    };
  const handleGuideButtonPress = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
    <View style={styles.mainBackground}>
      <Header title = '회원가입' onPressBack={() => navigation.goBack()}/>
        <View style = {[styles.spacebetween, styles.flexView, styles.backgroundWhite]}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' >
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
                <TouchableOpacity style={[styles.checkBox,styles.marginLeft12]} onPress={handleStudentId} activeOpacity={0.7}>
                  <Text style={[styles.text11, styles.blueText]}>인증메일 발송</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.rowView, styles.spacebetween]}>
                <Pressable onPress={handleGuideButtonPress}>
                    <Text style={[styles.text11, styles.blueText, styles.underline]}>
                      학번 인증 가이드 
                    </Text>
                </Pressable>
                <ErrorText isError={studentIdCheckError} errorMessage={studentIdCheckError} isChecked={isStudentIdValid} checkedMessage={studentIdCheckSuccess}/>
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
                <TouchableOpacity style={[styles.checkBox,styles.marginLeft12]} onPress={handleEmailCheck} disabled={!isEmailVerified} activeOpacity={0.7}>
                  <Text style={[styles.text11, styles.blueText]}>인증번호 발송</Text>
                </TouchableOpacity>
              </View>
            </View>
           
                <ErrorText isError={emailCheckError} errorMessage={emailCheckError} isChecked={isEmailNumberValid} checkedMessage={emailCheckSuccess}/>
           
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
                <TouchableOpacity style={[styles.checkBox,styles.marginLeft12]} onPress={handleNickNameCheck} activeOpacity={0.7}>
                  <Text style={[styles.text11, styles.blueText]}>중복확인</Text>
                </TouchableOpacity>
              </View>
            </View>
                  
              <ErrorText isError={nickNameCheckError} errorMessage={nickNameCheckError} isChecked={isNickNameValid} checkedMessage={nickNameCheckSuccess}/>
            
            <View style={[styles.rowView, styles.margintop11]} >
                <Text style={[styles.text12, styles.flex025]}>비밀번호</Text>
                <TextInput
                  style={[styles.loginInput]}
                  value={pwd}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={true}
                />
            </View>
              <ErrorText isError={passwordError} errorMessage={passwordError} isChecked={passwordSuccess} checkedMessage={passwordSuccess}/>
            <View style={[styles.rowView, styles.margintop11]} >
                <Text style={[styles.text12, styles.flex025]}>비밀번호 확인</Text>
                <TextInput
                  style={[styles.loginInput,  pwd !== passwordConfirmation ? styles.errorInput : null]}
                  value={passwordConfirmation}
                  onChangeText={handlePasswordConfirmationChange}
                  secureTextEntry={true}
                />
            </View>
              <ErrorText isError={passwordConfirmationError} errorMessage={passwordConfirmationError} isChecked={passwordConfirmation} checkedMessage={passwordConfirmationSuccess}/>
          </View>
            </KeyboardAwareScrollView>
            <ErrorText style={styles.marginRight20} isError={signupCheckError} errorMessage={signupCheckError}/>   
            <BottomButton title='회원가입' onPress={handleSignup}/>
      
        </View>
    </View>
    <GuideModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />    
  </SafeAreaView>
  )

};

export default Signup;