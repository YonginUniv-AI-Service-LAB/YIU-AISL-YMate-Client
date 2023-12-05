import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'


//location: 위치 코드 (현재 임시로 10000000 부터 100000010 까지)
const LocationTag = ({location = null}) => {
    //추후 location으로 name을 받아올 예정 -> 색상만 지정
    const locationData = [
        {
            code: 10000001,
            name: '에융대',
            bgColor: '#D32F2F',
            fontColor: '#fff'
        },
        {
            code: 10000002,
            name: '진입로',
            bgColor: '#D81B60',
            fontColor: '#fff'
        },
        {
            code: 10000003,
            name: '진입로',
            bgColor: '#AB47BC',
            fontColor: '#fff'
        },
        {
            code: 10000004,
            name: '진입로',
            bgColor: '#7E57C2',
            fontColor: '#fff'
        },
        {
            code: 10000005,
            name: '진입로',
            bgColor: '#5C6BC0',
            fontColor: '#fff'
        },
        {
            code: 10000006,
            name: '진입로',
            bgColor: '#1976D2',
            fontColor: '#fff'
        },
        {
            code: 10000007,
            name: '진입로',
            bgColor: '#0277BD',
            fontColor: '#fff'
        },
        {
            code: 10000008,
            name: '진입로',
            bgColor: '#006064',
            fontColor: '#fff'
        },
        {
            code: 10000009,
            name: '진입로',
            bgColor: '#00796B',
            fontColor: '#fff'
        },
        {
            code: 100000010,
            name: '진입로',
            bgColor: '#2E7D32',
            fontColor: '#fff'
        },
    ]
    
    // location과 code가 일치하는 객체를 찾음
    const matchingLocation = locationData.find((loc) => loc.code === location);

    return (
        location?
            <View style={[styles.locationTag, { backgroundColor: matchingLocation.bgColor}]}>
                <Text style={[styles.centerText9, { color: matchingLocation.fontColor }]}>{matchingLocation.name}</Text>
            </View>
            :
            null
	)
}

export default LocationTag
