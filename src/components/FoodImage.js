import * as React from 'react'
import {Text, Pressable, View, Alert, Image, AsyncStorage} from 'react-native'
import {styles} from '../page/Style'

const FoodImage = ({food}) => {
    const foodCategory = Math.floor(food / 1000000);
    const imagePaths = {
        '10': require('../assets/images/food/food10.jpg'),
        '11': require('../assets/images/food/food11.jpg'),
        '12': require('../assets/images/food/food12.jpg'),
        '13': require('../assets/images/food/food13.jpg'),
        '14': require('../assets/images/food/food14.jpg'),
        '15': require('../assets/images/food/food15.jpg'),
        '16': require('../assets/images/food/food16.jpg'),
        '17': require('../assets/images/food/food17.jpg'),
        '18': require('../assets/images/food/food18.jpg'),
        '19': require('../assets/images/food/food19.jpg'),
        '20': require('../assets/images/food/food20.jpg'),
        '21': require('../assets/images/food/food21.jpg'),
        '22': require('../assets/images/food/food22.jpg'),
        // 필요한 다른 카테고리에 대한 경로도 추가할 수 있습니다.
    };
    
      // foodCategory에 맞는 이미지를 가져옴
    const selectedImage = imagePaths[foodCategory];
    // console.log('selectedImage :', selectedImage)

    return (
        food
        ? <Image style={styles.cardImage} resizeMode="cover" source={selectedImage}/>
        : <Image style={styles.randomCardImage} resizeMode="cover" source={{ uri: `https://picsum.photos/300/200?random=${food}`}}/>
        // : <Image style={styles.randomCardImage}/>
    )
}

export default FoodImage
