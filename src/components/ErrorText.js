import * as React from 'react'
import {Text, View} from 'react-native'
import {styles} from '../page/Style'

// isError: 에러 상태 입력
// errorMessage: 에러 상태 메시지
// isChecked: 확인 상태 입력
// checkedMessage: 확인 상태 메시지
const ErrorText = ({isError = false, errorMessage = "default error", isChecked = false, checkedMessage = 'default checked', style}) => {
	return (
		isError?
			//에러일 경우 -> 붉은 텍스트
			<Text style={[styles.errorText, style]}>
				{errorMessage}
			</Text>
		:
			//에러 아닐 경우
			isChecked?
				//확인 상태일 경우 -> 파란 텍스트
				<Text style={[styles.errorText, style]}>
					{checkedMessage}
				</Text>
				:
				//확인 상태 아닐 경우 -> 빈칸(상하 크기 있음)
				<View style={styles.errorBox}/>
	)
}

export default ErrorText

