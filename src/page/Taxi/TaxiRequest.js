import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {BottomButton, Header, ErrorText} from "../../components"

const TaxiRequest = ({navigation}) => {
  const handleTaxiRequest = async () => {
  }
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title="택시 신청 작성" onPressBack={() => navigation.pop()}/>

          <View style={[styles.recruitSection]}>

            <View>
              <Text style={styles.text12}>탑승인원</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
            <View style={[styles.margintop9]}>
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
          {/* onPress 추가 필요 */}
          <ErrorText isError={true} style={styles.marginRight20}/>
          <BottomButton onPress={handleTaxiRequest} title="신청 등록"/>
      </View>
    </SafeAreaView>
  );
};


export default TaxiRequest;
