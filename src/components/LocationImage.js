import * as React from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'

const LocationImage = ({location}) => {
    const locationCategory = Math.floor(location / 1000000);
    const imagePaths = {
        '10': require('../assets/images/location/location10.png'),
        '11': require('../assets/images/location/location11.png'),
        '12': require('../assets/images/location/location12.png'),
        '13': require('../assets/images/location/location13.png'),
        // 필요한 다른 카테고리에 대한 경로도 추가할 수 있습니다.
    };
    
      // foodCategory에 맞는 이미지를 가져옴
    const selectedImage = imagePaths[locationCategory];
    // console.log('selectedImage :', selectedImage)

    return (
        location
        ? <Image style={styles.cardImage} resizeMode="center" source={selectedImage}/>
        : <Image style={styles.randomCardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${location}`}}/>
        // : <Image style={styles.randomCardImage}/>
    )
}

export default LocationImage
