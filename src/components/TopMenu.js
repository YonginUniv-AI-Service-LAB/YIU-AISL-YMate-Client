import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation } from '@react-navigation/native'

//location: 위치 코드 -> int to string 구현해야함!
//activeAlarm: 활성 알림 있는지 여부
const TopMenu = () => {
	const navigation = useNavigation()
    const [location, setLocation] = useState(1)
    const [activeAlarm, setActiveAlarm] = useState(false)

    return (
        <View style={styles.uppermenu}>
            {/* Location페이지 추가 후 수정해야함 */}
            <Pressable style={styles.locationButton} onPress={() => locationUp()}>
                <Image style={styles.icon24} resizeMode="cover" source={require("../assets/images/location.png")}/>
                <Text style={styles.locationText}>AI융합대학{location}</Text>
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
