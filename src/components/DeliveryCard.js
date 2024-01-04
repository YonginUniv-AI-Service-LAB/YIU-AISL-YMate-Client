import * as React from 'react'
import {useState, useEffect} from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { getUserInfo, getAccessTokenInfo } from './utils'
import LocationTag from './LocationTag'
import moment from 'moment-timezone'
import axios from 'axios';


//size: 0 -> smallCard 1 -> bigCard
const DeliveryCard = ({size = 0, did, title, due, food, location, studentId}) => {
	const navigation = useNavigation()
    const [now, setNow] = useState(moment.tz('Asia/Seoul').add(9,'hour'))
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(prevNow => moment.tz('Asia/Seoul').add(9,'hour'))
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

    const handleDeliveryCard = async () => {
        const userInfo = await getUserInfo(); // 예시: getUserInfo가 Promise를 반환하는 경우
        const accessTokenInfo = await getAccessTokenInfo();
        console.log(did);
        const response = await axios.post("http://172.30.1.28:8080/delivery/detail",
          {
            dId : did,
          }, {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [deliverydetail] ✅ SUCCESS', res.data);
            if (res.status === 200) {
                const deliveryDetailData = {
                    deliveryData: res.data,
                    type: userInfo === res.data.studentId ? 1 : 2,
                  };
                // deliverydetail로 데이터를 전달하며 이동
                navigation.navigate('DeliveryDetail', { deliveryDetailData });
              }
        }).catch((error) => {
          console.log('>>> [deliverydetail] 🤬 ERROR', error);
          alert('삭제됐거나 존재하지 않는 글입니다.');
        });
    }

    return (
        size?
            <Pressable style={styles.bigCard} onPress={handleDeliveryCard}>
                <Image style={styles.cardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${food}`}}/>
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
                <Image style={styles.cardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${food}`}}/>
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
