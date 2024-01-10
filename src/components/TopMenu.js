import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import locationData from '../constant/LocationData'


//location: 위치 코드 -> int to string 구현해야함!
//activeAlarm: 활성 알림 있는지 여부
const TopMenu = () => {
	const navigation = useNavigation()
    const [location, setLocation] = useState(1000001)
    const [activeAlarm, setActiveAlarm] = useState(false)
    const [locationText, setLocationText] = useState('대학본부')

    useEffect(() => {
        // 컴포넌트가 마운트될 때 AsyncStorage에서 location을 로드합니다.
        loadLocation()
        loadActiveAlarm()
        locationToText()
    }, [location])

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
            loadActiveAlarm()
        }, [])
    )
    
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
    
    const loadActiveAlarm = async () => {
        try {
            // AsyncStorage에서 location 값을 불러와서 state에 설정합니다.
            const savedActiveAlarm = await AsyncStorage.getItem('activeAlarm')
            if (savedActiveAlarm !== null) {
                setActiveAlarm(parseInt(savedActiveAlarm, 10))
            }
        } catch (error) {
            console.error('AsyncStorage에서 activeAlarm을 불러오는 중 오류 발생:', error)
        }
    }
    
    //Location 변경용 임시 함수 (클릭할때마다 숫자 1씩 증가)
    const updateLocation = async () => {
        try {
        // location 값을 증가시키고 AsyncStorage에 저장합니다.
        const newLocation = location + 1
        await AsyncStorage.setItem('location', newLocation.toString())
        setLocation(newLocation)
        navigation.navigate('Location')
        } catch (error) {
        console.error('AsyncStorage에 location을 저장하는 중 오류 발생:', error)
        }
    }
    //activeAlarm 테스트용 함수 (클릭할때마다 활성화 비활성화 왔다갔다)
    const alarmTest = async () => {
        try {
            const newActiveAlarm = activeAlarm ? 0 : 1
            await AsyncStorage.setItem('activeAlarm', newActiveAlarm.toString())
            setActiveAlarm(newActiveAlarm)
            navigation.navigate('Alarm')
        } catch (error) {
        console.error('AsyncStorage에 activeAlarm을 저장하는 중 오류 발생:', error)
        }
    }

    return (
        <View style={styles.uppermenu}>
            {/* Location페이지 추가 후 수정해야함 */}
            <Pressable style={styles.locationButton} onPress={() => navigation.navigate('Location')}>
                <Image style={styles.icon24} resizeMode="cover" source={require("../assets/images/location.png")}/>
                <Text style={styles.locationText}>{locationText} </Text>
                <Image style={[styles.icon16, styles.marginLeft3]} resizeMode="cover" source={require("../assets/images/down_blue.png")}/>
            </Pressable>
            <Pressable name="alramButton" onPress={alarmTest}>
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
