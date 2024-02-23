import React, { useState, useEffect,useContext } from 'react';
import { Modal, View, Text, TextInput, Pressable, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { styles } from '../Style';
import { ErrorText } from '../../components';
import axios from 'axios';
import { getAccessTokenInfo } from '../../components/utils';
import {AuthContext} from '../../../App';

const ServiceModal = ({ isVisible, onClose }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
          <TouchableWithoutFeedback>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={[styles.modalTitle, styles.text20]}>YMate 서비스 정보</Text>
                      <View style={{...styles.rowView}}>
                        <Text>
                            {'YMate는 함께 배달시키고, 함께 택시 탈 친구들을 찾을 수 있는 공간을 제공하는 앱입니다.\n'}
                            {'\n'}
                            {'YIU AI ServiceLab에서 제작하였습니다.\n'}
                            {'참고 자료:\n'}
                            {'아이콘:\n'}
                            <Text selectable={true} dataDetectorType={'link'} numberOfLines={1}>https://www.flaticon.com/free-icons/</Text>
                            {'\n음식 이미지 \n작가: \njcomp, schantalao, NADA COMPANY, wirestock  \n출처 Freepik\n'}
                            <Text selectable={true} dataDetectorType={'link'} numberOfLines={1}>https://kr.freepik.com/free-photo/</Text>
                        </Text>
                      </View>
                      <View style={{...styles.rowView, marginTop: 20}}>
                      <Pressable style={[styles.bluebuttonContainer, styles.marginLeft3]} onPress={onClose}>
                          <Text style={styles.buttonText}>확인</Text>
                      </Pressable>
                      </View>
                  </View>
              </View>
          </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ServiceModal;
