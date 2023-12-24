import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import { exp } from 'react-native/Libraries/Animated/Easing'

//size: 0 -> smallCard 1 -> bigCard
const NoticeCard = ({noticeId, title, contents, updatedAt}) => {
	const navigation = useNavigation()
    const [expandState, setExpandState] = useState(0)
    
    const toggleExpand = expandState => {
		setExpandState(expandState ? 0 : 1)
	}

    useFocusEffect(
        React.useCallback(() => {
            // 화면 포커스가 변경될 때마다 AsyncStorage에서 location을 로드합니다.
            setExpandState(0);
        }, [])
    );
    
    const upadatedText = moment(updatedAt).format('MM.DD')

    return (
        expandState?
            <Pressable key={noticeId} style={styles.smallNoticeCard} onPress={() => toggleExpand(expandState)}>
                <View style={styles.noticeCardTitle}>
                    <Text style={styles.noticeTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.centerText10}>{upadatedText}</Text>
                </View>
                <View style={styles.noticeCardContents}>
                    <Text style={styles.noticeTitle} >{contents}</Text>
                </View>
            </Pressable>
            :
            <Pressable key={noticeId} style={[styles.smallNoticeCard, styles.noticeCardTitle]} onPress={() => toggleExpand(expandState)}>
				<Text style={styles.noticeTitle} numberOfLines={1}>{title}</Text>
				<Text style={styles.centerText10}>{upadatedText}</Text>
		    </Pressable>
	)
}

export default NoticeCard
