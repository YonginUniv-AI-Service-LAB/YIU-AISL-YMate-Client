import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { getUserInfo} from './utils'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import LocationImage from './LocationImage'

//size: 0 -> smallCard 1 -> bigCard
const TaxiCard = ({size = 0, tId, state, title, due, startCode, endCode, current, max, studentId}) => {
    if (state === 'DELETED') {
        return null;
    }
    const navigation = useNavigation()
    const [now, setNow] = useState(moment.tz('Asia/Seoul'));

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment.tz('Asia/Seoul'));
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

    const handleTaxiCard = async () => {
        navigation.navigate('TaxiDetail', {tId, state})
    }

    return (
        size?
            <Pressable style={styles.bigCard} onPress={handleTaxiCard}>
                <LocationImage location={startCode}/>
                <View style={styles.flexView}>
                    <View style={styles.smallCardContent}>
                        <View name="taxi location" flexDirection="row">
                            <LocationTag location={startCode}/>
                            {
                                startCode === 0 && endCode === 0 ?
                                    null
                                    :
                                    <Image style={styles.icon17} resizeMode="cover" source={require("../assets/images/arrowRight.png")}/>
                            }
                            <LocationTag location={endCode}/>
                        </View>
                        <Text style={[styles.centerText10, styles.textAlignRight, dueStatusStyle]}>{dueStatusText}</Text>
                    </View>
                    <View style={styles.bigCardContent}>
                        <Text style={styles.cardTitle} numberOfLines={3}>{title}</Text>
                        <Text style={[styles.centerText10, styles.bigTaxiCardNumber]}>{current}/{max}</Text>
                    </View>
                </View>
            </Pressable>
            :
            <Pressable style={styles.smallCard} onPress={handleTaxiCard}>
                <LocationImage location={startCode}/>
                <View style={styles.smallCardContent}>
                    <View name="taxi location" flexDirection="row">
                        <LocationTag location={startCode}/>
                        {
                            startCode === 0 && endCode === 0 ?
                                null
                                :
                                <Image style={styles.icon17} resizeMode="cover" source={require("../assets/images/arrowRight.png")}/>
                        }
                        <LocationTag location={endCode}/>
                    </View>
                    <Text style={[styles.centerText10, styles.textAlignRight,  dueStatusStyle]}>{dueStatusText}</Text>
                </View>
                <View style={styles.smallCardContent}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.centerText10}>{current}/{max}</Text>
                </View>
            </Pressable>
   )
}

export default TaxiCard