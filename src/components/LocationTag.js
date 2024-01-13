import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import locationData from '../constant/LocationData'


//location: 위치 코드 (현재 임시로 10000000 부터 100000010 까지)
const LocationTag = ({location = null}) => {
    
    // location과 code가 일치하는 객체를 찾음
    const index = locationData.findIndex((loc) => loc.code === location);
    const bgColor = locationData[index]?.bgColor
    const fontColor = locationData[index]?.fontColor
    const short = locationData[index]?.short

    return (
        location?
            <View style={[styles.locationTag, { backgroundColor: bgColor}]}>
                <Text style={[styles.centerText9, { color: fontColor }]}>{short}</Text>
            </View>
            :
            null
	)
}

export default LocationTag
