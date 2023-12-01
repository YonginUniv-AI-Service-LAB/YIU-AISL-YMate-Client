import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, Alert } from "react-native";
import {styles} from "../page/Style"
import { useState } from "react";

// title: Header 제목
// isReport: 신고하기 버튼 활성화
// onPressBack: 뒤로가기 버튼 액션
// onPressReport: 신고하기 버튼 액션
const WriteButton = ({expandable = false, onPress = () => Alert.alert("작성버튼"), onPressDelivery = () => Alert.alert("배달작성버튼"), onPressTaxi = () => Alert.alert("택시작성버튼")}) => {
    const [writeState, setWriteState] = useState(0)

    const toggleExpand = (writeState) => {
        setWriteState(writeState? 0 : 1)
    }

    return (
        expandable ? 
            writeState?
                <View>
                    <Pressable style={styles.DeliveryWriteButton} onPress={onPressDelivery}>
                        <Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../assets/images/DeliveryWriteButton_blue.png")}/>
                    </Pressable>
                    <Pressable style={styles.TaxiWriteButton} onPress={onPressTaxi}>
                        <Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../assets/images/TaxiWriteButton_blue.png")}/>
                    </Pressable>
                    <Pressable style={styles.writeButton} onPress={()=> toggleExpand(writeState)}>
                        <Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../assets/images/writeButtonClose_blue.png")}/>
                    </Pressable>
                </View>
                :
                <Pressable style={styles.writeButton} onPress={()=> toggleExpand(writeState)}>
                    <Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../assets/images/writeButton_blue.png")}/>
                </Pressable>
            :
            // Default 확장불가 버튼
            <Pressable style={styles.writeButton} onPress={onPress}>
                <Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require("../assets/images/writeButton_blue.png")}/>
            </Pressable>
    )
}


export default WriteButton;