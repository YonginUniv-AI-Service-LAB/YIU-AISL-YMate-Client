import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { symbol } from "prop-types";


const Notification = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

    const MyData = [
		{
			studentId: '201933008',
            nickname: '두글자',
		},
	]

    const MyPageCard = ({studentId, nickname}) => (
		<View style= {styles.myPageCard}>
            <View style={[styles.columnView,styles.marginLeft12]}>
                <Text style={styles.text20}>{nickname}</Text>
                <Text style={styles.text16}>{studentId}</Text>
            </View>
            <View>
            <Pressable style={[styles.buttonContainer,styles.marginRight12]} onPress={()=>Alert.alert("로그아웃")}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </Pressable>
            </View>
        </View>
	)

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<View style={styles.uppermenu}>
						<Pressable style={styles.locationButton} onPress={()=>Alert.alert("위치재설정버튼")}>
							<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/location.png")}/>
							<Text style={styles.locationText}>AI융합대학</Text>
							<Image style={[styles.icon16, styles.marginLeft3]} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
						</Pressable>
						<Pressable name="alramButton" onPress={()=>Alert.alert("알림버튼")}>
							<Image style={styles.icon26} resizeMode="cover" source={require("../../assets/images/notification.png")}/>
							<Image style={styles.activeAlramIcon} resizeMode="cover" source={require("../../assets/images/dot_red.png")}/>
						</Pressable>
					</View>
                    <View style={styles.myPageHeader}>
                        <View style={styles.icon26}></View>
                        <View style={styles.headerTitle}>
                            <Image style={styles.icon26} resizeMode="cover" source={require('./../../assets/images/user.png')}/>
                            <Text style={[styles.headerText, styles.marginLeft3]}>내 정보</Text>
                        </View>
                    </View>
                    <View style={styles.myPageBody}>
                        <View style={styles.myPageSection}>
                            <View>
                            <FlatList
                                data={MyData}
                                renderItem={({ item }) => <MyPageCard studentId={item.studentId} nickname={item.nickname}/>}
                                keyExtractor={item => item.tId}
                            />
                            </View>
                            <Pressable style = {styles.myPageOption} onPress={()=>navigation.navigate('MyPost')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>내가 작성한 글</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>닉네임 변경</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption} onPress={()=>navigation.navigate('Password')}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>비밀번호 변경</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable> 
                            <Pressable style = {styles.myPageOption}>
                                <View style={[styles.rowView, styles.spacebetween]}>
                                    <Text style={styles.text16}>서비스 정보</Text>
                                    <Image style={styles.icon20} resizeMode="cover" source={require("../../assets/images/right.png")}/>
                                </View>
                            </Pressable>     
                        </View>
                    </View>
					<View style={styles.navigationBar}>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Delivery')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/restaurant_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>배달</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Taxi')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/taxi_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>택시</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('Main')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/home_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>홈</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>navigation.navigate('MyPost')}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/list_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>내가 쓴 글</Text>
						</Pressable>
						<Pressable style={[styles.navigationButton]} onPress={()=>Alert.alert("내정보버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/user_white.png")}/>
							<Text style={[styles.centerText11, styles.margintop3]}>내 정보</Text>
						</Pressable>
					</View>
      			</View>
    		</SafeAreaView>
		</>);
};



export default Notification;
