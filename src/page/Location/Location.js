import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, Pressable, View, Alert, ScrollView, AsyncStorage } from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Style"
import {BottomButton, Header, ErrorText, ToggleButton} from "../../components"
import Alarm from "../Alarm/Alarm";
import locationData from '../../constant/LocationData'
 
const Location = ({navigation}) => {
  const [location, setLocation] = useState(10000001) // 최종 선택된 위치 값(int)
  const [locationCategory, setLocationCategory] = useState(10) // 위치 카테고리 값 10 ~ 13
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
  ); // 카테고리 데이터 10 ~ 13, state: 선택 상태
  const [selectedLocationData, setSelectedLocationData] = useState([
    { code: 10000001, state: 1, name: '대학본부' },
    { code: 10000002, state: 0, name: '무도대학' },
    { code: 10000003, state: 0, name: '체육과학대학' },
    { code: 10000004, state: 0, name: '문화예술대학' },
    { code: 10000005, state: 0, name: '보건복지과학대학1동' },
    { code: 10000006, state: 0, name: '보건복지과학대학2동' },
    { code: 10000007, state: 0, name: 'AI융합대학' },
    { code: 10000008, state: 0, name: '학생군사교육단' },
    { code: 10000009, state: 0, name: '종합체육관' },
    { code: 10000010, state: 0, name: '중앙도서관' },
    { code: 10000011, state: 0, name: '생활관' },
    { code: 10000012, state: 0, name: '학생회관' },
    { code: 10000013, state: 0, name: '골프실기장' },
    { code: 10000014, state: 0, name: '종합운동장' },
    { code: 10000015, state: 0, name: '야외공연장' },
    { code: 10000016, state: 0, name: '글로벌사회공헌원' },
  ]) // 선택된 카테고리의 위치 데이터
  
  // 컴포넌트가 마운트될 때 AsyncStorage에서 location을 로드합니다.
  useEffect(() => {
    
  }, [locationCategory, selectedLocationData])
  
  // 카테고리 토글버튼 액션: 하나의 카테고리만 선택하도록 함
  const locationCategoryHandler = (code) => {
    const newCategory = code;
    const prevIndex = categoryData.findIndex((item) => item.state === 1);
    const index = categoryData.findIndex((item) => item.code === code);
  
    if (index !== -1 && prevIndex !== -1) {
      const updatedCategoryData = [...categoryData];
      updatedCategoryData[prevIndex] = {
        ...updatedCategoryData[prevIndex],
        state: 0
      };
      updatedCategoryData[index] = {
        ...updatedCategoryData[index],
        state: 1
      };
      setLocationCategory(newCategory);
      setCategoryData(updatedCategoryData);

      updateSelectedLocationData(newCategory)
    }    
  };
    
  const updateSelectedLocationData = (locationCategory) => {
    // 범위 내의 데이터만 선택하여 갱신
    const lowerBound = locationCategory * 1000000;
    const upperBound = lowerBound + 999999;

    const filteredLocationData = locationData.filter((item) => {
      const codeValue = item.code;
      return codeValue >= lowerBound && codeValue <= upperBound;
    });
    filteredLocationData[0] = {
      ...filteredLocationData[0],
      state: 1
    }
    
    setLocation(filteredLocationData[0].code)
    setSelectedLocationData(filteredLocationData);
  }
  // 세부위치 토글버튼 액션: 하나의 위치만 선택하도록 함
  const locationHandler = (code) => {
    const newLocation = code;
    const prevIndex = selectedLocationData.findIndex((item) => item.state === 1);
    const index = selectedLocationData.findIndex((item) => item.code === code);
  
    if (index !== -1 && prevIndex !== -1) {
      const updatedLocationData = [...selectedLocationData];
      updatedLocationData[prevIndex] = {
        ...updatedLocationData[prevIndex],
        state: 0
      };
      updatedLocationData[index] = {
        ...updatedLocationData[index],
        state: 1
      };
      setLocation(newLocation);
      setSelectedLocationData(updatedLocationData);
    }

  };
  // 히히 >@< 위치 설정 완료 액션
  const updateLocation = async () => {
    try {
      const newLocation = location
      await AsyncStorage.setItem('location', newLocation.toString())
      setLocation(newLocation)
      // console.log(location)
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
            {selectedLocationData.map((item) => (
                <ToggleButton
                  key={item.code}
                  text={item.name}
                  state={item.state}
                  onPress= {() => locationHandler(item.code)}
                />
              ))}
          </ScrollView>
        </View>
        <BottomButton title="위치 설정" onPress={updateLocation}/>
      </View>
    </SafeAreaView>
  );
};

export default Location;
