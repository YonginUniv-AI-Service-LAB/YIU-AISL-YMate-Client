import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import locationData from '../constant/LocationDataTemp'


//location: 위치 코드 (현재 임시로 10000000 부터 100000010 까지)
const LocationTag = ({location = null}) => {
    
    // location과 code가 일치하는 객체를 찾음
    const matchingLocation = locationData.find((loc) => loc.code === location);

    return (
        location?
            <View style={[styles.locationTag, { backgroundColor: matchingLocation.bgColor}]}>
                <Text style={[styles.centerText9, { color: matchingLocation.fontColor }]}>{matchingLocation.short}</Text>
            </View>
            :
            null
	)
}

export default LocationTag
