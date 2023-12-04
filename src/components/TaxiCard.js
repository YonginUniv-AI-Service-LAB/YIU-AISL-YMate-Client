import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'

//size: 0 -> smallCard 1 -> bigCard
const TaxiCard = ({size = 0, tId, title, due, startCode, endCode, current, max}) => {
	const navigation = useNavigation()
    const [now, setNow] = useState(moment.tz('Asia/Seoul'))

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment.tz('Asia/Seoul'))
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    let dueDate = moment(due);
    let isPastDue = now.isAfter(dueDate);
    let minutesDiff = Math.abs(moment.utc(dueDate).diff(moment.utc(now), 'minutes'))-540; 
    let dueStatusText;
    if (isPastDue) {
        dueStatusText = "마감";
    } else {
        if (minutesDiff < 60) {
            dueStatusText = `${minutesDiff}분 후 마감`;
        } else {
            let hoursDiff = Math.floor(minutesDiff / 60);
            dueStatusText = `${hoursDiff}시간 후 마감`;
        }
    }
    const dueStatusStyle = isPastDue ? { color: 'red' } : {};

    return (
        size?
            <Pressable style={styles.bigCard} onPress={()=>Alert.alert(`${tId}`)}>
                <Image style={styles.cardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${startCode}`}}/>
                <View style={styles.flexView}>
                    <View style={styles.smallCardContent}>
                        <View name="taxi location" flexDirection="row">
                            <LocationTag location={startCode}/>
                            <Image style={styles.icon17} resizeMode="cover" source={require("../assets/images/arrowRight.png")}/>
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
            <Pressable style={styles.smallCard} onPress={()=>Alert.alert(`${tId}`)}>
                <Image style={styles.cardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${startCode}`}}/>
                <View style={styles.smallCardContent}>
                    <View name="taxi location" flexDirection="row">
                        <LocationTag location={startCode}/>
                        <Image style={styles.icon17} resizeMode="cover" source={require("../assets/images/arrowRight.png")}/>
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
