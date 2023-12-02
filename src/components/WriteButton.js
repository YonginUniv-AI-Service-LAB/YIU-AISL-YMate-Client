import * as React from 'react'
import {Text, StyleSheet, Image, Pressable, View, Alert} from 'react-native'
import {styles} from '../page/Style'
import {useState} from 'react'

// expandable: 확장기능 활성화
// onPress: + 버튼 클릭 시 액션
// onPressDelivery: 배달 버튼 클릭 시 액션
// onPressTaxi: 택시 버튼 클릭 시 액션
const WriteButton = ({ expandable = false, onPress = () => Alert.alert('작성버튼'), onPressDelivery = () => Alert.alert('배달작성버튼'), onPressTaxi = () => Alert.alert('택시작성버튼')}) => {
	const [writeState, setWriteState] = useState(0)

	const toggleExpand = writeState => {
		setWriteState(writeState ? 0 : 1)
	}

	return expandable ? 
		// 확장기능 활성화 시
		writeState ?
			// 확장 상태
			<View>
				<Pressable style={styles.DeliveryWriteButton} onPress={onPressDelivery}>
					<Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require('../assets/images/DeliveryWriteButton_blue.png')}/>
				</Pressable>
				<Pressable style={styles.TaxiWriteButton} onPress={onPressTaxi}>
					<Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require('../assets/images/TaxiWriteButton_blue.png')}/>
				</Pressable>
				<Pressable style={styles.writeButton} onPress={() => toggleExpand(writeState)}>
					<Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require('../assets/images/writeButtonClose_blue.png')}/>
				</Pressable>
			</View>
		    :
			// 비확장 상태
			<Pressable
				style={styles.writeButton}
				onPress={() => toggleExpand(writeState)}>
				<Image
					style={[styles.icon50, styles.backgroundWhite]}
					resizeMode="cover"
					source={require('../assets/images/writeButton_blue.png')}
				/>
			</Pressable>
	    : 
		// 확장기능 비활성화
		<Pressable style={styles.writeButton} onPress={onPress}>
			<Image style={[styles.icon50, styles.backgroundWhite]} resizeMode="cover" source={require('../assets/images/writeButton_blue.png')} />
		</Pressable>
}

export default WriteButton