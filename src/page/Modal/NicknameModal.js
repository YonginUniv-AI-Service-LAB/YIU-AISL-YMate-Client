import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { styles } from '../Style';
import { ErrorText } from '../../components';
import axios from 'axios';
import { getAccessTokenInfo } from '../../components/utils';

const NicknameModal = ({ isVisible, onClose, onSave }) => {
    const [nickname, setNickname] = useState('');
    const [nickNameCheckError,setNickNameCheckError] = useState('');
    const [nickNameCheckSuccess,setNickNameCheckSuccess] = useState('');

    useEffect(() => {
        setNickname('');
        setNickNameCheckError('');
        setNickNameCheckSuccess('');
    }, [isVisible]);

    const handleNickNameChange = async() => {
        if(nickname === ''){
            Alert.alert('닉네임을 입력해주세요.')
        } else if(nickNameCheckError){
            Alert.alert('사용 가능한 닉네임을 입력해주세요');
        }
        else if(nickNameCheckSuccess){
            const accessTokenInfo = await getAccessTokenInfo();
		    const response = await axios.post(`${API_URL}/user/changenick`,
            {
                nickname: nickname,
              },
          {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [nickchange] ✅ SUCCESS', res.data);
            if (res.status === 200) {
                Alert.alert('닉네임이 변경되었습니다.');
                onSave();
            }
        }).catch((error) => {
            console.log('>>> [nickchange] 🤬 ERROR', error);
        });
        }else{
            Alert.alert('중복 검사를 해주세요.');
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleChange = () =>{
        setNickNameCheckError('');
        setNickNameCheckSuccess('');
    }

    const handleNickNameCheck = async() => {
        if (nickname.length < 2) {
            setNickNameCheckError('닉네임은 두 글자 이상이어야 합니다.');
            setNickNameCheckSuccess('');
          } else {
            const response = await axios.post(`${API_URL}/nickcheck`,
              { nickname: nickname },
              {
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
              }).then((res) => {
              console.log('>>> [nickcheck] ✅ SUCCESS', res.data);
              if (res.status===200) {
                setNickNameCheckError('');
                setNickNameCheckSuccess('사용 가능한 닉네임입니다.');
              }
            }).catch((error) => {
              if (error.response && error.response.status === 409) {
                // 중복된 닉네임인 경우
                setNickNameCheckError('중복된 닉네임입니다.');
              } 
              else{
                console.error('닉네임 전송 실패:', error);
                setNickNameCheckError('닉네임 전송에 실패했습니다. 다시 시도해주세요.');
              }
            });
      
          }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={[styles.modalTitle, styles.text20]}>닉네임 변경</Text>
                    <View style={{...styles.rowView}}>
                        <TextInput
                            style={[styles.recruitInput, styles.text11, {flex: 1}]}
                            value={nickname}
                            onChangeText={(text) => {
                                setNickname(text);
                            }}
                            onEndEditing={() => {
                                handleChange();
                            }}
                        />
                        <TouchableOpacity style={[styles.checkBox,styles.marginLeft12]} onPress={handleNickNameCheck} activeOpacity={0.7}>
                        <Text style={[styles.text11, styles.blueText]}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                        <ErrorText isError={nickNameCheckError} errorMessage={nickNameCheckError} isChecked={nickNameCheckSuccess} checkedMessage={nickNameCheckSuccess}/>
                    <View style={{...styles.rowView, marginTop: 20}}>
                    <Pressable style={[styles.redbuttonContainer]} onPress={onClose}>
                        <Text style={[styles.redText, styles.text13]}>취소</Text>
                    </Pressable>
                    <Pressable style={[styles.bluebuttonContainer, styles.marginLeft3]} onPress={handleNickNameChange}>
                        <Text style={styles.buttonText}>변경</Text>
                    </Pressable>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </Modal>
    );
};

export default NicknameModal;
