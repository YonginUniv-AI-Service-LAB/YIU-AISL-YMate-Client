import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, SectionList, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import { symbol } from "prop-types";
import { TopMenu } from "../../components";


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
            <Pressable style={[styles.buttonContainer,styles.marginRight12]} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.buttonText}>로그아웃</Text>
            </Pressable>
            </View>
        </View>
	)

  	return (
		<>
    		<View style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
                    <TopMenu/>
                    <View style={styles.myPageHeader}>
                        <View style={styles.icon26}></View>
                        <View style={styles.headerTitle}>
                            <Image style={styles.icon26} resizeMode="cover" source={require('./../../assets/images/user.png')}/>
                            <Text style={[styles.headerText, styles.marginLeft3]}>내 정보</Text>
                        </View>
						<View style={styles.icon26}></View>
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
      			</View>
    		</View>
		</>);
};



export default Notification;