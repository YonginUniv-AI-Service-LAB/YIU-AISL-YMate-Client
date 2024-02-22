import React, { useState, useRef ,useContext } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { FontFamily, Color, Border, FontSize, Padding } from "../../assets/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "../Style"
import {Header, BottomButton, ErrorText} from "../../components"
import { callApi } from '../../components/utils'
import maxPersonTypeToNumber from '../../components/TypeToNumber/MaxPersonTypeToNumber';
import ModalDropdown from "react-native-modal-dropdown";
import maxPersons from '../../constant/MaxPersonDatas'
import axios from 'axios';
import {AuthContext} from '../../../App';

const TaxiRequest = ({navigation, route}) => {
  const { logout } = useContext(AuthContext);
  const [contents, setContents] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [applicantsPerson, setApplicantsPerson] = useState('');
  const { tid, max } = route.params;
  const applicantsPersonDropdownRef = useRef();
  const handleChange = () =>{
    setError('');
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const applicantsPersonDropdown = () => {
    applicantsPersonDropdownRef.current.show();
    handleChange();
  };
  const handleTaxiRequest = async () => {
    if (!contents || !details || !applicantsPerson) {
      setError("모든 값을 입력해주세요.");
    }
    else if (applicantsPerson > max) {
      setError("신청 인원은 모집 인원을 초과할 수 없습니다.");
    }
    else {
      const data = {
        tId: tid,
        contents: contents,
        details: details,
        number: applicantsPerson
      };
      try {
        const response = await callApi(`${process.env.API_URL}/taxi/apply`, 'post', data);
        console.log('>>> [taxiRequest] ✅ SUCCESS', response.data);
        if (response.status === 200) {
          alert('신청 글 작성 완료');
          navigation.goBack();
        }
      } catch (error) {
        if (error.message === 'Session expired. Please login again.') {
          Alert.alert('세션에 만료되었습니다.')
				  logout();
        }
        else if (error.response && error.response.status === 409) {
          // 이미 신청글이 있을 경우
          setError('이미 신청글이 존재합니다.');
        }
        else if(error.response && error.response.status === 404){
          setError('신청 인원을 확인해주세요.');
        }
        console.log('>>> [taxiRequest] 🤬 ERROR', error);
      }
    }
  }
  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title="택시 신청 작성" onPressBack={() => navigation.pop()}/>

          <View style={[styles.recruitSection]}>

            <View>
              <Text style={styles.text12}>탑승인원</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={applicantsPersonDropdownRef}
                      options={maxPersons}
                      isFullWidth={true}
                      onSelect={(index, value) => setApplicantsPerson(maxPersonTypeToNumber(value))}
                      defaultValue={"신청할 인원을 선택해주세요"}
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11, { width: 50}]}
                      renderButtonText={(rowData) => (
                        <Text style={styles.text11}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={applicantsPersonDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>제목</Text>
              <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                value={contents}
                onChangeText={(text) => {
                  setContents(text);
                }}
                onEndEditing={() => {
                  handleChange();
                }}
              />
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>내용</Text>
              <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                value={details}
                onChangeText={(text) => {
                  setDetails(text);
                }}
                onEndEditing={() => {
                  handleChange();
                }}
              />
            </View>
            <Text style={[styles.text11, styles.rightGrayText, styles.margintop9]}>
                {`신청 수락 전에는 제목만 노출됩니다.
                내용에는 연락수단을 입력하세요.`}
            </Text>
          </View>
          {/* onPress 추가 필요 */}
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton onPress={handleTaxiRequest} title="신청 등록"/>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default TaxiRequest;
