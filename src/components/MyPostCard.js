import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import TaxiCard from './TaxiCard'
import DeliveryCard from './DeliveryCard'

//type: 0 -> delivery 1 -> taxi
//isComment: 0 -> 모집자 1 -> 신청자
const MyPostCard = ({type = 0, isComment = 0, Id, title, due, food, locationCode, startCode, endCode, current, max, createdAt, state}) => {
	const navigation = useNavigation()
    return (
        <Pressable style={styles.myPostContainer} onPress={() => Alert.alert(`${Id}`)}>
            <View style={styles.postType}>
                <View>
                    <Text style={styles.timeText}>{moment(createdAt).format('YYYY년 MM월 DD일 HH:mm')}</Text>
                </View>
                {type === 1 || type === 3 ?
                    <View style={styles.writeTypeRecruitContainer}>
                        <Text style={styles.writeTypeRecruit}>모집</Text>
                    </View>
                    :
                    <View style={styles.writeTypeApplyContainer}>
                        <Text style={styles.writeTypeApply}>신청</Text>
                    </View>
                }
            </View>
            {type === 3 || type === 4 ?
                <TaxiCard size={1} tId={Id} state={state} title={title} due={due} startCode={startCode} endCode={endCode} current={current} max={max}/>
                :
                <DeliveryCard size={1} dId={Id} state={state} title={title} due={due} food={food} location={locationCode}/>
            }
        </Pressable>
	)
}

export default MyPostCard
