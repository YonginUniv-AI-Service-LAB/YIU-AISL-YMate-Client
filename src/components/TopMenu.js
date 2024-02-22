import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import locationData from '../constant/LocationData'
import { callApi } from './utils'


//location: 위치 코드 -> int to string 구현해야함!
//activeAlarm: 활성 알림 있는지 여부
const TopMenu = () => {
	const navigation = useNavigation()
    const [location, setLocation] = useState(1000001)
    const [activeAlarm, setActiveAlarm] = useState(false)
    const [locationText, setLocationText] = useState('대학본부')
	const [AlarmData, setAlarmData] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 AsyncStorage에서 location을 로드합니다.
        loadLocation()
        // loadActiveAlarm()
        updateActiveAlarm()
        locationToText()
    }, [location, AlarmData, activeAlarm])

    const locationToText = () => {
        const index = locationData.findIndex((item) => item.code === location);
        const newText = locationData[index]?.name
        setLocationText(newText)
    }
    // useFocusEffect를 사용하여 화면 포커스가 변경될 때마다 호출됩니다.
    useFocusEffect(
        React.useCallback(() => {
            // 화면 포커스가 변경될 때마다 AsyncStorage에서 location을 로드합니다.
            loadLocation()
            // loadActiveAlarm()
            fetchData()
            updateActiveAlarm()
        }, [])
    )
    
    const fetchData = async () => {
        try {
            const response = await callApi(`${process.env.API_URL}/user/push`, 'get');
            const data = response.data;
            setAlarmData(data);
            // console.log('fetchAlarmData:', data)
        } catch (error) {
            if (error.message === 'Session expired. Please login again.') {
                Alert.alert('세션에 만료되었습니다.')
                logout();
            } else {
                console.error("데이터 가져오기 실패:", error);
            }
        }
    };

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
    
    // const loadActiveAlarm = async () => {
    //     try {
    //         // AsyncStorage에서 location 값을 불러와서 state에 설정합니다.
    //         const savedActiveAlarm = await AsyncStorage.getItem('activeAlarm')
    //         if (savedActiveAlarm !== null) {
    //             setActiveAlarm(parseInt(savedActiveAlarm, 10))
    //         }
    //     } catch (error) {
    //         console.error('AsyncStorage에서 activeAlarm을 불러오는 중 오류 발생:', error)
    //     }
    // }

    // const saveAlarmData = async () => {
    //     try {
    //         await AsyncStorage.setItem('AlarmData', JSON.stringify(AlarmData));
    //     } catch (error) {
    //         console.error('AsyncStorage에 AlarmData를 저장하는 중 오류 발생:', error)
    //     }
    // }

    // const loadAlarmData = async () => {
    //     try {
    //         await AsyncStorage.setItem('AlarmData', JSON.stringify(AlarmData));
    //     } catch (error) {
    //         console.error('AsyncStorage에 AlarmData를 저장하는 중 오류 발생:', error)
    //     }
    // }

    const updateActiveAlarm = async () => {
        try {
            const storedAlarmData = await AsyncStorage.getItem('alarmData');
            if (storedAlarmData) {
                const storedAlarmDataArray = JSON.parse(storedAlarmData);
			    // console.log('Alarm Data:', storedAlarmDataArray);
                const newAlarmData = AlarmData.map(alarm => alarm.pushId);
			    // console.log('newAlarmData:', newAlarmData);
                const inactivePushIds = newAlarmData.filter(pushId => !storedAlarmDataArray.includes(pushId));
                if (inactivePushIds.length > 0) {
                    setActiveAlarm(1);
                } else {
                    setActiveAlarm(0);
                }
            }
        } catch (error) {
            console.error('AsyncStorage에서 AlarmData를 불러오는 중 오류 발생:', error);
            console.log(error)
        }
    };

    return (
        <View style={styles.uppermenu}>
            {/* Location페이지 추가 후 수정해야함 */}
            <Pressable style={styles.locationButton} onPress={() => navigation.navigate('Location')}>
                <Image style={styles.icon24} resizeMode="cover" source={require("../assets/images/location.png")}/>
                <Text style={styles.locationText}>{locationText} </Text>
                <Image style={[styles.icon16, styles.marginLeft3]} resizeMode="cover" source={require("../assets/images/down_blue.png")}/>
            </Pressable>
            <Pressable name="alramButton" onPress={() => navigation.navigate('Alarm')}>
                <Image style={styles.icon26} resizeMode="cover" source={require("../assets/images/notification.png")}/>
                {activeAlarm?
                    //활성 알림있는 경우 -> 빨간점
                    <Image style={styles.activeAlramIcon} resizeMode="cover" source={require("../assets/images/dot_red.png")}/>
                    :
                    null
                }
            </Pressable>
        </View>
	)
}

export default TopMenu
