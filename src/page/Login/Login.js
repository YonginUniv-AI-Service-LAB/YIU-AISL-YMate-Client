import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Signup from '../Signup/Signup';
import Main from '../Main/Main';
import Password from '../Password/Password';

const Login = ({ navigation }) => {
    const [studentId, setStudentId] = useState('');
  const [pwd, setpwd] = useState('');

  const handleLogin = () => {
    if (!studentId || !pwd) {
      alert('학번과 비밀번호를 모두 입력해주세요.');
        navigation.navigate('Main');
      return;
    }
    // const apiUrl = 'https://example.com/api/login';

    // try {
    //   // Send a POST request to the authentication endpoint
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       studentId,
    //       password: pwd,
    //     }),
    //   });
  
    //   // Check if the response is successful
    //   if (response.ok) {
    //     // Successful login
    //     alert('로그인 성공!');
    //     // You may want to navigate to another screen or perform other actions
    //   } else {
    //     // Handle failed login
    //     alert('로그인 실패. 올바른 학번과 비밀번호를 입력하세요.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('로그인 중 오류가 발생했습니다.');
    // }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Password');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image
        source = {require('../../assets/images/activAlram.png')}
        style={styles.image}
      />
      <Text style={styles.title}>YMATE</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>학번</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={studentId}
            onChangeText={(text) => setStudentId(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>비밀번호</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={pwd}
            onChangeText={(text) => setpwd(text)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={handleSignup} style={styles.signupLink}>
          <Text style={styles.signupText}>아직 회원이 아니신가요? <Text style={styles.blueText}>회원가입</Text></Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // 상단 정렬로 변경
    alignItems: 'center',
    backgroundColor: '#ffffff',
    
  },
  title: {
    marginBottom: 30,
    fontSize: 30,
    color: '#000',
  },
  smalltitle: {
    fontSize: 15,
    width: 60,
    color: '#000'
  },
  inputContainer: {
    width: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '50%',
    borderRadius: 10,
  },
  rounded: {
    borderRadius: 10,
  },
  image: {
    marginTop: 100,
    width: '90%',
    height: 110,
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

});

export default Login;