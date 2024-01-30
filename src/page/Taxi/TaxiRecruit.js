import React, { useState, useRef, useEffect ,useContext } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, TouchableWithoutFeedback, Keyboard, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from "../Style"
import {BottomButton, Header, ErrorText} from "../../components"
import ModalDropdown from "react-native-modal-dropdown";
import locationTypeToNumber from '../../components/TypeToNumber/LocationTypeToNumber';
import timeTypeToNumber from '../../components/TypeToNumber/TimeTypeToNumber';
import maxPersonTypeToNumber from '../../components/TypeToNumber/MaxPersonTypeToNumber';
import locationData from '../../constant/LocationData'
import maxPersons from '../../constant/MaxPersonDatas'
import times from '../../constant/TimeDatas'
import axios from 'axios';
import LocationModal from "../Modal/LocationModal";
import { getUserInfo, callApi} from '../../components/utils'
import {AuthContext} from '../../../App';

const TaxiRecruit = ({navigation, route}) => {
  const [startLocation, setStartLocation] = useState(route.params?.startCode === 0 ? 0 : route.params?.startCode || null);
  const [endLocation, setEndLocation] = useState(route.params?.endCode === 0 ? 0 : route.params?.endCode || null);
  const { logout } = useContext(AuthContext);
  const [selectedTime, setSelectedTime] = useState(null);
  const [maxPerson, setMaxPerson] = useState(route.params?.max || '');
  const [title, setTitle] = useState(route.params?.title || '');
  const [contents, setContents] = useState(route.params?.contents || '');
  const [error, setError] = useState('');
  const [tid, setDid] = useState(route.params?.tid || null);
  const headerTitle = tid ? "택시 모집 글 수정" : "택시 모집 글 작성";
  const buttonTitle = tid ? "모집 글 수정" : "모집 글 작성";
  const startLocationDropdownRef = useRef();
  const endLocationDropdownRef = useRef();
  const maxPersonDropdownRef = useRef();
  const timeDropDownRef = useRef();
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [startLocationText, setStartLocationText] = useState(route.params?.start || '');
  const [endLocationText, setEndLocationText] = useState(route.params?.end || '');

  // const toggleEndLocationDropdown = () => {
  //   endLocationDropdownRef.current.show();
  //   handleChange();
  // };
  // const toggleStartLocationDropdown = () => {
  //   startLocationDropdownRef.current.show();
  //   handleChange();
  // };

  // console.log("maxPerson :",maxPerson)
  // console.log("current :",route.params?.startCode === 0 ? 0 : route.params?.startCode || 999)

  const loadLocation = async () => {
    if(startLocation === null){
      try {
        // AsyncStorage에서 location 값을 불러와서 state에 설정합니다.
        const savedLocation = await AsyncStorage.getItem('location')
        if (savedLocation !== null) {
          setStartLocation(parseInt(savedLocation, 10))
        }
      } catch (error) {
          console.error('AsyncStorage에서 location을 불러오는 중 오류 발생:', error)
      }
    }
  }

  useEffect(() => {
    loadLocation()
    startLocationToText()
    endLocationToText()
  }, [startLocationText, startLocation, endLocationText, endLocation])

  const maxPersonDropdown = () => {
    maxPersonDropdownRef.current.show();
    handleChange();
  };
  const toggleTimeDropdown = () => {
    timeDropDownRef.current.show();
    handleChange();
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleChange = () =>{
    setError('');
  }

  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = (modalValue1, modalValue2) => {
    setModalVisible1(false);
    if (modalValue1 !== undefined && modalValue2 !== undefined) {
      // 모달에서 전달받은 두 값 처리
      setStartLocation(modalValue1);
      setStartLocationText(modalValue2);
       console.log('Location Modal Value 1:', modalValue1);
       console.log('Location Modal Value 2:', modalValue2);
    }
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = (modalValue1, modalValue2) => {
    setModalVisible2(false);
    if (modalValue1 !== undefined && modalValue2 !== undefined) {
      // 모달에서 전달받은 두 값 처리
      setEndLocation(modalValue1);
      setEndLocationText(modalValue2);
      //  console.log('Location Modal Value 1:', modalValue1);
      //  console.log('Location Modal Value 2:', modalValue2);
    }
  };
  const startLocationToText = () => {
    if(startLocation !== 0){
      const index = locationData.findIndex((item) => item.code === startLocation);
      const newText = locationData[index]?.name
      setStartLocationText(newText)
    }
  }
  const endLocationToText = () => {
    if(endLocation !== 0){
      const index = locationData.findIndex((item) => item.code === endLocation);
      const newText = locationData[index]?.name
      setEndLocationText(newText)
    }
  }

  const getDueDate = () =>{
    const currentDate = new Date();
    // 승목햄은 밑에꺼 주석
    currentDate.setHours(currentDate.getHours() + 9);
    const nHoursLater = new Date(currentDate.getTime() + selectedTime * 60 * 1000);

    const formattedDate = nHoursLater.toISOString().slice(0, 19).replace("T", " ");
    console.log(formattedDate);
    return formattedDate;
  }

  const handleTaxiRecruit = async () => {
    if (!title || !contents || !maxPerson || !startLocationText || !endLocationText || !selectedTime) {
      setError("모든 값을 입력해주세요.");
    }
    else {
      const userInfo = await getUserInfo();
      const dueDate = getDueDate();
      const apiEndpoint = tid ? `${API_URL}/taxi/update` : `${API_URL}/taxi/create`;
      const data = {
        tId: tid,
        student_id: userInfo,
        title: title,
        contents: contents,
        due: dueDate,
        start: startLocationText,
        startCode: startLocation,
        end: endLocationText,
        endCode: endLocation,
        current: route.params?.tid || 0,
        max: maxPerson,
      };
      try {
        const response = await callApi(apiEndpoint, 'post', data);
        console.log('>>> [taxiRecruit] ✅ SUCCESS', response.data);
        if (response.status === 200) {
          if (tid) {
            alert('택시 글 수정 완료');
          } else {
            alert('택시 글 작성 완료');
          }
          navigation.goBack();
        }
      } catch (error) {
        if (error.message === 'Session expired. Please login again.') {
          Alert.alert('세션에 만료되었습니다.')
				  logout();
        }
        else{
        console.log('>>> [taxiRecruit] 🤬 ERROR', error);
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title={headerTitle} onPressBack={() => navigation.pop()}/>
          <KeyboardAwareScrollView>
          <View style={[styles.recruitSection]}>
            <View style={styles.rowView}>
              <View style={[styles.flexView]}>
                <Text style={styles.text12}>마감시간</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={timeDropDownRef}
                      options={times}
                      onSelect={(index, value) => setSelectedTime(timeTypeToNumber(value))}
                      defaultValue={"선택하세요"}
                      isFullWidth={true}
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                      renderButtonText={(rowData) => (
                        <Text style={[styles.text11]}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleTimeDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
              </View>
              <View style={[styles.flexView, styles.marginLeft6]}>
                <Text style={styles.text12}>모집인원</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={maxPersonDropdownRef}
                      isFullWidth={true}
                      options={maxPersons}
                      onSelect={(index, value) => setMaxPerson(maxPersonTypeToNumber(value))}
                      defaultValue={"모집인원을 선택하세요"}
                      defaultIndex={maxPerson !== null ? maxPerson-1 : -1}
                      style={[styles.textAlignLeft, styles.marginLeft6, styles.defaultText11, {width: 140}]}
                      renderButtonText={(rowData) => (
                        <Text style={[styles.text11]}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={maxPersonDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>제목</Text>
              <TextInput style={[styles.recruitInput, styles.text11]} maxLength={50}
                placeholder="최대 50자까지 입력가능합니다."
                placeholderTextColor="#a0a0a0"
                value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                  onEndEditing={() => {
                    handleChange();
                  }}
              />
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>내용</Text>
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
              <Text style={styles.text12}>출발지</Text>
              <Pressable style={[styles.recruitInput, styles.rowView]} onPress={openModal1}>
                    {startLocationText?
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.text11]}>
                        {startLocationText}
                      </Text>
                      :
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}>
                        선택하세요
                      </Text>
                    }
                      {/* inputbox
                      <ModalDropdown
                        ref={locationDropdownRef}
                        options={locations}
                        onSelect={(index, value) => setSelectedLocation(locationTypeToNumber(value))}
                        defaultValue={"선택하세요"}
                        style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                        renderButtonText={(rowData) => (
                          <Text style={styles.text11}>{rowData}</Text>
                        )}
                      /> */}
                    {/* <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleLocationDropdown}> */}
                    <View style={[styles.recruitInputDropdown]} >
                      <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                    </View>
                  </Pressable>
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>도착지</Text>
              <Pressable style={[styles.recruitInput, styles.rowView]} onPress={openModal2}>
                    {endLocationText?
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.text11]}>
                        {endLocationText}
                      </Text>
                      :
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}>
                        선택하세요
                      </Text>
                    }
                      {/* inputbox
                      <ModalDropdown
                        ref={locationDropdownRef}
                        options={locations}
                        onSelect={(index, value) => setSelectedLocation(locationTypeToNumber(value))}
                        defaultValue={"선택하세요"}
                        style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                        renderButtonText={(rowData) => (
                          <Text style={styles.text11}>{rowData}</Text>
                        )}
                      /> */}
                    {/* <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleLocationDropdown}> */}
                    <View style={[styles.recruitInputDropdown]} >
                      <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                    </View>
                  </Pressable>
            </View>
          </View>
          </KeyboardAwareScrollView>
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton title={buttonTitle} onPress={handleTaxiRecruit}/>
      </View>
      </TouchableWithoutFeedback>
      <LocationModal isVisible={isModalVisible1} onClose={closeModal1} />  
      <LocationModal isVisible={isModalVisible2} onClose={closeModal2} />  
    </SafeAreaView>
  );
};


export default TaxiRecruit;
