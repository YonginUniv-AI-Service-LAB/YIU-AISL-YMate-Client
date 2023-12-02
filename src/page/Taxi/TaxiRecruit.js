import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {styles} from "../Style"
import {BottomButton, Header, ErrorText} from "../../components"

const TaxiRecruit = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title="택시 모집 글 작성" onPressBack={() => navigation.pop()}/>

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
                <Text style={styles.text12}>최대인원</Text>
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
              <Text style={styles.text12}>출발지</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>도착지</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                  <View style={styles.flexView} />
                  <View style={[styles.recruitInputDropdown]}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
          </View>
          <ErrorText isError={true} style={styles.marginRight20}/>
          <BottomButton title="모집 글 등록" onPress={() => navigation.navigate('Taxi')}/>
      </View>
    </SafeAreaView>
  );
};


export default TaxiRecruit;
