import React, { useState } from "react";
import { Text, Image, Pressable, View, Alert } from "react-native";
import {styles} from "../page/Style"
import { useNavigation } from "@react-navigation/native";
import { getAccessTokenInfo } from "./utils";
import axios from 'axios';
import ReportModal from "../page/Modal/ReportModal"; 

const Header = ({ title = "default", isReport = false, toId,postId, postType, onPressBack, onPressReport }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReport = async (reportContent)=> {
    console.log(toId);
    console.log(reportContent);
    console.log(postType);
    console.log(postId);
    try {
        const accessTokenInfo = await getAccessTokenInfo();
        const response = await axios.post(`${API_URL}/report/create`,
        {
          toId: toId,
          contents: reportContent,
          type: postType,
          id: postId,
        }, {
          headers: {"Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${accessTokenInfo}`,
        },
          withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        });
        if (response.status === 200) {
            Alert.alert("신고 완료");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
            Alert.alert('이미 신고한 유저입니다.');
          }
        
        else{ 
            Alert.alert('삭제 되었거나 없는 유저입니다.');
        }
       console.log(error);
    }
  };

  return (
    <View style={styles.uppermenu}>
      <Pressable style={styles.locationButton} onPress={onPressBack}>
        <Image style={styles.icon20} resizeMode="cover" source={require("../assets/images/left.png")} />
      </Pressable>
      <Text style={[styles.text20]}>{title}</Text>
      {isReport ? (
        <Pressable style={styles.locationButton} onPress={toggleModal}>
          <Image source={require("../assets/images/reportbutton.png")} style={[styles.icon20]} resizeMode="cover" />
        </Pressable>
      ) : (
        <View style={[styles.icon20]} />
      )}
      <ReportModal isVisible={isModalVisible} onClose={toggleModal} onReport={handleReport} />
    </View>
  );
};

export default Header;
