import * as React from 'react'
import {Text, Pressable, View, Alert} from 'react-native'
import {styles} from '../page/Style'

//title: 하단 버튼 이름
//onPress: 버튼 클릭 액션
const BottomButton = ({title = 'default', onPress = () => Alert.alert('버튼')}) => {
	return (
		<View style={[styles.bottomContainer]}>
			<Pressable style={styles.bottomButton} onPress={onPress}>
				<Text style={[styles.text16, styles.whiteText]}>
					{title}
				</Text>
			</Pressable>
		</View>
	)
}

export default BottomButton
