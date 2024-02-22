import React, { useState, useContext} from "react";
import { Text, Image, Pressable, View, Alert } from "react-native";
import {styles} from "../page/Style"
import { useNavigation } from "@react-navigation/native";
import { callApi } from "./utils";
import axios from 'axios';
import ReportModal from "../page/Modal/ReportModal"; 
import { AuthContext } from "../../App";

const Header = ({ title = "default", isReport = false, toId,postId, postType, onPressBack, onPressReport }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReport = async (reportContent) => {
    try {
      const postData = {
        toId: toId,
        contents: reportContent,
        type: postType,
        id: postId,
      };
      const response = await callApi(`${process.env.API_URL}/report/create`, 'post', postData);
      if (response.status === 200) {
        Alert.alert("신고 완료");
      }
    } catch (error) {
      if (error.message === 'Session expired. Please login again.') {
        Alert.alert('세션에 만료되었습니다.')
        logout();
      } else if (error.response && error.response.status === 409) {
        Alert.alert('이미 신고한 유저입니다.');
      } else { 
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
