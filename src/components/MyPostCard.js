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
const MyPostCard = ({type = 0, isComment = 0, Id, title, due, food, location, startCode, endCode, current, max, createAt}) => {
	const navigation = useNavigation()
    
    return (
        <Pressable style={styles.myPostContainer} onPress={() => Alert.alert(`${Id}`)}>
            <View style={styles.postType}>
                <View>
                    <Text style={styles.timeText}>{moment(createAt).format('YYYY년 MM월 DD일 HH:mm')}</Text>
                </View>
                {isComment?
                    <View style= {styles.writeTypeRecruitContainer}>
                        <Text style={styles.writeTypeRecruit}>모집</Text>
                    </View>
                    :
                    <View style= {styles.writeTypeApplyContainer}>
                        <Text style={styles.writeTypeApply}>신청</Text>
                    </View>
                }
            </View>
            {type?
                <TaxiCard size={1} tId={Id} title={title} due={due} startCode={startCode} endCode={endCode} current={current} max={max}/>
                :
                <DeliveryCard size={1} dId={Id} title={title} due={due} food={food} location={location}/>
            }
        </Pressable>
	)
}

export default MyPostCard
