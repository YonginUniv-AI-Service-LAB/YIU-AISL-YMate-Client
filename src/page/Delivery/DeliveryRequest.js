import React, { useState, useContext  } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {Header, BottomButton, ErrorText} from "../../components"
import { getAccessTokenInfo, callApi } from '../../components/utils'
import axios from 'axios';
import {AuthContext} from '../../../App';

const DeliveryRequest = ({navigation,route}) => {
  const [contents, setContents] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const { did } = route.params;
  const { logout } = useContext(AuthContext);
  const handleChange = () =>{
    setError('');
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handletDeliveryRequest = async() => {
    if (!contents || !details) {
      setError("모든 값을 입력해주세요.");
    }
    else{
      const data = {
        dId: did,
        contents: contents,
        details: details,
      };
      try {
        const response = await callApi(`${API_URL}/delivery/apply`, 'post', data);
        console.log('>>> [deliveryRequest] ✅ SUCCESS', response.data);
        if (response.status === 200) {
          alert('신청 글 작성 완료');
          navigation.goBack();
        }
      } catch(error) {
        if (error.message === 'Session expired. Please login again.') {
          Alert.alert('세션에 만료되었습니다.')
          logout();
        }
        else if (error.response && error.response.status === 409) {
          // 이미 신청글이 있을 경우
          setError('이미 신청글이 존재합니다.');
        }
          console.log('>>> [deliveryRequest] 🤬 ERROR', error);
        };
      }
  }
  return (
    <SafeAreaView style={styles.mainScreen}>
       <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title = '배달 신청 작성' onPressBack={() => navigation.pop()} />

          <View style={[styles.recruitSection]}>

            <View>
              <Text style={styles.text12}>제목</Text>
              <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                value={contents}
                onChangeText={(text) => {
                  setContents(text);
                }}
                onEndEditing={() => {
                  handleChange();
                }}
              />
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>내용</Text>
              <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                value={details}
                onChangeText={(text) => {
                  setDetails(text);
                }}
                onEndEditing={() => {
                  handleChange();
                }}
              />
            </View>
            <Text style={[styles.text11, styles.rightGrayText, styles.margintop9]}>
                {`신청 수락 전에는 제목만 노출됩니다.
                내용에는 연락수단을 입력하세요.`}
            </Text>
          </View>
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton title="신청 등록" onPress={handletDeliveryRequest}/>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default DeliveryRequest;
