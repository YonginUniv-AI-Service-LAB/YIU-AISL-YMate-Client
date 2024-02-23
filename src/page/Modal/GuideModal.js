// Modal.js

import React from 'react';
import { Modal, Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

const GuideModal = ({ isVisible, onClose }) => {
  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
    // handleGuideButtonPress를 onClose로 수정
            onClose();
        }}
        style={styles.modal}
      >
      <View style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={onClose}>
          <Text style = {styles.modalCloseText}>닫기</Text>
        </TouchableWithoutFeedback>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>이메일 인증 가이드</Text>
      </View>
      <View style={styles.modalBody}>
        <Text style={[styles.modalText,styles.impactText]}>
          학교 이메일이 처음이라면
        </Text>
        <Text style={styles.modalText}>
          입학과 동시에 이메일이 자동 생성되므로 아래의 페이지에서 비밀번호를 수정하고 사용하면 됩니다.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://o365.yongin.ac.kr/Pages/FindPwd.aspx')}
        >
          <Text style={styles.modalLinkText}>비밀번호 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalBody}>
        <Text style={[styles.modalText,styles.impactText]}>
          학교 이메일을 어디서 확인할 수 있나요?
        </Text>
        <Text style={styles.modalText}>
          학교 이메일로 Microsoft에서 로그인하면 Microsoft Outlook에서 이메일 확인이 가능합니다.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=20&ct=1706631053&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26culture%3dko-kr%26country%3dkr%26RpsCsrfState%3d578df019-db09-6ed7-5904-5f31c2621869&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c')}
        >
          <Text style={styles.modalLinkText}>이메일 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%', // 모달 너비 설정
    alignSelf: 'center', // 가운데 정렬
    marginTop: 22,
    marginHorizontal: 20,
  },
  modalCloseText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#22A2F2',
    marginBottom: 10,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#22A2F2',
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22A2F2',
  },
  modalBody: {
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalLinkText: {
    fontSize: 16,
    color: '#22A2F2',
    textDecorationLine: 'underline',
    marginTop:5,
  },
  impactText: {
    fontSize: 18, // 적절한 크기로 조절
    fontWeight: 'bold', // 굵게
    color: '#22A2F2', // 적절한 색상
    marginBottom: 10, // 텍스트 사이의 간격을 위해 마진 추가
  },
});

export default GuideModal;
