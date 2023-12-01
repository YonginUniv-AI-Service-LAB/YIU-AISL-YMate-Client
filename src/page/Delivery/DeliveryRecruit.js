import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, Alert } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {styles} from "../Style"
import {Header} from "../../components"
import Alarm from "../Alarm/Alarm";

const DeliveryRecruit = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.mainBackground}>
          <Header title = "배달 모집 글 작성" onPressBack={() => navigation.pop()}/>

          <View style={[styles.recruitSection]}>
            <View style={styles.rowView}>
              <View style={[styles.flexView]}>
                <Text style={styles.text12}>마감시간</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
              </View>
              <View style={[styles.flexView, styles.marginLeft6]}>
                <Text style={styles.text12}>수령위치</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
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
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>음식</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>배달 링크 (선택)</Text>
              <View style={[styles.recruitInput]} />
            </View>
            <Text style={[styles.text11, styles.rightGrayText, styles.margintop9]}>
                {`배달 링크는 수락받은 신청자에게만 노출됩니다.
배달 앱의 함계 주문하기 링크를 입력해주세요.`}
            </Text>
            <View style={[styles.flexView]} />
            <Text style={[styles.errorText]}>
              입력되지 않은 정보가 있습니다.
            </Text>
          </View>
          <View style={[styles.bottomContainer]}>
            <Pressable style={styles.bottomButton} onPress={() => navigation.navigate('Delivery')}>
              <Text style={[styles.text16, styles.whiteText]}>모집 글 등록</Text>
            </Pressable>
          </View>
      </View>
    </SafeAreaView>
  );
};


export default DeliveryRecruit;
