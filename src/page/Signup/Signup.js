import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Signup = ({ navigation }) => {

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

  const handleStudentId = () => {
    const studentIdPattern = /^\d{9}$/;
      if (!studentIdPattern.test(studentId)) {
        setStudentIdCheckError('유효한 학번을 입력해주세요.');
        setIsEmailVerified(false);
        setIsStudentIdValid(false);
        setEmailCheckError('');
      } else {
        setIsStudentIdValid(true);
        setIsEmailVerified(true);
        setStudentIdCheckError('');
      }
    
  }

  const handleEmailCheck = () => {
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
  const handleNickNameCheck = () => {
    if (nickname.length < 2) {
      setNickNameCheckError('닉네임은 두 글자 이상이어야 합니다.');
      setIsNickNameValid(false);
    } else {
      setNickNameCheckError('');
      setIsNickNameValid(true);
    }
  }

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

  const handleSignup = () => {
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
        // try {
        //   // 백엔드 API에 POST 요청 보내기
        //   const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        //     studentId,
        //     emailCheckNumber,
        //     nickName,
        //     password,
        //   });
    
        //   // 서버에서의 응답 처리
        //   if (response.data.success) {
        //     // 가입 성공 시, 이전 화면으로 돌아가기
        //     navigation.goBack(); // 또는 navigation.navigate('PreviousScreen');
        //   } else {
        //     // 가입 실패 시, 에러 메시지 표시 또는 적절한 조치 수행
        //     setSignupCheckError(response.data.message || '가입 실패했습니다.');
        //   }
        // } catch (error) {
        //   // 네트워크 오류 또는 요청 중 발생한 다른 오류 처리
        //   console.error('가입 실패:', error);
        //   setSignupCheckError('가입에 실패했습니다. 다시 시도해주세요.');
        // }
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>학번</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={studentId}
            onChangeText={(text) => {
              setStudentId(text);
              setIsStudentIdValid(false);
              setIsEmailVerified(false); // 학번이 변경되면 유효성 검사를 다시 진행해야 합니다.
            }}
          />
          <TouchableOpacity style={styles.checkContainer} onPress={handleStudentId}>
        <Text style={styles.checkBox}>인증메일 발송</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.emptySpace}>
        {studentIdCheckError ? (
        <Text style={styles.errorText}>{studentIdCheckError}</Text>
      ) : null}
      </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>이메일 확인</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={emailCheckNumber}
            onChangeText={(text) => {
              setemailCheckNumber(text)
              setIsEmailNumberValid(false);
            }}
          />
        <TouchableOpacity style={styles.checkContainer} onPress={handleEmailCheck} disabled={!isEmailVerified}>
        <Text style={styles.checkBox}>인증번호 확인</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.emptySpace}>
        {emailCheckError ? (
        <Text style={styles.errorText}>{emailCheckError}</Text>
      ) : null}
      </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>닉네임</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={nickname}
            onChangeText={(text) => {
              setnickname(text);
              setIsNickNameValid(false);
            }}
          />
        <TouchableOpacity style={styles.checkContainer} onPress={handleNickNameCheck}>
        <Text style={styles.checkBox}>중복 확인</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.emptySpace}>
        {nickNameCheckError ? (
        <Text style={styles.errorText}>{nickNameCheckError}</Text>
      ) : null}
      </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>비밀번호</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={pwd}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.emptySpace}>
        {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>비밀번호 확인</Text>
          <TextInput
            style={[styles.input, styles.rounded, pwd !== passwordConfirmation ? styles.errorInput : null]}
            value={passwordConfirmation}
            onChangeText={handlePasswordConfirmationChange}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.emptySpace}>
        {passwordConfirmationError ? (
        <Text style={styles.errorText}>{passwordConfirmationError}</Text>
      ) : null}
    </View>
      </View>
      <View style={styles.signupCheck}>
        {signupCheckError ? (
        <Text style={styles.errorText}>{signupCheckError}</Text>
      ) : null}
    </View>
      <TouchableOpacity style={styles.footer} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </ScrollView>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // 상단 정렬로 변경
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: screenHeight,
  },
  header: {
    width: screenWidth,
    height: 60, // 상단 바의 높이 조절
    justifyContent: 'center', // 가운데 정렬
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    marginBottom: 10,
  },
  footer: {
    width: '95%',
    alignItems: 'center', // 버튼을 가로로 중앙에 정렬// 버튼을 화면 하단으로 밀어내기 위한 여백 추가
    backgroundColor: '#22a2f2', // 배경색 추가
    paddingVertical: 10, // 상하 여백 추가
    borderRadius: 10,  
  },
  checkBox: {
    marginTop:8,
    textAlign:'center',
    color: '#22A2F2',
  },
  headerText: {
    color: 'black', // 텍스트 색상 설정
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 30,
    fontSize: 30,
    color: '#000',
  },
  smalltitle: {
    marginLeft: 10,
    fontSize: 15,
    width: 100,
    color: '#000'
  },
  inputContainer: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1.5,
    borderColor: 'gray',
    paddingLeft: 10,
    marginRight: 10,
  },
  rounded: {
    borderRadius: 10,
  },
  image: {
    marginTop: 50,
    width: '100%',
    height: 200,
  },
  forgotPassword: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
  signupLink: {
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#000',
  },
  blueText: {
    color: 'blue',
  },
  checkContainer:{
    
    height:40,
    borderWidth:1,
    width:100,
    marginRight:10,
    borderColor: '#22A2F2',
    borderRadius: 7,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    marginRight:10,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptySpace: {
    width:screenWidth,
    marginTop:5,
    height:15,
    marginBottom:10,
  },
  signupCheck: {
    width:screenWidth,
    marginTop:200,
    height:15,
    marginBottom:10,
  }
});

export default Signup;