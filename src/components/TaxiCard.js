import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'

//size: 0 -> smallCard 1 -> bigCard
const TaxiCard = ({size = 0, tid, title, due, startCode, endCode, current, max, studentId}) => {
    const navigation = useNavigation()
    const [now, setNow] = useState(moment.tz('Asia/Seoul').add(9, 'hours'))

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment.tz('Asia/Seoul').add(9, 'hours'))
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    let dueDate = moment(due);
    let minutesDiff = moment.utc(dueDate).diff(moment.utc(now), 'minutes');
    let isPastDue = minutesDiff < 0 ? 1 : 0;
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

    const getUserInfo = async () => {
        try {
          const userString = await AsyncStorage.getItem('user');
          if (userString !== null) {
            const user = JSON.parse(userString);
            console.log('User Info:', user);
            // 여기서 user 변수에 로그인한 아이디가 들어있습니다.
            return user;
          } else {
            console.log('User Info not found');
          }
        } catch (error) {
          console.error('Error retrieving user info:', error);
        }
    };

    const handleTaxiCard = async () => {
        const userInfo = await getUserInfo(); // 예시: getUserInfo가 Promise를 반환하는 경우
        if (studentId === userInfo) {
            navigation.navigate('TaxiDetail', { condition: 1 });
        } else {
            navigation.navigate('TaxiDetail', { condition: 2 });
        }
    }

    return (
        size?
            <Pressable style={styles.bigCard} onPress={handleTaxiCard}>
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
            <Pressable style={styles.smallCard} onPress={handleTaxiCard}>
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