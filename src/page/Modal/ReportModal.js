import React, { useState, useEffect } from "react";
import { Modal, Text, View, TextInput, Pressable, Alert,Keyboard,TouchableWithoutFeedback } from "react-native";
import { styles } from "../Style";

const ReportModal = ({ isVisible, onClose, onReport }) => {
  const [reportContent, setReportContent] = useState("");

  // 모달이 열릴 때마다 reportContent 초기화
  useEffect(() => {
    setReportContent("");
  }, [isVisible]);

  const handleReport = () => {
    if(reportContent === ''){
        Alert.alert('신고 내용을 입력해주세요.')
    }
    else{
        onReport(reportContent);
        onClose();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
          <Text style={[styles.modalTitle, styles.text20]}>신고 내용 작성</Text>
          <TextInput
            style={[styles.recruitInput, styles.recruitContent, styles.text11]}
            multiline
            textAlignVertical="top"
            placeholder="신고 내용을 작성해주세요."
            value={reportContent}
            onChangeText={(text) => setReportContent(text)}
          />
          <View style={[styles.marginTop6, styles.rowView]}>
            <>
            <Pressable style={[styles.bluebuttonContainer]} onPress={onClose}>
                <Text style={styles.buttonText}>취소</Text>
              </Pressable>
            <Pressable style={[styles.redbuttonContainer, styles.marginLeft3]} onPress={handleReport}>
                <Text style={[styles.redText, styles.text13]}>신고</Text>
              </Pressable>
            </>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReportModal;
