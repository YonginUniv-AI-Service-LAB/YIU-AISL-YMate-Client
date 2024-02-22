import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import { styles } from "../Style";
import axios from "axios";
import { Header, TopMenu } from "../../components";
import { getAccessTokenInfo } from "../../components/utils";
import { useFocusEffect } from "@react-navigation/native";
import moment from 'moment';

const Report = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [reportData, setReportData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // 화면이 focus되면 fetchData 함수 호출
    }, [])
  );

  const fetchData = async () => {
    try {
      const accessTokenInfo = await getAccessTokenInfo();
      const response = await axios.get(`${process.env.API_URL}/report`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessTokenInfo}`,
        },
        withCredentials: true,
      });

      // 가져온 데이터를 state에 저장
      setReportData(response.data);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.mainBackground}>
        <Header title="신고 글 조회" onPressBack={() => navigation.pop()} />
        
            <View style={[localStyles.tableRow, localStyles.headerRow]}>
              <Text style={[localStyles.tableCell, localStyles.headerCell]}>신고 당한 사람</Text>
              <Text style={[localStyles.tableCell, localStyles.headerCell]}>신고자</Text>
              <Text style={[localStyles.tableCell, localStyles.headerCell]}>신고 내용</Text>
              <Text style={[localStyles.tableCell, localStyles.headerCell]}>신고 날짜</Text>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
            {reportData.map((item) => (
              <View key={item.reportId} style={localStyles.tableRow}>
                <Text style={[localStyles.tableCell, localStyles.centeredCell]}>{item.toId}</Text>
                <Text style={[localStyles.tableCell, localStyles.centeredCell]}>{item.fromId}</Text>
                <Text style={[localStyles.tableCell, localStyles.centeredCell]}>{item.contents}</Text>
                <Text style={[localStyles.tableCell, localStyles.centeredCell]}>{moment(item.updatedAt).format('MM.DD')}</Text>
              </View>
            ))}
            </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Color.colorGray_100,
    padding: Padding.p_3xs,
  },
  headerRow: {
    backgroundColor: Color.colorGray_100,
  },
  tableCell: {
    flex: 1,
    padding: Padding.p_3xs,
    fontSize: FontSize.size_2xs,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    padding: Padding.p_3xs,
    fontSize: FontSize.size_2xs,
    textAlign: 'center',
  },
  centeredCell: {
    textAlign: "center",
  },
});

export default Report;
