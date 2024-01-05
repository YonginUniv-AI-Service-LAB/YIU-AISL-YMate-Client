import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, Pressable, View, Alert, ScrollView, AsyncStorage } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Style"
import {BottomButton, Header, ErrorText, ToggleButton} from "../../components"
import Alarm from "../Alarm/Alarm";

const Location = ({navigation}) => {
  const [location, setLocation] = useState(1)
  const [locationCategory, setLocationCategory] = useState(10)
  const [categoryData, setCategoryData] = useState(
    [
      {
        code: 10,
        state: 1,
        category: '용인대학교 내'
      },
      {
        code: 11,
        state: 0,
        category: '명지대학교 근처'
      },
      {
        code: 12,
        state: 0,
        category: '에버라인'
      },
      {
        code: 13,
        state: 0,
        category: '수인분당선'
      }
    ]  
  );

  useEffect(() => {
      // 컴포넌트가 마운트될 때 AsyncStorage에서 location을 로드합니다.
      loadLocation()
  }, [])
  
  const loadLocation = async () => {
    try {
        // AsyncStorage에서 location 값을 불러와서 state에 설정합니다.
        const savedLocation = await AsyncStorage.getItem('location')
        if (savedLocation !== null) {
            setLocation(parseInt(savedLocation, 10))
        }
    } catch (error) {
        console.error('AsyncStorage에서 location을 불러오는 중 오류 발생:', error)
    }
  }
  const locationCategoryHandler = (code) => {
    const newCategory = code;
    const prevIndex = categoryData.findIndex((item) => item.state === 1);
    const index = categoryData.findIndex((item) => item.code === code);
  
    if (index !== -1 && prevIndex !== -1) {
      const updatedCategoryData = [...categoryData];
      updatedCategoryData[index] = {
        ...updatedCategoryData[index],
        state: 1
      };
      updatedCategoryData[prevIndex] = {
        ...updatedCategoryData[prevIndex],
        state: 0
      };
  
      setLocationCategory(newCategory);
      setCategoryData(updatedCategoryData);
    }

  };
  // 히히 >@<
  const updateLocation = async () => {
    try {
    const newLocation = location
    await AsyncStorage.setItem('location', newLocation.toString())
    setLocation(newLocation)
    console.log(location)
    navigation.pop()
    } catch (error) {
    console.error('AsyncStorage에 location을 저장하는 중 오류 발생:', error)
    }
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
        <Header title = "위치 설정" onPressBack={() => navigation.pop()}/>
        <View style={[styles.flexView, styles.rowView]}>
          <ScrollView style={styles.locationScroll}>
            {categoryData.map((item) => (
              <ToggleButton
                key={item.code}
                text={item.category}
                state={item.state}
                onPress= {() => locationCategoryHandler(item.code)}
              />
            ))}
          </ScrollView>
          <ScrollView style={styles.locationScroll}>

          </ScrollView>
        </View>
        <ErrorText isError={true} style={styles.marginRight20}/>
        <BottomButton title="위치 설정" onPress={updateLocation}/>
      </View>
    </SafeAreaView>
  );
};


export default Location;
