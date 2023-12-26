import * as React from 'react'
import {Image, Pressable, View, Alert, Text} from 'react-native'
import {styles} from '../page/Style'
import {useState} from 'react'
import { useNavigation , useFocusEffect} from "@react-navigation/native"

// expandable: 확장기능 활성화
// onPress: + 버튼 클릭 시 액션(확장기능 비활성화일때)
const ToggleButton = ({ text = "default" }) => {
	const navigation = useNavigation()
	const [state, setState] = useState(0)

	return (
		<Pressable style={[styles.toggleButton]}>
			<Text style={styles.text13} numberOfLines={1}>
				용인대학교
			</Text>
		</Pressable>
	)

}

export default ToggleButton