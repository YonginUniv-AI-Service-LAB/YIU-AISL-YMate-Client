import React, { useState, useRef  } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, TouchableWithoutFeedback, Keyboard, AsyncStorage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from "../Style"
import {BottomButton, Header, ErrorText} from "../../components"
import ModalDropdown from "react-native-modal-dropdown";
import locationTypeToNumber from '../../components/TypeToNumber/LocationTypeToNumber';
import timeTypeToNumber from '../../components/TypeToNumber/TimeTypeToNumber';
import maxPersonTypeToNumber from '../../components/TypeToNumber/MaxPersonTypeToNumber';
import locations from '../../constant/LocationDatas'
import maxPersons from '../../constant/MaxPersonDatas'
import times from '../../constant/TimeDatas'
import axios from 'axios';

const TaxiRecruit = ({navigation}) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [maxPerson, setMaxPerson] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [error, setError] = useState('');
  const startLocationDropdownRef = useRef();
  const endLocationDropdownRef = useRef();
  const maxPersonDropdownRef = useRef();
  const timeDropDownRef = useRef();

  const toggleEndLocationDropdown = () => {
    endLocationDropdownRef.current.show();
    handleChange();
  };
  const toggleStartLocationDropdown = () => {
    startLocationDropdownRef.current.show();
    handleChange();
  };
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
    console.log('dd');
  }

  const getUserInfo = async () => {
    try {
     const userString = await AsyncStorage.getItem('user');
        if (userString !== null) {
          const user = JSON.parse(userString);
          console.log('User Info:', user);
          // 여기서 user 변수에 로그인한 아이디가 들어있습니다.
          return user;
        } else {
          console.log('User Info not found');
        }
        } catch (error) {
          console.error('Error retrieving user info:', error);
        }
    };
  const getAccessTokenInfo = async () => {
      try {
       const accessToken = await AsyncStorage.getItem('accessToken');
          if (accessToken !== null) {
            console.log('AccessToken Info:', accessToken);
            // 여기서 user 변수에 로그인한 아이디가 들어있습니다.
            return accessToken;
          } else {
            console.log('AccessToken Info not found');
          }
          } catch (error) {
            console.error('Error retrieving AccessToken info:', error);
          }
  };

  const getDueDate = () =>{
    const currentDate = new Date();
    const nHoursLater = new Date(currentDate.getTime() + (selectedTime+9) * 60 * 60 * 1000);

    const formattedDate = nHoursLater.toISOString().slice(0, 19).replace("T", " ");
    console.log(formattedDate);
    return formattedDate;
  }

  const handletTaxiRecruit = async () => {
    if (!title || !contents || !maxPerson || !startLocation || !endLocation || !selectedTime) {
      setError("모든 값을 입력해주세요.");
    }
    else{
      const userInfo = await getUserInfo(); 
      const accessTokenInfo = await getAccessTokenInfo();
      const dueDate = getDueDate();
      const response = await axios.post("http://172.30.1.67:8080/taxi/create",
          {
            student_id: userInfo,
            title: title,
            contents: contents,
            due: dueDate,
            startCode: startLocation,
            endCode: endLocation,
            current: 4-maxPerson,
            max: 4,
          }, {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [taxiRecruit] ✅ SUCCESS', res.data);
            if (res.status === 200) {
              alert('택시 글 작성 완료');
              navigation.goBack();
            }
        }).catch((error) => {
          console.log('>>> [taxiRecruit] 🤬 ERROR', error);
          setError("AccessToken만료");
        });
       
    }
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title="택시 모집 글 작성" onPressBack={() => navigation.pop()}/>
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
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                      renderButtonText={(rowData) => (
                        <Text style={styles.text11}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleTimeDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
              </View>
              <View style={[styles.flexView, styles.marginLeft6]}>
                <Text style={styles.text12}>최대인원</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={maxPersonDropdownRef}
                      options={maxPersons}
                      onSelect={(index, value) => setMaxPerson(maxPersonTypeToNumber(value))}
                      defaultValue={"모집할 인원을 선택해주세요"}
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11, { width: 50}]}
                      renderButtonText={(rowData) => (
                        <Text style={styles.text11}>{rowData}</Text>
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
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={startLocationDropdownRef}
                      options={locations}
                      onSelect={(index, value) => setStartLocation(locationTypeToNumber(value))}
                      defaultValue={"선택하세요"}
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                      renderButtonText={(rowData) => (
                        <Text style={styles.text11}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleStartLocationDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
            <View style={[styles.margintop9]}>
              <Text style={styles.text12}>도착지</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                    {/* inputbox */}
                    <ModalDropdown
                      ref={endLocationDropdownRef}
                      options={locations}
                      onSelect={(index, value) => setEndLocation(locationTypeToNumber(value))}
                      defaultValue={"선택하세요"}
                      style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                      renderButtonText={(rowData) => (
                        <Text style={styles.text11}>{rowData}</Text>
                      )}
                    />
                  <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleEndLocationDropdown}>
                    <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                  </View>
                </View>
            </View>
          </View>
          </KeyboardAwareScrollView>
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton title="모집 글 등록" onPress={handletTaxiRecruit}/>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default TaxiRecruit;
