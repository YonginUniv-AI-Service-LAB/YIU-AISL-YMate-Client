import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"
import {TopMenu, WriteButton, MyPostCard} from '../../components'


const MyPost = ({navigation}) => {
	const [refreshing, setRefreshing] = React.useState(false)

	const MyPostData = [
		{
			type: 0,
			isComment: 0,
			dId: 123123123,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 332211,
			location: 10000001,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 1,
			dId: 123123124,
			title: "장충동 왕족발보쌈장충동 왕족발보쌈장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3321,
			location: 10000009,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 0,
			dId: 123123125,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 341211,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 1,
			dId: 123123126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 33123412211,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 1,
			dId: 12312312711,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 31234211,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 0,
			dId: 12312124124126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 331235678211,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 1,
			dId: 1212455233126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3367895678211,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 0,
			dId: 12543586226,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 33123123111,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 0,
			isComment: 1,
			dId: 1123458673126,
			title: "장충동 왕족발보쌈",
			due: new Date('2023-12-04T17:55:00'),
			food: 3376831,
			location: 10000002,
			createAt: new Date('2023-12-04T17:55:00'),
		},
		{
			type: 1,
			isComment: 0,
			tId: 123123616123,
			title: "집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000001,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 1,
			tId: 1231232431124,
			title: "집 가고싶다집 가고싶다집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000002,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 0,
			tId: 12312253125,
			title: "집 가고싶다",
			due: new Date('2023-12-04T17:55:00'),
			startCode: 10000003,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 1,
			tId: 12312613126,
			title: "집 가고싶다",
			due: new Date('2023-12-05T11:55:00'),
			startCode: 10000004,
			endCode: 10000003,
			current: 3,
			max: 4,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 0,
			tId: 123123123213127,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 1,
			tId: 123123123213218,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 0,
			tId: 123123321321129,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 0,
			tId: 123123312312130,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		},
		{
			type: 1,
			isComment: 1,
			tId: 123213123131,
			title: "집 가고싶다",
			due: new Date('2023-12-04T15:55:00'),
			startCode: 10000005,
			endCode: 10000003,
			current: 2,
			max: 7,
			createAt: 3322111,
		}
	]

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<TopMenu />
					<View style={styles.mainBody}>
						<View name="mypostSection" style={styles.mainSection}>
							<View style={styles.mainSectionTitle}>
								<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/list.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>내가 쓴 글</Text>
								</View>
								<Pressable style={styles.rowView} onPress={()=>Alert.alert("마감순")}>
									<Text style={styles.clickText13}>마감 가까운 순</Text>
									<Image style={styles.icon11} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
								</Pressable>
							</View>
							<FlatList
								contentContainerStyle={styles.mypostCardScroll}
								showsHorizontalScrollIndicator={false}
								data={MyPostData}
								renderItem={({ item }) => (
									<MyPostCard
										type={item.type}
										isComment={item.isComment}
										Id={item.type ? item.tId : item.dId}
										title={item.title}
										due={item.due}
										startCode={item.type ? item.startCode : undefined}
										endCode={item.type ? item.endCode : undefined}
										current={item.type ? item.current : undefined}
										max={item.type ? item.max : undefined}
										food={item.type ? undefined : item.food}
										location={item.type ? undefined : item.location}
									/>
								)}
								keyExtractor={item => item.type?item.tId : item.dId}
								refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => Alert.alert("새로고침")} />}
							/>
						</View>
					</View>
      			</View>
    		</SafeAreaView>
			<WriteButton expandable={true}/>
		</>);
};



export default MyPost;
