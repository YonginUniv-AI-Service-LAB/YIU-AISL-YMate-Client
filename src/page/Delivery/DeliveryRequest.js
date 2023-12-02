import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {Header, BottomButton, ErrorText} from "../../components"

const DeliveryRequest = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title = '배달 신청 작성' onPressBack={() => navigation.pop()} />

          <View style={[styles.recruitSection]}>

            <View>
              <Text style={styles.text12}>제목</Text>
              <View style={[styles.recruitInput]} />
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>내용</Text>
              <View style={[styles.recruitInput, styles.recruitContent]} />
            </View>
            <Text style={[styles.text11, styles.rightGrayText, styles.margintop9]}>
                {`신청 수락 전에는 제목만 노출됩니다.
                내용에는 연락수단을 입력하세요.`}
            </Text>
          </View>
          <ErrorText isError={true} style={styles.marginRight20}/>
          {/* onPress추가 필요 */}
          <BottomButton title="신청 등록"/>
      </View>
    </SafeAreaView>
  );
};


export default DeliveryRequest;
