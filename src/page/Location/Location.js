import * as React from "react";
import { useState } from 'react';
import { Text, StyleSheet, Image, Pressable, View, Alert, ScrollView } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Style"
import {BottomButton, Header, ErrorText, ToggleButton} from "../../components"
import Alarm from "../Alarm/Alarm";

const Location = ({navigation}) => {
  const [locationCategory, setLocationCategory] = useState()


  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
        <Header title = "위치 설정" onPressBack={() => navigation.pop()}/>
        <View style={[styles.flexView, styles.rowView]}>
          <ScrollView style={styles.locationScroll}>
            <ToggleButton/>
            <ToggleButton/>
          </ScrollView>
          <ScrollView style={styles.locationScroll}>
            <ToggleButton/>
            <ToggleButton/>
          </ScrollView>
        </View>
        <ErrorText isError={true} style={styles.marginRight20}/>
        <BottomButton title="위치 설정" onPress={() => navigation.pop()}/>
      </View>
    </SafeAreaView>
  );
};


export default Location;
