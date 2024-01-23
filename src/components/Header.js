import * as React from "react";
import { Text, Image, Pressable, View, Alert } from "react-native";
import {styles} from "../page/Style"
import { useNavigation } from "@react-navigation/native";

// title: Header 제목
// isReport: 신고하기 버튼 활성화
// postId: 신고시 필요한 게시글ID
// postType: 게시글 타입 1-> 배달, 2-> 택시
const Header = ({title="default", isReport=false, postId, postType, onPressBack = useNavigation.pop()}) => {
    // const navigation = useNavigation()

    return (
        <View style={styles.uppermenu}>
            <Pressable style={styles.locationButton} onPress={onPressBack}>
                <Image style={styles.icon20} resizeMode="cover" source={require("../assets/images/left.png")}/>
            </Pressable>
            <Text style={[styles.text20]}>{title}</Text>
            {isReport?
                <Pressable style={styles.locationButton} onPress={() => Alert.alert(`Id: ${postId}, Type: ${postType}`)}>
                    <Image source={require('../assets/images/reportbutton.png')}  style={[styles.icon20]} resizeMode="cover"/>
                </Pressable>
            :
                <View style={[styles.icon20]}/>}
        </View>
    )
}


export default Header;