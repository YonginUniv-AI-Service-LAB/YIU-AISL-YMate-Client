import * as React from 'react'
import {Image, Pressable, View, Alert, Text} from 'react-native'
import {styles} from '../page/Style'
import {useState} from 'react'
import { useNavigation , useFocusEffect} from "@react-navigation/native"

// expandable: 확장기능 활성화
// onPress: + 버튼 클릭 시 액션(확장기능 비활성화일때)
const ToggleButton = ({ text = "default", state = 0, onPress }) => {
	const navigation = useNavigation()

	return (
		state ?
			<Pressable style={[styles.toggleButtonActive]} onPress={onPress}>
				<Text style={styles.text13} numberOfLines={1}>
					{text}
				</Text>
			</Pressable>
			:
			<Pressable style={[styles.toggleButton]} onPress={onPress}>
				<Text style={styles.text13} numberOfLines={1}>
					{text}
				</Text>
			</Pressable>
	)

}

export default ToggleButton