import * as React from 'react'
import { useState, useEffect } from 'react'
import { Text, StyleSheet, Image, Pressable, View, Alert, ScrollView, AsyncStorage, TextInput } from "react-native";
import { Modal } from 'react-native'
import { styles } from "../Style"
import {BottomButton, Header, ErrorText, ToggleButton} from "../../components"
import foodData from '../../constant/FoodData'


const FoodModal = ({ isVisible, onClose }) => {
    const [food, setFood] = useState(10000001) // 최종 선택된 음식 값(int)
    const [foodCategory, setFoodCategory] = useState(10) // 음식 카테고리 값 10 ~ 13, 0
    const [categoryData, setCategoryData] = useState(
    [
        {
        code: 10,
        state: 1,
        category: '족발, 보쌈'
        },
        {
        code: 11,
        state: 0,
        category: '돈까스, 회, 일식'
        },
        {
        code: 12,
        state: 0,
        category: '고기, 구이'
        },
        {
        code: 13,
        state: 0,
        category: '피자'
        },
        {
        code: 14,
        state: 0,
        category: '찜, 탕, 찌개'
        },
        {
        code: 15,
        state: 0,
        category: '양식'
        },
        {
        code: 16,
        state: 0,
        category: '중식'
        },
        {
        code: 17,
        state: 0,
        category: '아시안'
        },
        {
        code: 18,
        state: 0,
        category: '치킨'
        },
        {
        code: 19,
        state: 0,
        category: '백반, 죽, 국수'
        },
        {
        code: 20,
        state: 0,
        category: '버거'
        },
        {
        code: 21,
        state: 0,
        category: '분식'
        },
        {
        code: 22,
        state: 0,
        category: '카페, 디저트'
        },
        {
        code: 0,
        state: 0,
        category: '직접 입력'
        }
    ]); // 카테고리 데이터 10 ~ 22, 0   state: 선택 상태
    const [selectedFoodData, setSelectedFoodData] = useState([
        { code: 10000001, state: 1, name: '족발' },
        { code: 10000002, state: 0, name: '족발&보쌈' },
        { code: 10000003, state: 0, name: '보쌈' },
    ]) // 선택된 카테고리의 위치 데이터
    const [inputState, setInputState] = useState(0) // 직접입력 상태
    const [inputText, setInputText] = useState('') // 입력 텍스트
    const [error, setError] = useState('') // 에러 텍스트

    useEffect(() => {
    }, [foodCategory, selectedFoodData])

    // 카테고리 토글버튼 액션: 하나의 카테고리만 선택하도록 함
    const foodCategoryHandler = (code) => {
        const newCategory = code;
        const prevIndex = categoryData.findIndex((item) => item.state === 1);
        const index = categoryData.findIndex((item) => item.code === code);

        if (code === 0){ // 직접 입력 선택 시
            setInputState(1)
        } else{
            setInputState(0)
        }

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
            setFoodCategory(newCategory);
            setCategoryData(updatedCategoryData);

            updateSelectedFoodData(newCategory)
        }    
    };

    const updateSelectedFoodData = (foodCategory) => {
        // 범위 내의 데이터만 선택하여 갱신
        if(foodCategory !== 0) {
            const lowerBound = foodCategory * 1000000;
            const upperBound = lowerBound + 999999;
    
            const filteredFoodData = foodData.filter((item) => {
                const codeValue = item.code;
                return codeValue >= lowerBound && codeValue <= upperBound;
            });
            filteredFoodData[0] = {
                ...filteredFoodData[0],
                state: 1
            }
            setFood(filteredFoodData[0].code)
            setSelectedFoodData(filteredFoodData);
        }
    }
    // 세부위치 토글버튼 액션: 하나의 위치만 선택하도록 함
    const foodHandler = (code) => {
        const newFood = code;
        const prevIndex = selectedFoodData.findIndex((item) => item.state === 1);
        const index = selectedFoodData.findIndex((item) => item.code === code);

        if (index !== -1 && prevIndex !== -1) {
            const updatedFoodData = [...selectedFoodData];
            updatedFoodData[prevIndex] = {
                ...updatedFoodData[prevIndex],
                state: 0
            };
            updatedFoodData[index] = {
                ...updatedFoodData[index],
                state: 1
            };
            setFood(newFood);
            setSelectedFoodData(updatedFoodData);
        }
    };
    // 히히 >@< 위치 설정 완료 액션
    const updateFood = () => {
        if(foodCategory === 0){
            if(!inputText){
                setError("음식을 입력해주세요.")
            } else {
                // console.log('foodCategory: ',foodCategory)
                // console.log('food: ',food)
                // console.log('inputText: ',inputText)
                onClose(0, inputText)
            }
        } else {
            // console.log('food: ',food)
            // console.log('inputText: ',inputText)
            onClose(food, '')
        }
    }

    const handleChange = () =>{
        setError('');
    }

    return (
        <Modal animationType='slide' visible={isVisible} onRequestClose={() => {onClose()}}>
            <Header title = "음식 선택" onPressBack={() => onClose(undefined, undefined)}/>
            <View style={[styles.flexView, styles.rowView]}>
                <ScrollView style={styles.locationScroll}>
                    {categoryData.map((item) => (
                        <ToggleButton
                            key={item.code}
                            text={item.category}
                            state={item.state}
                            onPress= {() => foodCategoryHandler(item.code)}
                        />
                    ))}
                </ScrollView>
                {inputState?
                    <View style={[styles.locationTextInputView]}>
                        <TextInput 
                            style={[styles.locationTextInput]} 
                            maxLength={20}
                            placeholder="음식을 직접 입력해주세요."
                            placeholderTextColor="#a0a0a0"
                            value={inputText}
                            onChangeText={(text) => {
                                setInputText(text);
                            }}
                            onEndEditing={() => {
                                handleChange();
                            }}
                        />
                    </View>
                    :
                    <ScrollView style={styles.locationScroll}>
                        {selectedFoodData.map((item) => (
                            <ToggleButton
                                key={item.code}
                                text={item.name}
                                state={item.state}
                                onPress= {() => foodHandler(item.code)}
                            />
                        ))}
                    </ScrollView>
                }
            </View>
            <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
            <BottomButton title="음식 선택" onPress={updateFood}/>
        </Modal>
    )
}

export default FoodModal