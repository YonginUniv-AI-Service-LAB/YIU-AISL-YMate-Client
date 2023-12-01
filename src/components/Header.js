import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, Alert } from "react-native";
import {styles} from "../page/Style"

// title: Header 제목
// isReport: 신고하기 버튼 활성화
// onPressBack: 뒤로가기 버튼 액션
// onPressReport: 신고하기 버튼 액션
const Header = ({title="default", isReport=false, onPressBack = () => Alert.alert('뒤로버튼'), onPressReport = () => Alert.alert('신고버튼') }) => {
    return (
        <View style={styles.uppermenu}>
          <Pressable style={styles.locationButton} onPress={onPressBack}>
              <Image
              style={styles.icon20}
              resizeMode="cover"
              source={require("../assets/images/left.png")}
              />
          </Pressable>
          <Text style={[styles.text20]}>
              {title}
          </Text>
          {isReport?
            <Pressable style={styles.locationButton} onPress={onPressReport}>
                <Image
                    source={require('../assets/images/reportbutton.png')} 
                    style={[styles.icon20]} resizeMode="cover"
                />
            </Pressable>
            :
            <View style={[styles.icon20]} />}
        </View>
    )
}


export default Header;