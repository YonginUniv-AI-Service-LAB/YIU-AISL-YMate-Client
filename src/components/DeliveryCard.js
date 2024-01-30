import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { getUserInfo, getAccessTokenInfo } from './utils'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import axios from 'axios';
import FoodImage from './FoodImage'
// import foodImage from '../assets/images/food/foodImage'


//size: 0 -> smallCard 1 -> bigCard
const DeliveryCard = ({size = 0, dId, state, title, due, food, location, studentId}) => {
    if (state === 'DELETED') {
        return null;
    }

	const navigation = useNavigation()
    const [now, setNow] = useState(moment.tz('Asia/Seoul'));
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(prevNow => moment.tz('Asia/Seoul'))
        }, 60000)
        return () => clearInterval(interval)
    }, [])
    let dueDate = moment(due);
    let minutesDiff = moment.utc(dueDate).diff(moment.utc(now), 'minutes');
    let isPastDue = minutesDiff < 0 ? 1 : 0; 
    let dueStatusText;
    if (isPastDue || state === 'FINISHED') {
        dueStatusText = "마감";
    } else {
        if (minutesDiff < 60) {
            dueStatusText = `${minutesDiff}분 후 마감`;
        } else {
            let hoursDiff = Math.floor(minutesDiff / 60);
            dueStatusText = `${hoursDiff}시간 후 마감`;
        }
    }
    const dueStatusStyle = isPastDue || state === 'FINISHED' ? { color: 'red' } : {};

    const handleDeliveryCard = async () => {
        navigation.navigate('DeliveryDetail', {dId, state})
    }

    return (
        size?
            <Pressable style={styles.bigCard} onPress={handleDeliveryCard}>
                <FoodImage food={food}/>
                <View style={styles.flexView}>
                    <View style={styles.smallCardContent}>
                        <LocationTag location={location}/>
                        <Text style={[styles.centerText10, styles.textAlignRight,  dueStatusStyle]}>{dueStatusText}</Text>
                    </View>
                    <View style={styles.bigCardContent}>
                        <Text style={styles.cardTitle} numberOfLines={3}>{title}</Text>
                    </View>
                </View>
            </Pressable>
            :
            <Pressable style={styles.smallCard} onPress={handleDeliveryCard}>
                <FoodImage food={food}/>
                <View style={styles.smallCardContent}>
                    <LocationTag location={location}/>
                    <Text style={[styles.centerText10, styles.textAlignRight,  dueStatusStyle]}>{dueStatusText}</Text>
                </View>
                <View style={styles.smallCardContent}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
                </View>
            </Pressable>
	)
}

export default DeliveryCard
