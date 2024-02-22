import React, { useState, useRef, useContext  } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {Header, BottomButton, ErrorText} from "../../components"
import { getAccessTokenInfo,callApi} from '../../components/utils'
import axios from 'axios';
import {AuthContext} from '../../../App';

const NoticeCreate = ({navigation, route}) => {
  const { logout } = useContext(AuthContext);
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [noticeId, setNoticeid] = useState(route.params?.noticeId || null);
  const headerTitle = noticeId ? "공지사항 글 수정" : "공지사항 글 작성";
  const buttonTitle = noticeId ? "공지사항 글 수정" : "공지사항 글 작성";
  const correctMessage = noticeId ? "공지사항 글 수정 완료" : "공지사항 글 작성 완료";
  const handleChange = () =>{
    setError('');
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleNoticeCreate = async() => {
    if (!contents || !title) {
      setError("모든 값을 입력해주세요.");
    } else {
      const data = {
        noticeId: noticeId,
        contents: contents,
        title: title,
      };
      const apiEndpoint = noticeId ? `${process.env.API_URL}/notice/update` : `${process.env.API_URL}/notice/create`;
      try {
        const response = await callApi(apiEndpoint, 'post', data);
        console.log('>>> [NoticeCreate] ✅ SUCCESS', response.data);
        if (response.status === 200) {
          Alert.alert(correctMessage);
          navigation.goBack();
        }
      } catch (error) {
        if (error.message === 'Session expired. Please login again.') {
          Alert.alert('세션에 만료되었습니다.')
			    logout();
        } else {
          console.log('>>> [NoticeCreate] 🤬 ERROR', error);
        }
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title={headerTitle} onPressBack={() => navigation.pop()}/>

          <View style={[styles.recruitSection]}>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>제목</Text>
              <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
                onEndEditing={() => {
                  handleChange();
                }}
              />
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>내용</Text>
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
          </View>
          {/* onPress 추가 필요 */}
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton onPress={handleNoticeCreate} title={buttonTitle}/>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default NoticeCreate;
