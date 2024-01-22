import React, { useState, useRef  } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {Header, BottomButton, ErrorText} from "../../components"
import { getAccessTokenInfo } from '../../components/utils'
import axios from 'axios';

const NoticeCreate = ({navigation}) => {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const handleChange = () =>{
    setError('');
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleNoticeCreate = async() => {
    if (!contents || !title) {
      setError("모든 값을 입력해주세요.");
    }
    else{
      const accessTokenInfo = await getAccessTokenInfo();
      const response = await axios.post(`${API_URL}/notice/create`,
          {
            contents: contents,
            title: title,
          }, {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [NoticeCreate] ✅ SUCCESS', res.data);
            if (res.status === 200) {
              Alert.alert('공지사항 글 작성 완료');
              navigation.goBack();
            }
        }).catch((error) => {
          console.log('>>> [NoticeCreate] 🤬 ERROR', error);
        });
      }
  }
  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title="공지사항 작성" onPressBack={() => navigation.pop()}/>

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
          <BottomButton onPress={handleNoticeCreate} title="공지사항 작성"/>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default NoticeCreate;
