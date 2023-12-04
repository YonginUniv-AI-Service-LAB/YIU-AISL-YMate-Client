import { StyleSheet } from "react-native";
import { Color, Padding, FontSize, FontFamily, Border } from "../assets/GlobalStyles";

export const styles = StyleSheet.create({
    smallCardScroll: {
            paddingHorizontal: 5,
            paddingVertical: 10
    },
    bigCardScroll: {
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    mypostCardScroll: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        backgroundColor: "#f2f2f2"
    },
    icon26: {
            width: 26,
            height: 26
    },
    smallCardContent: {
            marginTop: 4,
            paddingHorizontal: 5,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch"
    },
    cardStatusContainer:{
        marginTop: 4,
        paddingHorizontal: 5,
    },
    bigTaxiCardNumber: {
        alignSelf:"stretch", 
        textAlignVertical:"bottom"
    },
    flexView: {
        flex:1,
        alignSelf: "stretch"
    },
    myPageBody: {
        flex:1,
        width: "100%",
        alignSelf: "stretch",
        backgroundColor: "#fff"
    },
    bigCardContent: {
            marginVertical: 4,
            paddingHorizontal: 5,
            paddingBottom: 5,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            alignSelf: "stretch"
    },
    locationTag: {
            backgroundColor: "#86e08f",
            borderRadius: 6,
            height: 17,
            paddingHorizontal: 4,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
    },
    cardTitle: {
            flex: 1,
            color: "#000",
            fontFamily: "ABeeZee-Regular",
            fontSize: 14,
            alignItems: "center",
            overflow: "hidden"
    },
    centerText11: {
            color: "#000",
            textAlign: "center",
            fontSize: 11,
            fontFamily: "ABeeZee-Regular"
    },
    centerText20: {
        color: "#000",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "ABeeZee-Regular"
    },
    centerText9: {
            fontSize: 9,
            textAlign: "center",
            color: "#000",
            fontFamily: "ABeeZee-Regular"
    },
    centerText10: {
        fontSize: 10,
        textAlign: "center",
        color: "#000",
        fontFamily: "ABeeZee-Regular"
    },
    centerText18: {
        fontSize: 18,
        textAlign: "center",
        color: "#000",
        fontFamily: "ABeeZee-Regular"
    },
    text13: {
        fontSize: 13,
        fontFamily: "ABeeZee-Regular"
    },
    text12: {
        fontSize: 12,
        color: "#000",
        fontFamily: "ABeeZee-Regular"
    },
    text15: {
        fontSize: 15,
        color: "#000",
        fontFamily: "ABeeZee-Regular"
    },
    text10: {
        fontSize: 10,
        color: "#000",
        fontFamily: "ABeeZee-Regular"
    },
    flex025: {
        flex: 0.25,
    },
    flex075: {
        fles:0.75,
    },
    noticeTitle: {
        fontSize: 11,
        color: "#000",
        fontFamily: "ABeeZee-Regular",
        overflow: "hidden",
        flex: 1,
        marginRight: 10
    },
    smallNoticeCard: {
            borderWidth: 1,
            padding: 10,
            alignItems: "center",
            flexDirection: "row",
            overflow: "hidden",
            marginTop: 5,
            marginHorizontal: 5,
            justifyContent: "space-between",
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderStyle: "solid",
            alignSelf: "stretch"
    },
    navigationButton: {
            marginHorizontal: 8,
            height: 47,
            width: 45,
            alignItems: "center",
            overflow: "hidden"
    },
    icon24: {
            width: 24,
            height: 24
    },
    text20: {
        fontSize: 20,
        color: Color.colorBlack,
    },
    text16: {
        fontSize: 16,
        color: Color.colorBlack,
    },
    text12: {
        fontSize: 12,
        color: Color.colorBlack,
    },
    text11: {
        fontSize: 11,
        color: Color.colorBlack,
    },
    whiteText: {
        color: Color.colorWhite,
    },
    blueText: {
        color: Color.colorCornflowerblue,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    checkBox: {
        borderColor: Color.colorCornflowerblue,
        height:24,
        borderWidth:1,
        borderRadius:6,
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.4,
    },
    rightGrayText: {
        textAlign: "right",
        color: "rgba(0, 0, 0, 0.5)"
    },
    rightRedText: {
        textAlign: "right",
        fontSize: 11,
        color: "#E14A4A"
    },
    errorText: {
        textAlign: "right",
        color: "#e14a4a"
    },
    locationText: {
            marginLeft: 3,
            textAlign: "center",
            fontFamily: "ABeeZee-RegularW",
            fontSize: 14,
            color: "#000"
    },
    locationButton: {
            flexDirection: "row",
            alignItems: "center"
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center"
    },
    centerJustify: {
        justifyContent:'center',
    },  
    spacebetween: {
        justifyContent: "space-between",
    },
    columnView: {
        flex:1,
        flexDirection:'column',
    },
    mainLogo: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    center: {
        alignItems:'center',
    },
    activeAlramIcon: {
            top: 1,
            left: 21,
            width: 6,
            height: 6,
            position: "absolute"
    },
    alrambutton: {
            overflow: "hidden"
    },
    uppermenu: {
            backgroundColor: "#fff",
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            elevation: 4,
            shadowOpacity: 1,
            borderBottomWidth: 1,
            height: 51,
            paddingHorizontal: 14,
            justifyContent: "space-between",
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderStyle: "solid",
            overflow: "hidden",
            alignSelf: "stretch"
    },
    advertiseImage: {
            maxWidth: "100%",
            height: 75,
            overflow: "hidden",
            alignSelf: "stretch",
            width: "100%"
    },
    marginLeft3: {
            marginLeft: 3
    },
 marginLeft6: {
         marginLeft: 6
},
marginLeft12: {
        marginLeft: 12
},
marginRight12: {
         marginRight: 12
},
    clickText13: {
            fontSize: 13,
            color: "#22a2f2",
            textAlign: "center",
            fontFamily: "ABeeZee-Regular"
    },
    icon11: {
            width: 11,
            height: 11
    },
    icon20: {
        width: 20,
        height: 20
        },
     icon100: {
        width: 100,
        height: 100
    },
    tempViewToImage: {
            borderRadius: 11,
            backgroundColor: "#F9E583",
            width: 170,
            height: 96,
            alignSelf: "stretch"
    },
    smallCard: {
            marginLeft: 10,
            height: 150,
            width: 170,
            alignItems: "center"
    },
    myPageCard: {
        flexDirection: "row",
        height: 78,
        alignSelf: "stretch",
        alignItems: "center",
        borderBottomColor: Color.colorGray_100,
        borderBottomWidth:1,
    },
    bigCard: {
            marginTop: 10,
            flexDirection: "row",
            height: 96,
            alignSelf: "stretch",
            alignItems: "center"
    },
    padding10: {
        paddingHorizontal: 10,
    },
    mainSectionList: {
            height: 170,
            alignSelf: "stretch"
    },
    notificationSectionList: {
        height: '100%',
    },
    recruiterSectionList: {
        height: '100%',
        paddingHorizontal: 5,
    },
    mainSectionTitle: {
            paddingHorizontal: 15,
            paddingBottom: 6,
            borderColor: "rgba(0, 0, 0, 0.3)",
            borderBottomWidth: 1,
            alignItems: "center",
            alignSelf: "stretch",
            justifyContent: "space-between",
            flexDirection: "row",
            overflow: "hidden"
    },
    mainSection: {
            marginTop: 7,
            paddingTop: 10,
            justifyContent: "center",
            overflow: "hidden",
            alignSelf: "stretch",
            backgroundColor: "#fff",
            flex: 1
    },
    recruitSection: {
            paddingTop: 11,
            paddingHorizontal: 15,
            overflow: "hidden",
            alignSelf: "stretch",
            backgroundColor: "#fff",
            alignItems:'center',
    },
    loginSection: {
        width: '80%',
        paddingTop: 11,
        paddingHorizontal: 15,
        overflow: "hidden",
        alignSelf: "stretch",
        backgroundColor: "#fff",
        alignItems:'center',
        flex: 1
    },
    loginInput: {
        height: 40,
        alignSelf: "stretch",
        overflow: "hidden",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderStyle: "solid",
        justifyContent: "center",
        alignItems: "center",
        flex:1,
    },
    recruitInput: {
        height: 33,
        alignSelf: "stretch",
        overflow: "hidden",
        marginTop: 3,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderStyle: "solid",
        justifyContent: "center",
        alignItems: "center",
    },
    recruitContent: {
        height: 66
    },
    recruitInputDropdown: {
        borderLeftWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderStyle: "solid",
        alignSelf: "stretch",
        overflow: "hidden",
    },
    myPageSection: {
        marginTop: 7,
        paddingTop: 10,
        justifyContent: "center",
        overflow: "hidden",
        alignSelf: "stretch",
        backgroundColor: "#fff",
    },
    icon17: {
            width: 17,
            height: 17
    },
    icon16: {
            width: 16,
            height: 16
    },
    mainBody: {
            backgroundColor: "#f2f2f2",
            width: "100%",
            alignSelf: "stretch",
            flexDirection: "row",
            flex: 1
    },
    icon30: {
            width: 30,
            height: 30
    },
    margintop3: {
            marginTop: 3
    },
    margintop6: {
        marginTop: 6
    },
    margintop9: {
        marginTop: 9
    },
    margintop11: {
        marginTop: 11
    },
    opacity70: {
            opacity: 0.7
    },
    
    boxShadow:{
        elevation: 4,
        // iOS에서는 shadow 속성을 사용하여 그림자를 추가할 수 있습니다.
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    navigationBar: {
            backgroundColor: "#22a2f2",
            paddingHorizontal: 10,
            paddingVertical: 10,
        //     paddingBottom: 23,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "stretch"
    },
    bottomContainer: {
        // height: 80,
        backgroundColor: "#fff",
        paddingBottom: 14,
        paddingHorizontal: 25,
},
bottomButton: {
        marginTop: 11,
        backgroundColor: "#22a2f2",
        height: 45,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    loginButton: {
        width: '55%',
        marginTop: 11,
        backgroundColor: "#22a2f2",
        height: 24,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    mainBackground: {
            flex: 1
    },
    icon50: {
            width: 50,
            height: 50
    },
    writeButton: {
            right: 15,
            bottom: 15,
            position: "absolute"
    },
    backgroundWhite: {
            backgroundColor: "#fff",
            borderWidth: 0,
            borderRadius: 25
    },
    mainScreen: {
            flex: 1,
    },
    notificationHeader: {
        flexDirection: "row",
        height: 40,  
        alignItems: 'center',
        borderBottomColor: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    myPageHeader: {
        flexDirection: "row",
        height: 43,  
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 4,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    headerTitle: {
        flexDirection: "row",
        textAlign: 'center',  
    },
    headerText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    myPostContainer:{
        marginTop: 10,
        backgroundColor:'#fff',
        borderColor:Color.colorGray_100,
        borderRadius:11,
        borderWidth:0.5,
    },
    myPostCard:{
        flexDirection: "row",
        height: 96,
        alignSelf: "stretch",
        alignItems: "center"
    },
    timeText: {
        fontFamily: FontFamily.aBeeZeeRegular,
        fontSize: FontSize.size_3xs,
        color: Color.colorBlack,
    },
    postType:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        borderColor:Color.colorGray_100,
        borderRadius:5,
        borderWidth:0.5,
    },
    writeTypeRecruitContainer: {
        margin:1.5,
        borderColor: Color.colorLightgreen,
        borderWidth:1,
        borderRadius:5,
        flex:0.15,
        textAlign:'center',
    },
    writeTypeRecruit: {
        color: Color.colorLightgreen,
        fontFamily: FontFamily.aBeeZeeRegular,
        fontSize: FontSize.size_3xs,
        textAlign:'center',
    },
    writeTypeApplyContainer: {
        margin:1.5,
        borderColor: Color.colorYellow,
        borderWidth:1,
        borderRadius:5,
        flex:0.15,
        textAlign:'center',
    },
    writeTypeApply: {
        color: Color.colorYellow,
        fontFamily: FontFamily.aBeeZeeRegular,
        fontSize: FontSize.size_3xs,
        textAlign:'center',
    },
    buttonContainer: {
        borderColor: Color.colorCornflowerblue,
        width:70,
        height:20,
        borderWidth:1,
        borderRadius:6,
        textAlign:'center',
        justifyContent: 'center',
    },
    bluebuttonContainer: {
        borderColor: Color.colorCornflowerblue,
        width:70,
        height:20,
        borderWidth:1,
        borderRadius:6,
        textAlign:'center',
        justifyContent: 'center',
    },
    realbluebuttonContainer: {
        borderColor: Color.colorRealBlue,
        width:70,
        height:20,
        borderWidth:1,
        borderRadius:6,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    redbuttonContainer: {
        borderColor: '#F00',
        alignItems: 'center',
        justifyContent: 'center',
        width:70,
        height:20,
        borderWidth:1,
        borderRadius:6,
    },
    shadow:{
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        elevation: 2,
    },
    modifybuttonContainer: {
        borderColor: Color.colorCornflowerblue,
        width:'100%',
        height:20,
        borderWidth:1,
        borderRadius:6,
        textAlign:'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Color.colorCornflowerblue,
        fontFamily: FontFamily.aBeeZeeRegular,
        fontSize: 13,
        textAlign:'center',
    },
    optionsContainer: {
        height:500,
        backgroundColor: Color.colorWhite,
    },
    myPageOption:{
        height:48,
        marginHorizontal:12,
        justifyContent: "center",
    },
    redContainer: {
        width: 67,
        height: 19,
        borderRadius: 6,
        borderColor: '#F00',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
    },
    redText: {
        color: '#F00',
        fontSize: FontSize.size_3xs,
    },
    realblueText: {
        color: Color.colorRealBlue,
        fontSize: 13,
    },
    deliveryDetailheader:{
        flexDirection: "row",
        height: 32,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    deliveryDetailContainer: {
        height: 140,
        margin:10,
        flexDirection: "column",
        alignItems: "center",
    },
    deliverytitleContainer: {
        paddingHorizontal: 10,
        width: '100%',
        height: 34,
        borderWidth: 1,
        borderColor: Color.colorGray_100,
        borderRadius: 5,
        justifyContent: 'center',
    },
    deliveryContentsContainer: {
        paddingHorizontal: 5,
        alignSelf: 'stretch',
    },
    deliveryTitleText: {
        color: Color.colorBlack,
        fontSize: FontSize.size_sm,
    },
    deliveryContentsText: {
        color: Color.colorBlack,
        fontSize: FontSize.size_smi,
    },
    infoContainer: {
        marginBottom:3,
    },
    commentContainer:{
        flex:1,
        height: 57,
        marginTop: 10,
        backgroundColor:'#fff',
        borderColor:Color.colorGray_100,
        borderRadius:6,
        borderWidth:0.5,
        justifyContent: 'center',
    },
    commentDetails: {
        backgroundColor:'#fff',
        borderColor:'#22A2F2',
        borderRadius:6,
        borderWidth:0.5,
        justifyContent: 'center',
        paddingHorizontal:10,
    },
    commentheader:{
        paddingHorizontal:10,
        flex:1,
    },
    emptySpace: {
        width: '100%',
        marginTop:10,
        height:20,
    }
})