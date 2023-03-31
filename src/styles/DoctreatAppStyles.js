import { StyleSheet } from "react-native";
import CONSTANT from '../Constants/local';
import {I18nManager} from 'react-native';
//I18nManager.forceRTL(false);

export default StyleSheet.create({
  //------------------------------- Global Styles -------------------------------
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  ActivityIndicatorAreaStyle:{
    justifyContent: "center", 
    alignItems: "center",
    height: "100%" 
  },
  ActivityIndicatorStyle:{
    height: 30,
    width: 30,
    borderRadius: 30/2,
    backgroundColor: "#fff",
    elevation: 5
  },
  SpinnerTextStyle:{
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color:'#000',
    elevation: 5,
    fontFamily:CONSTANT.PoppinsMedium
  },
  MultiSelectArea:{
    marginLeft: 10, 
    marginRight: 10, 
    marginBottom: 10 
  },
  MultiSelectstyleMainWrapper:{
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 10,
  },
  MultiSelectstyleDropdownMenuSubsection:{
    backgroundColor: "#fff",
    paddingRight: -7,
    height: 60,
    paddingLeft: 10,
    borderWidth: 0.6,
    borderColor: "#fff",
    borderColor: "#dddddd",
    borderRadius: 4
  },
  TextInputLayoutStyle:{
    height: 50,
    width:'95%',
    backgroundColor:"#ffffff",
    paddingRight:10,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    color: "#323232",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  TextInputEmailStyle:{
    height: 50,
    width:'85%',
    backgroundColor:"#ffffff",
    paddingRight:10,
    paddingLeft: 10,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius:2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    color: "#323232",
    marginLeft: 10,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  TextInputSearchInboxStyle:{
    height: 50,
    width:'95%',
    backgroundColor:"#ffffff",
    paddingRight:10,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    color: "#323232",
    margin:10,
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  TextInputLayoutStyleForDetail:{
    height:140,
    paddingVertical:10,
    backgroundColor:"#ffffff",
    paddingLeft: 10,
    paddingRight:10,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    color: "#323232",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  TextInputLayoutStyleAvailability:{
    height: 40,
    width:'55%',
    backgroundColor:"#ffffff",
    paddingRight:10,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 0.6,
    marginLeft:10,
    borderColor: "#dddddd",
    color: "#323232",
    fontFamily:CONSTANT.PoppinsMedium,
    marginBottom:15,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  CollapseHeaderStyle:{ 
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 4,
    height: 70,
  },
  MainHeadingTextStyle:{
    color: CONSTANT.primaryColor,
    fontSize: 20,
    fontFamily:CONSTANT.PoppinsBold,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 15,
    textAlign:'left',
  },
  MainHeadingInviteHospitalText:{
    color: "#fff",
    fontSize:12,
    justifyContent:'center',
    textAlign:'center',
    padding:15,
  },
  MainHeadingRow: {
    flexDirection:'row',
    justifyContent:'space-between',

  },
  MainHeadingInviteHospital: {
    backgroundColor:'#2FBC9D',
    marginRight: 10,
    marginTop: 15,
    marginBottom:10,
    borderRadius:5,
  },
  MainButtonArea:{
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "50%",
    alignItems: "center",
    justifyContent:"center",
    alignSelf: "center",
    backgroundColor: CONSTANT.primaryColor
  },
  CustomButtonRightArea:{
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "30%",
    alignItems: "center",
    justifyContent:"center",
    alignSelf: 'flex-end',
    backgroundColor: CONSTANT.primaryColor
  },
  CustomButtonLeftArea:{
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "30%",
    alignItems: "center",
    justifyContent:"center",
    alignSelf: 'flex-start',
    backgroundColor: CONSTANT.primaryColor
  },
  MainButtonText:{
    color: "#fff",
    fontFamily:CONSTANT.PoppinsMedium,
  },

  RadioLabelStyle:{ fontSize: 14 },
  RadioButtonStyle:{
    flexDirection: "row",
    marginLeft: 10,
    display: "flex",
    width: "100%",
    alignContent:'flex-start'
  },
  HeaderArea:{
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    alignItems:'center',
    backgroundColor: CONSTANT.primaryColor,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
  },
  HeaderBackBTN:{
    flex:1,
    alignItems:'flex-start',
  },
  HeaderHeadingArea:{
    flex:8,
    alignItems:'center'
  },
  HeaderHeadingText:{
    fontSize: 18,
    fontFamily:CONSTANT.PoppinsMedium,
    color: "#fff",
  },
  NoDataArea:{
    flex: 1,
    alignContent: "center",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  NoDataImage:{ 
    width: 150, 
    height: 150 
  },
  NoDataText1:{
    fontSize: 25,
    fontWeight: "700",
    marginVertical: 10
  },
  NoDataText2:{ 
    fontSize: 17, 
    fontWeight: "700" 
  },

  //-------------------- SpecialitiesAndServices Styles ----------------------
  SpecialitiesAndServicesMain:{
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical:5,
    borderRadius: 6,
    elevation: 5,
  },
  // SpecialitiesAndServicesFlatlistArea:{ 
  //   paddingBottom: 5, 
  //   marginBottom: 5 
  // },
  SpecialitiesAndServicesmainServiceName: {
    color: "#484848",
    fontSize: 15,
    margin: 24,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  SpecialitiesAndServicesImageStyle: {
    margin: 15,
    width: 35,
    height: 35,
  },
  SpecialitiesAndServicesmainLayoutServices: {
    flexDirection: "row",
    height: 70
  },
  SpecialitiesAndServicesIconStyle:{
    alignSelf: "flex-end",
    marginTop: -42,
    marginRight: 10
  },
  SpecialitiesAndServicesCollapseBodyText:{
    fontFamily:CONSTANT.PoppinsRegular,
  },
  // SpecialitiesAndServicesCollapseBodyFlatlist:{
  //   paddingLeft: 5, 
  //   marginTop: 8 
  // },
  SpecialitiesAndServicesCollapseBodyTouchable:{
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    marginTop: 5,
    marginRight: 10,
    borderRadius: 5,
    padding: 10
  },
  SpecialitiesAndServicesBorder:{
    borderLeftColor: "#dddddd",
    borderLeftWidth: 0.6,
  },

  //---------------------------- AddSetting Styles ----------------------------
  AddSettingScrollViewStyle:{ 
    backgroundColor: "#fff", 
    borderRadius: 5, 
    margin: 10 
  },
  AddSettingmainServiceName: {
    color: "#484848",
    fontSize: 15,
    margin: 24,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  AddSettingImageStyle: {
    margin: 15,
    width: 35,
    height: 35
  },
  AddSettingmainLayoutServices: {
    flexDirection: "row",
    height: 70
  },
  AddSettingIconStyle:{
    alignSelf: "flex-end",
    marginTop: -62,
    padding: 20
  },
  AddSettingBorder:{
    borderLeftColor: "#dddddd",
    borderLeftWidth: 0.6,
  },
  AddSettingFlatlist:{ 
    paddingLeft: 5, 
    marginBottom: 10 
  },

  //--------------------- AppointmentDetailPage Styles ------------------------
  AppointmentDetailMainArea:{
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  AppointmentDetailHeaderArea:{
    flexDirection: "row",
    margin: 15,
    width: "100%",
    overflow: "hidden"
  },
  AppointmentDetailImageArea:{ width: "20%", },
  AppointmentDetailImageStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  AppointmentDetailNameArea:{ 
    marginHorizontal: 10, 
    width: "50%",
    alignItems:'flex-start'
  },
  AppointmentDetailUseTypeText:{ 
    fontSize: 13, 
    color: "#3fabf3" , 
    fontFamily:CONSTANT.PoppinsMedium
  },
  AppointmentDetailNameText:{
    color: "#323232",
    fontSize: 17,
    fontFamily:CONSTANT.PoppinsBold
  },
  AppointmentDetailCountryText:{ 
    color: "#767676", 
    fontSize: 13 , 
    fontFamily:CONSTANT.PoppinsMedium
  },
  AppointmentDetailLefBorder:{ 
    borderLeftColor: "#767676", 
    borderLeftWidth: 0.4 
  },
  AppointmentDetailAcceptedArea:{
    flexDirection: 'column',
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  AppointmentDetailAcceptedIcon:{alignSelf: "center"},
  AppointmentDetailAcceptedText:{ 
    fontSize: 10 ,
    fontFamily:CONSTANT.PoppinsMedium 
  },
  AppointmentDetailBorderBottom:{ 
    borderBottomColor: "#767676", 
    borderBottomWidth: 0.4 
  },
  AppointmentDetailBodyMainArea:{marginBottom:20},
  AppointmentDetailBodyArea:{ 
    marginLeft: 15, 
    marginTop: 10, 
    marginRight: 15,
    alignItems:'flex-start'
  },
  AppointmentDetailBodyHeading:{ 
    fontSize: 15 , 
    fontFamily:CONSTANT.PoppinsBold 
  },
  AppointmentDetailBodyText:{ 
    fontSize: 17  , 
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:'left'
  },
  AppointmentDetailservices:{ 
    fontSize: 14  , 
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:'left'
  },
  AppointmentDetailButtonArea:{ 
    flexDirection: "row", 
    justifyContent: "center",
  },
  AppointmentDetailButtonStyle1:{
    alignItems: "center",
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#3fabf3"
  },
  AppointmentDetailButtonStyle2:{
    alignItems: "center",
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#fe736e"
  },
  AppointmentDetailButtonText:{
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    paddingTop: 10
  },
  
  //----------- AppointmentList & AppointmentListPatient Styles ---------------
  AppointmentListcircle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#fe736e",
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row"
  },
  AppointmentListImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: "center",
    position: "relative",
    marginRight: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  AppointmentListCalenderArea:{ 
    margin: 10, 
    borderRadius: 5, 
    overflow: "hidden",
    borderColor: "#dddddd",
    borderWidth: 0.6,
    backgroundColor:CONSTANT.primaryColor
  },
  AppointmentListPatientHeadingArea:{
    flexDirection:'column' , 
    //alignItems:'center',
    flex:1 , 
    justifyContent:'space-between' 
  },
  AppointmentListHeadingandButtonArea:{
    flexDirection:'row' , 
    alignItems:'center',
    flex:1 , 
    justifyContent:'space-between' 
  },
  AppointmentListMainArea:{ 
    marginRight: 10, 
    flexDirection: "column", 
    width: "100%" 
  },
  AppointmentListFlatListArea:{
    backgroundColor: "#fff",
    margin: 10,
    padding:10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems:'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  AppointmentListDateArea:{ 
    flexDirection: "column", 
    margin: 10,
    paddingRight:10,
  },
  AppointmentListDateText:{
    color: "#323232",
    fontWeight: "700",
    fontSize: 18,
    textAlign:'left'
  },
  AppointmentListMonthText:{ 
    color: "#323232", 
    fontSize: 14 
  },
  AppointmentListDetailArea:{
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10
  },
  AppointmentDetailMainStatusArea:{flexDirection:'row',},
  AppointmentDetailStatusArea:{
    flexDirection:'row', 
    marginRight:5,
  },

  //---------------------- AppointmentSettings Styles -------------------------
  AppointmentSettingsTabBarTextStyle:{
    fontSize: 15,
  },
  AppointmentSettingsScrollableTabBar:{
    height: '100%',
  },

  //----------------------- AvailableLocation Styles --------------------------
  AvailableLocationMainArea:{
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 5,
    flexDirection: "row",
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    elevation: 3
  },
  AvailableLocationFlatlistStyle:{ paddingLeft: 5 },
  AvailableLocationImageStyle:{ 
    width: 75, 
    height: 75, 
    borderRadius: 6 
  },
  AvailableLocationTextArea:{
    flexDirection: "column",
    margin: 10,
    justifyContent: "center",
    alignItems:'flex-start'
  },
  AvailableLocationStatusText:{ 
    color: "#3FABF3", 
    fontSize: 13 ,
    fontFamily:CONSTANT.PoppinsMedium, 
  },
  AvailableLocationNameText:{
    color: CONSTANT.primaryColor,
    fontFamily:CONSTANT.PoppinsBold,
    fontSize: 16
  },
  AvailableLocationDaysText:{
    color: "#858585",
    fontSize: 12,
    marginRight: 5,
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //------------------------ BookAppointment Styles ---------------------------
  BookAppointmentmainLayoutServices: {
    flexDirection: 'row',
    height: 70,
  },
  BookAppointmentImageStyle: {
    margin: 15,
    width: 35,
    height: 35,
  },
  BookAppointmentLeftBorder:{
    borderLeftColor: '#dddddd',
    borderLeftWidth: 0.6,
  },
  BookAppointmentmainServiceName: {
    fontSize: 15,
    margin: 24,
    fontWeight: '400',
  },
  BookAppointmentMainArea:{
    paddingHorizontal: 10,
    marginBottom:15
  },
  BookAppointmentHeadingText:{
    color: "#f7395a",
    fontSize: 20,
    fontFamily:CONSTANT.PoppinsBold,
    marginBottom: 10,
    marginTop:10,
    textAlign:'left'
  },
  BookAppointmentDateArea:{
    marginTop: 5,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#dddddd',
    backgroundColor:'#fff',
    borderWidth: 0.6,
    marginHorizontal:10,
    paddingHorizontal:2,
    paddingBottom:2,
  },
  BookAppointmentSlotFlatListArea:{
    marginLeft:5, 
    marginBottom: 10
  },
  BookAppointmentSlotMainArea:{
    width: '30%', 
    margin: 5
  },
  BookAppointmentCollapseBodyIconStyle:{
    alignSelf: 'flex-end',
    marginTop: -45,
    marginRight: 10,
  },
  BookAppointmentCollapseBodyArea:{
    flexDirection: 'row',
    borderColor: '#ddd',
    borderWidth: 0.3,
    marginLeft: 15,
    marginRight: 15,
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor: '#fff',
    justifyContent:'space-between'
  },
  BookAppointmentCollapseBodyTitleText:{
    color: '#323232',
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentCollapseBodyPriceText:{
    color: '#323232',
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentSelectedServicesArea:{
    flexDirection: 'row',
    paddingHorizontal:10
  },
  BookAppointmentSelectedServicesWithIconArea:{
    flexDirection: 'row',
    height: 50,
    width:'85%',
    borderColor: '#ddd',
    borderWidth: 0.3,
    paddingHorizontal:20,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'space-between'
  },
  BookAppointmentSelectedServicesIconArea:{
    width:'15%',
    height:50,
    backgroundColor: '#ff5851',
    justifyContent: 'center',
    alignItems:'center',
    borderColor: '#ddd',
    borderWidth: 0.3,
  },
  BookAppointmentSelectedServicesFeeArea:{
    flexDirection: 'row',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 0.3,
    paddingHorizontal:20,
    marginHorizontal:10,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'space-between'
  },
  BookAppointmentSelectedServicesText:{
    color: CONSTANT.primaryColor,
    fontFamily: CONSTANT.PoppinsBold,
  },
  BookAppointmentSelectedServicesText:{
    color: CONSTANT.primaryColor,
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentSlotArea:{
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    height: 45,
    borderColor: '#dddddd',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookAppointmentSlotAreaClicked:{
    flexDirection: 'column',
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 5,
    height: 45,
    borderColor: '#dddddd',
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookAppointmentSlotText:{
    fontFamily: CONSTANT.PoppinsBold,
    fontSize: 16,
    color:'#323232',
  },
  BookAppointmentSlotOccupiedText:{
    fontSize: 10,
    color: '#f7395a',
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentSpaceText:{
    fontSize: 10,
    fontFamily: CONSTANT.PoppinsMedium,
    color:'#323232',
  },
  BookAppointmentSlotTextClicked:{
    fontFamily: CONSTANT.PoppinsBold,
    color: '#fff',
    fontSize: 16,
  },
  BookAppointmentSlotOccupiedTextClicked:{
    fontSize: 10,
    color: '#fff',
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentSpaceTextClicked:{
    fontSize: 10,
    color: '#fff',
    fontFamily: CONSTANT.PoppinsMedium,
  },
  BookAppointmentSelectedSlotArea:{
    flexDirection: "row",
    marginLeft: 10,
    width: "100%",
    marginBottom:10
  },
  BookAppointmentSelectedSlotStyle:{ 
    fontSize: 15, 
    width: "33.33%",
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //---------------------- BookAppointmentCall Styles -------------------------
  BookAppcontainer: {
    flex: 1
  },
  BookAppMainArea:{ flexDirection: "column" },
  BookAppImageStyle:{
    width: 150,
    height: 80,
    resizeMode: "center",
    alignSelf: "center"
  },
  BookAppBookingText:{
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 5
  },
  BookAppCallText:{ 
    justifyContent: "center", 
    textAlign: "center" 
  },
  TopRatedCardManagment: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20
  },
  BookAppFlatListArea:{ 
    flex: 1, 
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  },
  BookAppNumberText:{
    fontSize: 20,
    color: "#3fabf3"
  },

  //------------------------ DoctorAddBooking Styles --------------------------
  DoctorAddBookingNoteText:{
    marginLeft: 10,
    fontSize: 12,
    fontFamily: CONSTANT.PoppinsMedium,
    marginBottom: 10,
    color:'#7F7F7F'
  },
  DoctorAddBookingsecurityScrollDisableArea: {
    margin: 10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  DoctorAddBookingsecurityScrollDisableText: {
    fontSize: 15,
    fontFamily: CONSTANT.PoppinsBold,
    marginBottom: 5,
    color: CONSTANT.primaryColor,
  },
  DoctorAddBookingsecurityScrollSwitch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    marginTop:-5
  },

  //------------------------- LocationDetail Styles ---------------------------
  LocationDetailMainArea:{
    backgroundColor: "#fff",
    borderRadius: 6,
    margin: 5,
    flexDirection: "row",
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    elevation: 3
  },
  LocationDetailImageStyle:{ 
    width: 75, 
    height: 75, 
    borderRadius: 6 
  },
  LocationDetailTextArea:{
    flexDirection: "column",
    margin: 10,
    justifyContent: "center",
    alignItems:'flex-start'
  },
  LocationDetailStatusText:{ 
    color: "#3FABF3", 
    fontSize: 13 ,
    fontFamily:CONSTANT.PoppinsMedium, 
  },
  LocationDetailNameText:{
    color: CONSTANT.primaryColor,
    fontFamily:CONSTANT.PoppinsBold,
    fontSize: 16
  },
  LocationDetailDaysText:{
    color: "#858585",
    fontSize: 12,
    marginRight: 5,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  LocationDetailmainLayoutServices: {
    flexDirection: "row",
    height: 70
  },
  LocationDetailmainServiceName: {
    color: CONSTANT.primaryColor,
    fontSize: 15,
    margin: 24,
    fontFamily:CONSTANT.PoppinsBold,
  },
  LocationDetailIconStyle:{
    alignSelf: "flex-end",
    marginTop: -62,
    padding: 20
  },
  LocationDetailTimeSlotsArea:{
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10
  },
  LocationDetailCollapseBodyStyle:{ width: "100%" },
  LocationDetailDeleteBTNArea:{
    alignItems: "center",
    justifyContent:'center',
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "25%",
    alignSelf: "center",
    backgroundColor: "#F95851"
  },
  LocationDetailAddMoreBTNArea:{
    alignItems: "center",
    justifyContent:'center',
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "25%",
    alignSelf: "center",
    backgroundColor: "#2FBC9C"
  },
  LocationDetailBTNStyle:{
    color: "#fff",
    fontFamily:CONSTANT.PoppinsMedium,
  },
  LocationDetailFlatListArea:{
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10
  },
  LocationDetailTimeSlotStyle:{
    flexDirection: "column",
    margin: 3,
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 45,
    borderColor: CONSTANT.primaryColor,
    borderWidth: 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  LocationDetailInfoArea:{
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    elevation: 5,
    margin: 10,
    paddingTop: 10
  },
  LocationDetailBorderStyle:{
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5
  },

  //--------------------- PayAppointmentCheckout Styles -----------------------
  PayAppointmentCheckoutcontainer: {
    flex: 1,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },

  //--------------------------- SubmitCode Styles -----------------------------
  SubmitCodeMainArea:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  SubmitCodeHeadingText:{ 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 15,
    textAlign:'left',
  },

  //-------------------- VerifyPasswordForBooking Styles ----------------------
  VerifyPasswordMainArea:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  VerifyPasswordHeadingText:{ 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 15,
    textAlign:'left',
  },

  //-------------------------- PostArticle Styles -----------------------------
  postArticleDetailArea: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 4,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  postArticlePhotoArea: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius: 4
  },
  postArticleAddPhotoArea: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden"
  },
  postArticleAddPhotoStyle: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    borderStyle: "dashed",
    borderColor: "#dddddd",
    borderWidth: 0.6,
    height: 150,
    width: "60%",
    marginBottom: 10
  },
  postArticleAddPhotoTouchableArea: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  postArticleAddPhotoTouchableText: {
    color: "#767676",
    fontSize: 17,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  postArticleImageStyle: {
    width: "40%",
    height: 150,
    borderRadius: 4
  },
  postArticleCategoryArea: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius: 4
  },
  postArticleMultiArea: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  postArticleMultiWrapper: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 10
  },
  postArticleMultiDropdown: {
    backgroundColor: "#fff",
    paddingRight: -7,
    height: 60,
    paddingLeft: 10,
    borderWidth: 0.6,
    borderColor: "#fff",
    borderColor: "#dddddd",
    borderRadius: 4
  },
  postArticleTagsArea: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius: 4
  },
  postArticleTagTitle: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  postArticleTagTitleTextInput: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    height: 50,
    color: "#323232",
    borderWidth: 0.6,
    borderColor: "#dddddd",
    marginBottom: 10,
    width: "80%",
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  postArticleTagsIconArea: {
    backgroundColor: CONSTANT.primaryColor,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    height: 50,
    width: "20%",
    justifyContent: "center",
    flexDirection: "row"
  },
  postArticleTagsIconStyle: { top: 15 },
  postArticleButtonArea: {
    backgroundColor: "#3fabf3",
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  postArticleButtonText: {
    color: "#fff",
    justifyContent: "center",
    fontSize: 16,
    top: 20,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  //------------------------------- LoginScreen Styles -------------------------------
  LoginKeyboardAvoidViewStyle:{
    flex: 1,
  },
  LoginContainer: {
    height: "85%",
    justifyContent: "center",
    alignItems: "center"
  },
  LoginAlertText:{
    padding: 10, 
    margin: 10, 
    color: "red"
  },
  LoginImageStyle:{
    width: 150,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center"
  },
  LoginParagraphText:{
    textAlign: "center",
    alignSelf: "center",
    color: "#807f7f",
    fontFamily:CONSTANT.PoppinsRegular,
  },
  LoginTextInputArea:{
    width: "90%",
    borderWidth: 0.6,
    borderRadius: 4,
    margin: 10,
    borderColor: "#dddddd"
  },
  LoginTextInput:{ 
    fontSize: 15, 
    padding: 5, 
    height: 40, 
    color: "#323232" ,
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  LoginTextInputBorder:{ 
    borderBottomColor: "#dddddd", 
    borderBottomWidth: 0.6 
  },
  LoginLoadMoreBtn: {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginBTNText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontFamily:CONSTANT.PoppinsMedium,
  },
  LoginFooterArea:{
    height: 45,
    flex:1,
    justifyContent:'center',
    backgroundColor: CONSTANT.primaryColor,
    alignItems: "center",
    alignContent: "center"
  },
  LoginFooterText:{
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 18,
    fontFamily:CONSTANT.PoppinsMedium,
    alignContent: "center",
    textAlignVertical: "center"
  },
  LoginLoadingMainArea:{
    flex: 1,
    backgroundColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  LoginLoadingArea:{
    borderRadius: 10,
    backgroundColor: "white",
    padding: 25,
    position: "absolute"
  },
  LoginLoadingText:{ 
    fontSize: 20, 
    fontWeight: "200"
  },

  //------------------------------ SignupScreen Styles -------------------------------
  SignUpcontainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignupImageStyle:{
    width: 150,
    height: 80,
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 30
  },
  SignupParagraphText:{
    textAlign: "center",
    alignSelf: "center",
    color: "#807f7f",
    fontFamily:CONSTANT.PoppinsRegular,
    paddingHorizontal:10
  },
  SignupHeadingArea:{
    height: 65,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "#fcfcfc",
    borderLeftWidth: 5,
    borderLeftColor: CONSTANT.primaryColor,
  },
  SignupHeadingText:{
    marginLeft: 10,
    fontSize: 20,
    fontFamily:CONSTANT.PoppinsMedium,
    color: "#000000",
    textAlign: 'left',
  },
  SignupTextInputArea:{
    borderWidth: 0.6,
    borderRadius: 4,
    margin: 10,
    borderColor: "#dddddd"
  },
  SignupTextInput:{
    fontSize: 17,
    color: "#323232",
    height: 45,
    marginLeft: 5,
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  SignupTextInputWithIconArea:{ flexDirection: "row" },
  SignupTextInputWithIcon:{
    fontSize: 17,
    color: "#323232",
    fontFamily:CONSTANT.PoppinsRegular,
    height: 45,
    marginLeft: 5,
    width: "90%",
    textAlign:I18nManager.isRTL ? 'right' : 'left',
  },
  SignupTextInputIconStyle:{ top: 15 },
  SignupTextInputBorder:{
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.8
  },
  loadMoreBtn: {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  SignupFooterArea:{
    backgroundColor: CONSTANT.primaryColor,
    height: 45,
    width: "100%",
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignupFooterText:{
    color: "#fff",
    fontSize: 17,
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //----------------------- VerificationAccount Styles ------------------------
  VerifyAccountContainer: {
    height: "77%",
    marginBottom: 55,
    justifyContent: "center",
    alignItems: "center"
  },
  VerifyAccountAlerText:{ 
    padding: 10, 
    margin: 10, 
    color: "red" 
  },
  VerifyAccountImageStyle:{ 
    width: 150, 
    resizeMode: "center", 
    alignSelf: "center" 
  },
  VerifyAccountParagraphText:{
    textAlign: "center",
    alignSelf: "center",
    color: "#807f7f",
    fontFamily:CONSTANT.PoppinsRegular,
  },
  VerifyAccountTextInputArea:{
    width: "90%",
    borderWidth: 0.6,
    borderRadius: 4,
    margin: 10,
    borderColor: "#dddddd"
  },
  VerifyAccountTextInput:{ 
    fontSize: 15, 
    padding: 5, 
    height: 40, 
    color: "#323232", 
    fontFamily:CONSTANT.PoppinsRegular,
  },

  //------------------------ ArticleDetailPage Styles ------------------------
  articleDetailScrollArea: { marginBottom: 50 },
  articleDetailScrollImage: {
    height: 300,
    width: "100%"
  },
  articleDetailScrollTitleArea: {
    marginRight: 10,
    marginBottom: 10
  },
  articleDetailScrollTitleText: {
    color: CONSTANT.primaryColor,
    fontSize: 20,
    fontFamily:CONSTANT.PoppinsMedium,
    margin: 10
  },
  articleDetailScrollDataText: {
    color: "#767676",
    fontSize: 15,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsRegular
  },
  articleDetailScrollContentArea: {
    paddingLeft: 10,
    paddingRight: 10
  },
  articleDetailMainLayoutServicesArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 4,
    marginBottom: 25,
    overflow: "hidden"
  },
  articleDetailLayoutServices: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingRight: 10
  },
  articleDetailServices: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  articleDetailServicesImage: {
    width: 60,
    height: 60,
    borderRadius: 4
  },
  articleDetailUserArea: {
    flexDirection: "column",
    justifyContent: "center"
  },
  articleDetailUserNameText: {
    color: "#484848",
    fontSize: 16,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsMedium,
    marginRight: 10
  },
  articleDetailUserDataText: {
    color: CONSTANT.primaryColor,
    fontSize: 13,
    marginLeft: 10,
    marginRight: 10,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  articleDetailUserContentsText: {
    color: "#484848",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsRegular,
  },

  //------------------------- ArticleListCard Styles -------------------------
  articleListcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center"
  },
  articleListMainArea: {
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
    alignSelf: "center"
  },
  articleListSubArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignContent: "center"
  },
  articleListImageArea: { width: "30%" },
  articleListImageStyle: { height: 150 },
  articleListTextArea: {
    width: "70%",
    flexDirection: "column",
    padding: 15,
    justifyContent: "center",
    alignItems:"flex-start"
  },
  articleListCategoryText: {
    color: "#55acee",
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular
  },
  articleListTitleText: {
    color: CONSTANT.primaryColor,
    fontSize: 17,
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:"left"
  },
  articleListDataTextArea: {
    flexDirection: "row",
    marginTop: 5
  },
  articleListDataText: {
    color: "#767676",
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular
  },
  articleListViewText: {
    color: "#767676",
    fontSize: 13
  },
  articleListEditDeleteArea: {
    marginTop: 12,
    marginBottom: 12,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.6
  },

  //-------------------------- ArticleListing Styles --------------------------
  articleListingContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  // buttonHover: {
  //   width: 150,
  //   height: 50,
  //   backgroundColor: "#3fabf3",
  //   borderBottomColor: "#3fabf3",
  //   marginLeft: 15,
  //   borderWidth: 0,
  //   marginTop: 5,
  //   shadowColor: "rgba(0, 0, 0, 0.1)",
  //   shadowOpacity: 0.8,
  //   elevation: 6,
  //   shadowRadius: 15,
  //   marginBottom: 25,
  //   shadowOffset: { width: 1, height: 13 },
  //   fontSize: 13,
  //   borderRadius: 4,
  //   overflow: "hidden"
  // },
  articleListingfooter: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  articleListingloadMoreBtn: {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleListingbtnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontFamily:CONSTANT.PoppinsMedium
  },
  articleListingsearchListStyle: {paddingLeft: 5},

  //------------------------ BuyPackageWebview Styles ------------------------
  buyPackagecontainer: {
    flex: 1,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  buyPackageMainArea: {
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    backgroundColor: CONSTANT.primaryColor,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10
  },
  buyPackageTouchableArea: {
    flexDirection: "column",
    width: "20%",
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  buyPackageBuyNowArea: {
    flexDirection: "column",
    width: "60%",
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  buyPackageBuyNowTextArea: {
    flexDirection: "row",
    display: "flex",
    alignSelf: "center"
  },
  buyPackageBuyNowTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    height: 30,
    marginTop: 9
  },

  //----------------------------- Packages Styles ------------------------------
  packagesMain: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  packagesHead: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopWidth: 0
  },
  packagesHeading: {
    color: "#24355a",
    fontWeight: "600",
    fontSize: 18
  },
  packagesContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#dddddd",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    overflow: "hidden",
    paddingBottom: 10
  },
  packagesImageArea:{ 
    alignItems: "center", 
    justifyContent: "center" 
  },
  packagesImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10
  },
  packagesTitle: {
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#55acee",
    padding: 15
  },
  packagesTitletext: {
    fontFamily:CONSTANT.PoppinsBold,
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  },
  packagesCardmain: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  packagesPriceArea:{ 
    flexDirection: "row", 
    marginTop: 10 
  },
  packagesPrice: {
    fontSize: 35,
    color: "#24355a",
    fontFamily:CONSTANT.PoppinsBold,
    marginBottom: 3
  },
  packagesSymbol:{ 
    color: "#323232", 
    fontSize: 25 
  },
  packagesTaxes: {
    color: "#767676",
    fontStyle: "italic",
    fontFamily:CONSTANT.PoppinsMedium,
  },
  packagesBuyButton: {
    marginTop: 10
  },
  packagesBuyButtonText: {
    backgroundColor: "#f7395a",
    color: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    fontWeight: "600"
  },
  packagesFeatured: {
    marginTop: 15,
    flex: 1,
    paddingBottom: 10
  },
  packagesFeaturetittle: {
    color: "#f7395a",
    fontSize: 18,
    fontFamily:CONSTANT.PoppinsMedium,
    marginBottom: 5,
    marginHorizontal: 10,
    textAlign:'left',
  },
  packagesFeatureddetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingVertical: 3
  },
  packagesFeaturenames: {
    color: "#767676",
    fontSize: 13
  },
  packagesNumber: {
    color: "#24355a",
    fontSize: 13,
    fontWeight: "700"
  },
  packagesButtonArea:{
    alignItems: "center",
    justifyContent:'center',
    height: 40,
    margin: 10,
    borderRadius: 4,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#32CD32",
  },
  packagesButtonText:{
    color: "#fff",
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //------------------- AwardsAndRecognitionsCard Styles --------------------
  AwardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5,
    borderRadius: 4
  },
  AwardMainLayoutServices: {
    flexDirection: "row",
    alignItems:'flex-start'
  },
  AwardMainServiceName: {
    color: "#484848",
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    fontWeight: "400",
    marginBottom: 15,
    textAlign:'left',
    fontFamily: CONSTANT.PoppinsMedium
  },

  //--------------------------- DownloadCard Styles ---------------------------
  downloadContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5,
    borderRadius: 4
  },
  downloadMain:{ 
    backgroundColor: "#fff", 
    padding: 15, 
    borderRadius: 4,
    flexDirection: "row",
  },
  downloadImageArea:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  downloadImageStyle:{ 
    height: 50, 
    width: 50, 
    borderRadius: 50 / 2,
  },
  downloadTextArea:{ 
    flex:6,
    flexDirection: "column",
    justifyContent:'center',
    alignItems:'flex-start'
  },
  downloadTextstyle1:{
    color: "#484848",
    fontSize: 15,
    marginLeft: 10,
    fontFamily: CONSTANT.PoppinsMedium,
  },
  downloadTextstyle2:{
    color: "#484848",
    fontSize: 13,
    marginLeft: 10,
    fontFamily: CONSTANT.PoppinsMedium
  },
  downloadIconArea:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

  //-------------------------- ExperienceCard Styles --------------------------
  experienceContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5,
    borderRadius: 4
  },
  experienceMainLayoutServices: {
    flexDirection: "column",
    alignItems:'flex-start',
  },
  experienceMainServiceNameArea:{
    flexDirection:'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  experienceMainServiceName: {
    color: "#484848",
    fontSize: 15,
    fontFamily: CONSTANT.PoppinsMedium,
    textAlign:"left"
  },
  experienceMainServiceName2: {
    color: "#484848",
    fontSize: 13,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    fontFamily: CONSTANT.PoppinsMedium
  },

  //------------------------ OfferServicesCard Styles ------------------------
  offerServicesContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginRight: 3,
    marginLeft: 3,
    marginBottom: 5,
    borderRadius: 4,
    height: 70
  },
  offerServicesMainLayoutServices: {
    flexDirection: "row",
    height: 70
  },
  offerServicesImageStyle: {
    margin: 15,
    width: 35,
    height: 35
  },
  offerServicesTextArea:{ 
    borderLeftColor: "#dddddd", 
    borderLeftWidth: 0.6 
  },
  offerServicesMainServiceName: {
    color: "#484848",
    fontSize: 15,
    margin: 24,
    fontFamily: CONSTANT.PoppinsMedium
  },
  offerServicesIconStyle:{ 
    alignSelf: "flex-end", 
    marginTop: -42, 
    marginRight: 10 
  },

  //------------------------ SpecializationCard Styles ------------------------
  specializationContainer: {
    flex: 1,
    backgroundColor:'#ffffff',
    marginTop:2,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    borderRadius:4,
  }, 
  specializationMainLayoutServices:{
   flexDirection:'row',
  },
  specializationMainServiceName:{
    color:'#484848',
    fontSize:15,
    marginLeft:10,
    marginTop:15,
    marginRight:25,
    fontFamily:CONSTANT.PoppinsMedium,
    marginBottom:15,
    textAlign:'left'
  },
  specializationCircle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: '#fe736e',
    marginTop:20,
    marginLeft:20
  },

  //--------------------------- ArticlesCard Styles ----------------------------
  ArticleCardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginBottom: 5,
    borderRadius: 4,
  },
  ArticleCardImageArea:{ 
    backgroundColor: '#fff', 
    borderRadius: 4, 
    overflow: 'hidden' 
  },
  ArticleCardImageStyle:{ height: 200 },
  ArticleCardDetailArea:{ padding: 15 },
  ArticleCardCategoryText:{ 
    color: '#55acee', 
    fontFamily: CONSTANT.PoppinsRegular 
  },
  ArticleCardTitleArea:{ 
    flexDirection: 'column', 
    marginTop: 2 
  },
  ArticleCardTitleText:{ 
    color: '#484848', 
    fontSize: 15, 
    fontFamily: CONSTANT.PoppinsBold 
  },
  ArticleCardMultiViewArea:{ 
    flexDirection: 'row', 
    width: '100%' 
  },
  ArticleCardArea40:{ 
    flexDirection: 'row', 
    width: '40%', 
    alignItems: 'center', 
    marginRight: 8 
  },
  ArticleCardArea20:{ 
    flexDirection: 'row', 
    width: '20%', 
    alignItems: 'center', 
    marginRight: 8 
  },
  ArticleCardTextStyle:{ 
    marginLeft: 3, 
    color: '#767676', 
    fontSize: 12, 
    fontFamily: CONSTANT.PoppinsRegular 
    },

  //------------------------- DetailDoctorScreen Styles ------------------------
  DetailDoctordocContentstyle: {
    alignSelf: "center",
    flexDirection: "column",
    marginTop: 15
  },
  DetailDoctortitleStyle: {
    textAlign: "center",
    color: CONSTANT.primaryColor,
    fontSize: 13,
    fontFamily: CONSTANT.PoppinsRegular
  },
  DetailDoctorDocName: {
    textAlign: "center",
    color: CONSTANT.primaryColor,
    fontSize: 17,
    fontFamily: CONSTANT.PoppinsMedium
  },
  DetailDoctorbuttonStyle1: {
    width: "35%",
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#3fabf3",
    borderBottomColor: "#3fabf3",
    fontFamily: CONSTANT.PoppinsMedium,
    borderWidth: 0,
    marginTop: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    shadowRadius: 15,
    marginBottom: 45,
    fontSize: 12,
    borderRadius:5,
  },
  DetailDoctorbuttonStyle2: {
    width: "35%",
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#1abc9c",
    borderBottomColor: "#1abc9c",
    marginLeft: 10,
    borderWidth: 0,
    marginTop: 5,
    fontFamily: CONSTANT.PoppinsMedium,
    shadowRadius: 15,
    marginBottom: 45,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    fontSize: 12,
    borderRadius:5,
  },
  DetailDoctorbuttonStyle3: {
    width: "15%",
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#fff",
    borderColor: "#fe736e",
    marginLeft: 10,
    borderWidth: 0,
    borderWidth: 3,
    marginBottom: 40,
    shadowRadius: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    fontSize: 12,
    borderRadius: 4,
    paddingTop: 5,
    fontFamily: CONSTANT.PoppinsMedium,
  },
  DetailDoctoraboutContentStyle: {
    fontFamily: CONSTANT.PoppinsRegular,
    marginHorizontal:10,
    textAlign:'left'
  },
  DetailDoctormainServiceName: {
    color: "#484848",
    fontSize: 15,
    margin: 24,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  DetailDoctorCollapseHeaderImageStyle: {
    margin: 15,
    width: 35,
    height: 35
  },
  DetailDoctormainLayoutServices: {
    flexDirection: "row",
    height: 70
  },
  DetailDoctorMainArea:{
    backgroundColor: "#fff",
    height: 195,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
    marginTop: 50,
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: CONSTANT.primaryColor
  },
  DetailDoctorImageArea:{
    width: "100%",
    marginTop: -60,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  DetailDoctorImageStyle:{
    height: 80,
    width: 80,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 40,
    marginTop: 20,
    borderColor: CONSTANT.primaryColor
  },
  DetailDoctorNameArea:{
    flexDirection: "row",
    marginTop: 2,
    alignSelf: "center"
  },
  DetailDoctorNameAreaIcon:{
    alignSelf: "center",
    textAlign: "center",
    marginTop: 2,
    marginLeft: 2,
    marginRight: 1
  },
  DetailDoctorDegreeText:{
    marginTop: 2,
    color: CONSTANT.primaryColor,
    textAlign: "center",
    fontSize: 14,
    fontFamily: CONSTANT.PoppinsRegular
  },
  DetailDoctorRatingArea:{
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 2
  },
  DetailDoctorRatingText:{
    marginLeft: 10,
    color: CONSTANT.primaryColor,
    fontSize: 12,
    fontFamily: CONSTANT.PoppinsRegular
  },
  DetailDoctorButtonsArea:{
    width: "100%",
    position:'absolute',
    bottom:'-35%',
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center"
  },
  DetailDoctorButtonText:{
    fontFamily:CONSTANT.PoppinsMedium , 
    color:'#fff',
  },
  DetailDoctorSectionsMainArea:{ 
    marginLeft: 15, 
    marginRight: 15, 
    marginTop: 40 
  },
  DetailDoctorBorderLeft:{
    borderLeftColor: "#dddddd",
    borderLeftWidth: 0.6,
    paddingTop: 20
  },
  DetailDoctorCollapseHeaderIcon:{
    alignSelf: "flex-end",
    marginTop: -62,
    padding: 20
  },
  DetailDoctorCollapseBodyArea:{ 
    paddingLeft: 5, 
    marginTop: 8 
  },
  DetailDoctorCollapseBodyTextArea:{
    flexDirection: 'column',
    backgroundColor: "#f7f7f7",
    marginTop: 5,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
  },
  DetailDoctorCollapseBodyText:{
    marginTop: 5,
    marginLeft: 5,
    fontFamily:CONSTANT.PoppinsBold,
    textAlign:'left'
  },
  DetailDoctorCollapseBodyPriceArea:{
    flexDirection:'row', 
    alignItems:'center' 
  },
  DetailDoctorCollapseBodyPriceTextArea:{
    flexDirection:'row', 
    marginRight:10, 
    marginLeft:5,
  },
  DetailDoctorCollapseBodyPriceText:{
    fontFamily:CONSTANT.PoppinsMedium,
  },
  DetailDoctorRegistrationArea:{
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginRight: 3,
    marginBottom: 5,
    borderRadius: 4
  },
  DetailDoctorRegistrationText:{
    color: "#484848",
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginRight: 10,
    fontFamily: CONSTANT.PoppinsMedium,
    marginBottom: 15
  },
  DetailDoctorGalleryArea:{
    flex: 1, 
    backgroundColor: "#fff" , 
    height:200
  },

  //--------------------------- LocationsCard Styles ---------------------------
  locationsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 8,
    marginRight: 2,
    paddingRight: 5
  },
  locationsMainTopRatedStyle: {
    flexDirection: 'row'
  },
  locationsImageStyle: {
    flex: 1,
    width: 120,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  locationsDocContentstyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  locationsTitleStyle: {
    color: '#6cb7f0',
    fontSize: 13,
    marginTop: 10,
    fontFamily: CONSTANT.PoppinsRegular
  },
  locationsImageLayoutStyle: {
    elevation: 4,
    shadowColor: '#000',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    overflow: 'hidden',
    width: 120,
    height: 175,
  },
  locationsDocName: {
    color: '#3d4461',
    fontSize: 15,
    fontFamily: CONSTANT.PoppinsMedium
  },
  locationsFeaturedImageArea:{
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 30,
    borderTopWidth: 30,
    borderTopLeftRadius: 4,
    overflow: "visible",
    borderRightColor: "transparent",
    borderTopColor: "#ff5851"
  },
  locationsFeaturedImageStyle:{
    position: 'absolute',
    width: 15,
    height: 15,
    top: 4,
    left: 3
  },
  locationsDocNameArea:{ 
    flexDirection: 'row', 
    marginTop: 2 
  },
  locationsIconStyle:{
    alignSelf: "center",
    textAlign: "center",
    marginTop: 2,
    marginLeft: 2,
    marginRight: 1,
    marginRight: 5
  },
  locationsTextStyle1:{ 
    marginTop: 2, 
    color: "#767676", 
    fontSize: 13, 
    fontFamily: CONSTANT.PoppinsRegular 
  },
  locationsTextStyle2:{ 
    marginTop: 2, 
    color: "#76d7c4", 
    fontSize: 13, 
    fontFamily: CONSTANT.PoppinsRegular 
  },

  //--------------------------- MessageDoctor Styles ---------------------------
  MessageDoctorTextInputLayout: {
    height: 150,
    color: '#323232',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginTop:10,
    marginRight:10,
    marginLeft: 10,
    marginBottom: 10,
    textAlignVertical:'top'
  },

  //---------------------- OnlineConsultationCard Styles -----------------------
  consultationContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 4,
    paddingRight: 10
  },
  consultationMain:{
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 15,
    borderRadius: 4
  },
  consultationImageArea:{ flexDirection: "row" },
  consultationImageStyle:{ 
    height: 40, 
    width: 40, 
    borderRadius: 40 / 2, 
    alignSelf:'center' 
  },
  consultationTextArea:{ 
    flexDirection: "column", 
    marginTop: 8 
  },
  consultationText1:{
    color: "#484848",
    fontSize: 15,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsBold
  },
  consultationText2:{
    color: "#484848",
    fontSize: 13,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsMedium
  },
  consultationCommentText:{ 
    marginTop: 10  , 
    fontFamily:CONSTANT.PoppinsRegular 
  },

  //----------------------- PatientFeedBackCard Styles -------------------------
  

  //--------------------------- FavArticles Styles -----------------------------
  favArticleContainer: {
    flex: 1,
  },
  favArticleTopRatedCardManagment: {
    marginRight: 5,
    marginLeft: 5,
  },
  favArticleArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favArticleImageStyle: {
    width: 250,
    height: 250,
  },
  favArticleOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  favArticleNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },

  //---------------------------- FavDoctors Styles -----------------------------
  favDoctorsContainer: {
    flex: 1,
  },
  favDoctorsTopRatedCardManagment: {
    flex:1,
  },
  favDoctorsListStyle: {paddingHorizontal: 5, paddingVertical:10},
  favDoctorsArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favDoctorsImageStyle: {
    width: 250,
    height: 250,
  },
  favDoctorsOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  favDoctorsNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },

  //--------------------------- FavHospitals Styles ----------------------------
  favHospitalsContainer: {
    flex: 1,
  },
  favHospitalsTopRatedCardManagment: {
    flex:1
  },
  favHospitalsArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  favHospitalsImageStyle: {
    width: 250,
    height: 250,
  },
  favHospitalsOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  favHospitalsNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },

  //------------------------- FavouriteListing Styles --------------------------
  favListingContainer: {
    flex: 1,
  },
  favListingTebHeadingFontFamily:{
    fontFamily:CONSTANT.PoppinsMedium,
  },
  favListingTextStyle: {fontSize: 15},
  favListingUnderlineStyle: {color: '#3fabf3'},
  favListingStyle: {height: '100%'},

  //---------------------------- AddFeedback Styles ----------------------------
  addFeedbackContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addFeedbackText:{
    fontSize: 15, 
    margin: 10, 
    fontWeight: '700'
  },
  AddFeedbackRadioArea:{ marginLeft: 10 },

  //----------------------------- AboutUs Styles -------------------------------
  aboutUsMainText:{
    margin:20 , 
    fontSize:20 , 
    fontFamily:CONSTANT.PoppinsMedium,
    textAlign:'left',
  },
  aboutUsView:{
    flexDirection:'row', 
    marginLeft:20, 
    marginBottom:10
  },
  aboutUsTextArea:{
    flexDirection:'row', 
    marginRight:10
  },
  aboutUsTextRegular:{
    fontSize:16 , 
    fontFamily:CONSTANT.PoppinsRegular, 
  },
  aboutUsTextBold:{
    fontSize:16 , 
    fontFamily:CONSTANT.PoppinsBold,
  },

  //----------------------------- Contact Styles -------------------------------
  contactMainArea:{
    margin: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contactTextArea:{
    marginBottom:20, 
    justifyContent:'center',
    alignItems:'center'
  },
  contactHeadingText:{
    fontSize: 20, 
    fontFamily: CONSTANT.PoppinsBold, 
  },
  contactInfoText:{
    fontSize: 18, 
    marginTop: 10, 
    fontFamily: CONSTANT.PoppinsMedium,
  },

  //---------------------------- GetAnswers Styles -----------------------------
  getAnswersMainArea: {justifyContent: 'center', height: '100%'},
  getAnswersActivityIndicatorStyle: {
    height: 30,
    width: 30,
    borderRadius: 60,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  getAnswersScrollArea: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  getAnswersTextArea: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  getAnswersHealthText: {
    color: '#323232',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  getAnswersTitleText: {
    color: CONSTANT.primaryColor,
    textAlign: 'center',
    fontSize: 25,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  getAnswersDescriptionText: {
    color: '#323232',
    textAlign: 'center',
    fontSize: 13,
    marginLeft: 30,
    marginRight: 30,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  getAnswersTouchableArea: {
    alignItems: 'center',
    height: 40,
    margin: 15,
    borderRadius: 4,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#3fabf3',
  },
  getAnswersTouchableText: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 10,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  getAnswersBackgroundArea: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  getAnswersBackgroundTextArea: {flexDirection: 'row'},
  getAnswersAddNow: {
    width: '30%',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 15,
  },
  getAnswersItemArea: {marginLeft: 5, marginRight: 5, marginBottom: 5},
  getAnswersItemText: {
    color: '#3d4461',
    width: '98%',
    fontSize: 17,
    margin: 10,
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign:'left'
  },
  getAnswersPostAnswer: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily:CONSTANT.PoppinsMedium
  },
  getAnswersGetAnswersArea: {flexDirection: 'row'},
  getAnswersListStyle: {paddingLeft: 5},
  getAnswersRBSheetMainArea: {
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius:6,
    borderBottomRightRadius:6
  },
  getAnswersRBSheetPostQuestionArea: {backgroundColor: '#3d4461', height: 50},
  getAnswersRBSheetPostQuestionText: {
    width: '100%',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 10,
  },
  getAnswersRBSheetSpecialityArea: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getAnswersRBSheetSpecialityScrollArea: {width: '100%'},
  getAnswersRBSheetSpecialityMultiArea: {marginLeft: 10, marginRight: 10, marginTop: 10},
  getAnswersRBSheetSpecialityMultiStyle: {marginLeft: 10, marginRight: 10, marginBottom: 10},
  getAnswersRBSheetSpecialityDropdown: {backgroundColor: '#000'},
  getAnswersRBSheetSpecialityWrapper: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 10,
  },
  getAnswersRBSheetSpecialitySubDropdown: {
    backgroundColor: '#fff',
    paddingRight: -7,
    height: 55,
    paddingLeft: 10,
    borderWidth: 0.6,
    borderColor: '#fff',
    borderColor: '#dddddd',
    borderRadius: 4,
  },
  getAnswersRBSheetQueryArea: {
    borderWidth: 0.6,
    margin: 10,
    borderRadius: 4,
    borderColor: '#dddddd',
  },
  getAnswersRBSheetQueryText: {
    fontSize: 15,
    padding: 5,
    height: 40,
    color: '#323232',
  },
  getAnswersRBSheetDetailArea: {
    height: 150,
    borderWidth: 0.6,
    margin: 10,
    borderRadius: 4,
    borderColor: '#dddddd',
  },
  getAnswersRBSheetDetailText: {
    fontSize: 15,
    height: 150,
    padding: 5,
    height: 40,
    color: '#323232',
  },
  getAnswersRBSheetAskQuery: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    top: 18,
  },

  //----------------------- HealthForumAnswerCard Styles -----------------------
  healthForumAnswerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 2,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthForumAnswerMainLayoutServices: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  healthForumAnswerMainArea: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingRight: 10,
  },
  healthForumAnswerImageArea: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  healthForumAnswerImageStyle: {width: 60, height: 60, borderRadius: 4},
  healthForumAnswerTextArea: {flexDirection: 'column', justifyContent: 'center'},
  healthForumAnswerNameText: {
    color: '#484848',
    fontSize: 16,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsMedium,
    marginRight: 10,
    textAlign:'left'
  },
  healthForumAnswerDataText: {
    color: '#3d4461',
    fontSize: 13,
    marginLeft: 10,
    marginRight: 10,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  healthForumAnswerDetailText: {
    color: '#484848',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign:'left'
  },

  //-------------------------- HealthForumCard Styles --------------------------
  healthForumContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 2,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthForumMainLayoutServices: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  healthForumMainServiceNameArea:{flexDirection:'row'},
  healthForumMainServiceName: {
    color: '#3d4461',
    fontSize: 13,
    marginLeft: 20,
    marginRight: 10,
    fontFamily:CONSTANT.PoppinsRegular,
    alignSelf:'flex-start',
    textAlign:'left'
  },
  healthForumMainServiceName2: {
    color: '#3d4461',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular,
    alignSelf:'flex-start',
    textAlign:'left'
  },
  healthForumMainArea: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingRight: 10,
  },
  healthForumImageArea: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#ff5851',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  healthForumImageStyle: {
    width: 30,
    height: 30
  },
  healthForumTextArea: {flexDirection: 'column'},
  healthForumNameText: {
    color: '#484848',
    fontSize: 16,
    marginLeft: 20,
    fontFamily:CONSTANT.PoppinsMedium,
    marginRight: 20,
    alignSelf:'flex-start',
    textAlign:'left'
  },
  healthForumDataText: {
    color: '#3d4461',
    fontSize: 13,
    marginLeft: 20,
    marginRight: 20,
    fontFamily:CONSTANT.PoppinsRegular,
    alignSelf:'flex-start',
    textAlign:'left'
  },
  healthForumDetailText: {
    color: '#484848',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    fontFamily:CONSTANT.PoppinsRegular,
    alignSelf:'flex-start',
    textAlign:'left'
  },

  //-------------------------- SearchQuestions Styles --------------------------
  searchQuestionMainArea: {
    justifyContent: 'center', 
    height: '100%'
  },
  searchQuestionActivityIndicator: {
    height: 30,
    width: 30,
    borderRadius: 60,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  searchQuestionScrollImageBackground: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchQuestionScrollTextArea: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchQuestionScrollTitleText: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    fontFamily:CONSTANT.PoppinsRegular,
  },
  searchQuestionScrollSubTitleText: {
    color: CONSTANT.primaryColor,
    textAlign: 'center',
    fontSize: 25,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  searchQuestionScrollDescriptionText: {
    color: '#323232',
    textAlign: 'center',
    fontSize: 13,
    marginLeft: 30,
    marginRight: 30,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  searchQuestionTouchableArea: {
    alignItems: 'center',
    height: 40,
    margin: 15,
    borderRadius: 4,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#3fabf3',
    fontFamily:CONSTANT.PoppinsBold,
  },
  searchQuestionTouchableText: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 10,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  searchQuestionScrollSearchArea: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  searchQuestionScrollSearchTextArea: {flexDirection: 'row'},
  searchQuestionScrollSearchTouchableArea: {
    width: '30%',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 15,
  },
  searchQuestionScrollSearchTextInputArea: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  searchQuestionSearchTouchableText: {
    color: '#fff',
    fontSize: 14,
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign: 'center',
  },
  searchQuestionHealthArea: {flexDirection: 'row'},
  searchQuestionHealthListStyle: {paddingLeft: 5},
  searchQuestionRBSheetMainArea: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  searchQuestionRBSheetTextArea: {
    backgroundColor: '#3d4461', 
    height: 50
  },
  searchQuestionRBSheetTextStyle: {
    width: '100%',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 10,
  },
  searchQuestionRBSheetScrollArea: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10
  },
  searchQuestionRBSheetScrollStyle: {width: '100%'},
  searchQuestionRBSheetTitleText: {
    fontSize: 15,
    padding: 5,
    height: 40,
    color: '#323232',
  },
  searchQuestionRBSheetDescriptionText: {
    fontSize: 15,
    height: 150,
    padding: 5,
    height: 40,
    color: '#323232',
  },
  searchQuestionButtonHover: {
    flexDirection:"row",
    width: 150,
    height: 50,
    backgroundColor: '#3fabf3',
    marginLeft: 10,
    marginBottom: 25,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent:'center',
    alignItems:'center'
  },
  searchQuestionRBSheetTouchableText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  //------------------------------- Home Styles --------------------------------
    BannerTextStyle: {
      color: '#fff',
    },
    BannerTextDocStyle: {
      fontWeight: '700',
      color: '#fff',
    },
    locationText: {
      fontSize: 20,
      margin: 10,
      color: '#fe736e',
      fontFamily:CONSTANT.PoppinsBold,
    },
    AdvanceSearchText: {
      fontSize: 20,
      margin: 10,
      color: '#3d4461',
      fontFamily: CONSTANT.PoppinsBold,
    },
    inputText: {
      marginLeft: 10,
    },
    input: {
      marginLeft: 15,
      marginRight: 15,
    },
    buttonStyle: {
      width: 150,
      height: 45,
      backgroundColor: '#3fabf3',
      borderBottomColor: '#3fabf3',
      marginLeft: 15,
      borderWidth: 0,
      marginTop: 5,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      marginBottom: 25,
      shadowOffset: {width: 1, height: 13},
      fontSize: 15,
    },
    DocbuttonStyle: {
      width: 100,
      height: 50,
      backgroundColor: '#3fabf3',
      borderBottomColor: '#3fabf3',
      marginLeft: 15,
      borderWidth: 0,
      marginTop: 5,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      marginBottom: 25,
      shadowOffset: {width: 1, height: 13},
      fontSize: 17,
      top: 10,
      alignSelf: 'flex-end',
      marginRight: 15,
    },
    singleline: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 0.6,
    },
    CurrentLocationStyle: {
      backgroundColor: '#fcfcfc',
      padding: 15,
      flexDirection: 'row',
    },
    CurrentLocationTextStyle: {
      color: '#55acee',
      fontSize: 16,
    },
    iconStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    mainHeader: {
      display: 'flex',
      flex: 1,
      width: '100%',
      alignSelf: 'flex-end',
      backgroundColor: '#3d4461',
      height: 65,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowColor: '#000',
      elevation: 3,
      borderBottomLeftRadius: 50,
      overflow: 'hidden',
      flexDirection: 'row',
      textAlign: 'right',
    },
    docdemostyle: {
      marginLeft: 15,
      alignSelf: 'flex-start',
    },
    buttonStyledoc: {
      width: 145,
      height: 50,
      backgroundColor: '#3fabf3',
      borderBottomColor: '#3fabf3',
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: {width: 1, height: 13},
      fontSize: 17,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      textAlign: 'right',
      justifyContent: 'flex-end',
    },
    TopCategoryTextStyle: {
      color: '#3d4461',
      fontSize: 20,
      marginTop: 20,
      marginLeft: 10,
      fontFamily: CONSTANT.PoppinsBold,
    },
    TopRatedTextStyle: {
      color: '#3d4461',
      fontSize: 20,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 5,
      fontFamily: CONSTANT.PoppinsBold,
    },
    TopCatCardManagment: {
      marginRight: 10,
      marginLeft: 10,
      flexDirection: 'row',
    },
    TopRatedCardManagment: {
      marginRight: 5,
      marginLeft: 5,
    },
    AdnanceSearchStyle: {
      color: '#767676',
      fontSize: 15,
      textAlign: 'right',
      fontFamily:CONSTANT.PoppinsRegular
    },
    borderStyle: {
      borderRadius: 2,
      borderWidth: 0.6,
      borderColor: '#dddddd',
      backgroundColor: '#fff',
      height: 55,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    buttonHover: {
      width: 120,
      height: 50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#3fabf3',
      marginLeft: 10,
      marginTop: 5,
      shadowRadius: 15,
      marginBottom: 25,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowColor: '#000',
      elevation: 3,
      borderRadius: 4,
      overflow: 'hidden',
    },
    buttonHoverText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    AdvanceSearchArea: {
      //display: this.state.AdvanceSearchDisplay,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight: 10,
      marginBottom: 25,
      marginTop: -70,
    },
    AdvanceSearchIcon: {
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 2,
      marginLeft: 2,
      marginRight: 1,
    },
    // radioStyles: {
    //   paddingLeft: 15,
    //   paddingTop: 0,
    //   flexDirection: 'row',
    //   display: 'flex',
    //   width: '100%',
    // },
    // advanceSearchSection: {
    //   marginLeft: 10,
    //   marginRight: 10,
    //   marginBottom: 10,
    // },
    // mianWrapperStyles: {
    //   backgroundColor: '#fff',
    //   borderRadius: 4,
    //   marginTop: 10,
    // },
    // dropdownStyles: {
    //   backgroundColor: '#fff',
    //   paddingRight: -7,
    //   height: 60,
    //   paddingLeft: 10,
    //   borderWidth: 0.6,
    //   borderColor: '#fff',
    //   borderColor: '#dddddd',
    //   borderRadius: 4,
    // },
    buttonClearFilterStyle: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight: 10,
      marginBottom: 25,
      marginTop: -70,
    },
    AdvanceSearchIconStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 2,
      marginLeft: 2,
      marginRight: 1,
    },
    HomeHeader: {backgroundColor: '#fff'},
    bannerArea: {
      flexDirection: 'row',
      backgroundColor: '#3d4461',
      height: 70,
      width: '100%',
      borderBottomLeftRadius: 50,
      paddingHorizontal: 10,
      //paddingRight: 15,
    },
    bannerImgArea: {
      width: '20%',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowColor: '#000',
      elevation: 3,
    },
    bannerImage: {
      height: 75,
      width: 75,
      position: 'absolute',
      resizeMode : 'contain',
      bottom: 0,
      transform:I18nManager.isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]
    },
    bannerTextArea: {
      width: '50%',
      justifyContent: 'center',
      alignItems:'center'
    },
    bannerTextOne: {
      color: '#d4d5d9',
      fontSize: 12,
      fontFamily:CONSTANT.PoppinsRegular
    },
    bannerTextTwo: {
      color: '#fff',
      fontSize: 18,
      fontFamily:CONSTANT.PoppinsBold
    },
    bannerButtonArea: {
      width: '30%',
      justifyContent: 'center',
      alignItems:'flex-end'
    },
    bannerButton: {
      height: 40,
      width: 105,
      backgroundColor: '#3fabf3',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerButtonText: {
      color: '#fff',
      fontSize: 15,
      fontFamily:CONSTANT.PoppinsRegular
    },
    TopCatCardArea: {
      marginLeft: -5,
    },
    TopRatedFlatlistStyle: {paddingBottom:10},
    
  //-------------------------- TopCategoryCard Styles --------------------------
    TopCategoryCardcontainer: {
      padding:5,
      elevation:3,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowColor: "#000",
    },
    CardMainView:{
      flexDirection:'row',
      borderRadius:4,
      height:80,
      elevation:3,
      shadowColor:'#000',
      overflow:'hidden',
    },
    ThirdLayerStyle:{ 
      flexDirection:'row',
      position:'relative',
      backgroundColor:'#fff',
      opacity:0.16,
      width:80,
      height:80,
      borderTopRightRadius:40,
      borderBottomRightRadius:40,
      
    },
    SecondLayerStyle:{
      marginLeft:-88,
      backgroundColor:'#fff',
      opacity:0.32,
      width:80,
      height:80,
      borderTopRightRadius:40,
      borderBottomRightRadius:40,
      
    },
    FirstLayerStyle:{
      marginLeft:-89,
      backgroundColor:'#fff',
      width:80,
      height:80,
      borderTopRightRadius:40,
      borderBottomRightRadius:40,
      alignContent:'center',
      alignItems:'center'
    },
    CatImageStyle:{
        width:30,
        height:30,
        alignSelf:'center',
        justifyContent:'center',
        top:25,
        left:5,
    },
    CardMainViewText: {
      color:'#fff',
      fontSize:13,
      top:28,
      marginLeft:25,
      marginRight:20,
      fontFamily:CONSTANT.PoppinsMedium
    },
  //--------------------------- TopRatedCard Styles ----------------------------
  TopRatedCardcontainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      elevation: 3,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowColor: '#000',
      borderRadius: 4,
      flexDirection: 'row',
      marginHorizontal: 10,
      marginBottom:10,
      padding: 10,
  },
  ImageStyle: {
      height: 80,
      width: 80,
  },
  docContentstyle: {
      flexDirection: 'column',
      paddingHorizontal: 10,
      alignSelf: 'center',
      alignItems:'flex-start',
      width:'70%',
  },
  titleStyle: {
      color: '#6cb7f0',
      fontSize: 13,
      fontFamily:CONSTANT.PoppinsRegular,
      textAlign:'left'
  },
  ImageLayoutStyle: {
      elevation: 4,
      shadowColor: '#000',
      borderRadius: 4,
      overflow: 'hidden',
      width: 80,
      height: 80,

  },
  DocName: {
      color: '#3d4461',
      fontSize: 15,
      fontFamily:CONSTANT.PoppinsMedium,
      marginRight:3
  },
  topRatedCardArea: {
      position: 'absolute',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: 30,
      borderTopWidth: 30,
      borderTopLeftRadius: 4,
      overflow: 'visible',
      borderRightColor: 'transparent',
      borderTopColor: '#ff5851',
  },
  topRatedCardImage: {
      position: 'absolute',
      width: 15,
      height: 15,
      top: 4,
      left: 3,
  },
  topRatedCardName: {flexDirection: 'row', marginTop: 2, flexWrap:'wrap'},
  topRatedCardIconOne: {
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 2,
      marginRight: 3,
  },
  topRatedCardIconTwo: {
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 2,
  },
  topRatedCardTextOne: {
      marginTop: 2,
      color: '#767676',
      fontSize: 13,
      fontFamily:CONSTANT.PoppinsRegular,
  },
  topRatedCardTextTwo: {
      marginRight: 10,
      color: '#767676',
      fontSize: 13,
      marginTop: -2,
      fontFamily:CONSTANT.PoppinsRegular
  },
  topRatedStarArea: {
      flexDirection: 'row',
      marginTop: 4
  },

  //----------------------------- Location Styles ------------------------------
  Locationcontainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  LocationlocationText: {
    margin: 15,
    color: "#fe736e",
    fontWeight: "700"
  },
  LocationinputText: {
  },
  Locationinput: {
    marginLeft: 15,
    marginRight: 15,
  },
  LocationbuttonStyle: {
    width: 130,
    height: 50,
    backgroundColor: "#3fabf3",
    borderBottomColor: "#3fabf3",
    marginLeft: 15,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: { width: 1, height: 13 },
  },
  Locationsingleline: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 0.6
  },
  LocationCurrentLocationStyle: {
    backgroundColor: "#fcfcfc",
    padding: 15,
    flexDirection: "row"
  },
  LocationCurrentLocationTextStyle: {
    color: "#55acee",
  },
  LocationiconStyle: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "flex-end",
  },

  //------------------------ MessageDetailLayout Styles ------------------------
  messageDetailMainTopRatedStyle: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageDetailImageStyle: {
    height: 40,
    width: 40,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
  messageDetaildocContentstyle: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  messageDetailDocName:{
    color: '#fff',
    fontSize: 15,
    fontFamily: CONSTANT.PoppinsMedium,
  },
  messageDetailtitleStyle: {
    color: '#fff',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular
    },
  messageDetailImageLayoutStyle: {
    elevation: 4,
    shadowColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageDetailTextInputLayout: {
    paddingTop:15,
    height: 51,
    width: '80%',
    color: '#323232',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginHorizontal: 10,
    marginVertical:5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    fontFamily:CONSTANT.PoppinsRegular,
  },
  messageDetailFetchStyle: {
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    backgroundColor: '#3d4461',
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
  },
  messageDetailTouchableStyle: {
    flexDirection: 'column',
    display: 'flex',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  messageDetailTopRatedArea: {
    flexDirection: 'column',
    display: 'flex',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  messageDetailTopRated: {flexDirection: 'row'},
  messageDetailListStyle: {height: '80%', marginBottom: 5, marginTop: 15},
  messageDetailListTouchableArea: {
    flexDirection: 'column',
    margin: 5,
    width: '100%',
    paddingLeft: 10,
    paddingRight:10,
  },
  messageDetailListTouchableTextArea: {
    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    maxWidth: '80%',
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderRadius: 6,
    borderColor: '#dddddd',
  },
  messageDetailListTouchableMessageText: {
    color: '#000',
    fontSize: 14,
    fontWeight:'500',
    color: '#323232',
    padding: 10,
    fontFamily:CONSTANT.PoppinsRegular
  },
  messageDetailListTouchableDateText: {
    color: '#767676',
    fontSize: 10,
    marginTop: 2,
    marginLeft: 5,
    marginRight:5,
    fontFamily:CONSTANT.PoppinsRegular
  },
  messageDetailListTouchableChatArea: {
    flexDirection: 'column',
    margin: 5,
    width: '100%',
    paddingRight: 15,
  },
  messageDetailListTouchableChatMessageStyle: {
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    maxWidth: '80%',
    backgroundColor: CONSTANT.primaryColor,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    justifyContent: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    borderWidth: 0.6,
    borderRadius: 6,
    borderColor: '#dddddd',
  },
  messageDetailListTouchableChatMessageText: {
    color: '#000',
    fontSize: 14,
    fontWeight:'500',
    padding: 10,
    color: '#fff',
    fontFamily:CONSTANT.PoppinsRegular,
    textAlign:'left',
  },
  messageDetailListTouchableChatDateStyle: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  messageDetailListTouchableChatDateText: {
    color: '#767676',
    fontSize: 10,
    marginTop: 2,
    marginLeft: 10,
    fontFamily:CONSTANT.PoppinsRegular
  },
  messageDetailListTouchableChatDateIcon: {marginLeft: 5},
  messageDetailTextInputArea: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',

  },
  messageDetailTextInputStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf:'center',
    height: 51,
    borderRadius:25.5,
    //marginLeft:10,
    width: 51,
    elevation: 4,
    //marginTop:5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },

  //----------------------- ReceiveMessageLayout Styles ------------------------
  ReceivedMessagescontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderColor: '#dddddd',
    borderWidth: 1,
  },

  //------------------------- MessageMainLayout Styles -------------------------
  mainLayoutcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  mainLayoutMainTopRatedStyle: {
    width: '90%',
    flexDirection: 'row',
  },
  mainLayoutImageStyle: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 30,
  },
  mainLayoutdocContentstyle: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight:10,
    width: '80%',
    alignItems:'flex-start',
    justifyContent:'center'
  },
  mainLayouttitleStyle: {
    color: '#6cb7f0',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  mainLayoutImageLayoutStyle: {
    elevation: 4,
    shadowColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mainLayoutDocName: {
    color: '#3d4461',
    fontSize: 15,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  mainLayoutcircle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#fe736e',
    marginRight: 5,
  },
  mainLayoutArea: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  mainLayoutCircleArea: {width: '10%'},
  docTextArea: {
    flexDirection: 'row',
    marginTop: 2,
  },
  mainLayoutCountArea: {
    backgroundColor: CONSTANT.primaryColor,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  mainLayoutCountText: {
    color: '#fff',
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //---------------------------- MessagesMain Styles ---------------------------
  messagesMainTouchableStyle: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'column',
    marginTop: 3,
    marginLeft: 5,
    marginRight: 7,
    marginBottom: 3,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  messagesMainScrollArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesMainScrollImageStyle: {
    width: 250,
    height: 250,
  },
  messagesMainScrollOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  messagesMainScrollNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },

  //----------------------------- PreLoader Styles -----------------------------
  PreLoadercontainer: {
    flex: 1,
  },
  PreLoadersplashBackground:{
    backgroundColor: '#e8f6ff',
    height: "100%",
  },
  PreLoadersplashImageStyle:{
    justifyContent:'center',
    alignSelf:'center',
    top:'45%',
    width:150,
    height:100,
    resizeMode: "center"
  },
  PreLoaderindicatorStyle:{
    top:'80%'
  },

  //-------------------------- PersonalDetail Styles ---------------------------
  PersonalDetailbuttonHover: {
    width: 150,
    height: 50,
    backgroundColor: '#3fabf3',
    borderBottomColor: '#3fabf3',
    marginLeft: 10,
    borderWidth: 0,
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    marginBottom: 25,
    shadowOffset: {width: 1, height: 13},
    fontSize: 13,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent:'center',
    alignItems: 'center',
  },
  PersonalDetailbuttonText:{
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  PersonalDetailmap: {
    height:250,
    borderRadius:5
  },
  PersonalDetailSectionsStyle:{
    backgroundColor: '#fff',
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  PersonalDetailCustomTextInputArea:{
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  PersonalDetailCustomTextInputStyle:{
    paddingLeft: 10,
    borderRadius: 2,
    height: 50,
    color: '#323232',
    borderWidth: 0.6,
    borderColor: '#dddddd',
    marginBottom: 10,
    width: '80%',
  },
  PersonalDetailCustomTextInputIconArea:{
    backgroundColor: '#3d4461',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  PersonalDetailCollapseHeaderArea:{
    height: 50,
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: '#f7f7f7',
    marginHorizontal:10,
    marginBottom:5,
    borderWidth: 0.6,
    borderColor: '#dddddd',
    borderRadius: 2,
    overflow:'hidden',
  },
  PersonalDetailCoollapseHeaderTextArea:{
    width:'65%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'flex-start'
  },
  PersonalDetailPhoneNumbersText:{
    alignSelf: 'center',
    paddingLeft: 10,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  PersonalDetailCoollapseHeaderText:{
    paddingLeft: 10,
    textAlignVertical: 'center',
    fontFamily:CONSTANT.PoppinsRegular,
  },
  PersonalDetailDeleteBTN:{
    backgroundColor: '#ff5851',
    width: '15%',
    justifyContent: 'center',
    alignItems:'center',
  },
  PersonalDetailEditBTN:{
    backgroundColor: '#3d4461',
    width: '15%',
    justifyContent: 'center',
    alignItems:'center',
  },
  PersonalDetailSectionArea:{
    marginLeft: 5, 
    marginRight: 5, 
    marginBottom: 5
  },
  PersonalDetailImageArea:{
    width: '15%',
    justifyContent: 'center',
    alignItems:'center',
  },
  PersonalDetailImageStyle:{
    height: 50, 
    width: 50, 
    borderRadius: 50 / 2
  },
  PersonalDetailDownloadArea:{
    backgroundColor:'#f7f7f7',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 4,
    borderStyle: 'dashed',
    borderColor: '#dddddd',
    borderWidth: 1,
    height: 150,
    marginBottom: 10,
    marginHorizontal:10
  },
  PersonalDetailDownloadText:{
    color: '#767676', 
    fontSize: 17,
    fontFamily:CONSTANT.PoppinsRegular,
  },
  PersonalDetailFooterArea:{
    backgroundColor: '#3fabf3',
    height: 45,
    width: '45%',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 5,
    marginVertical:10
  },
  PersonalDetailFooterText:{
    color: '#fff',
    fontSize: 16,
    fontFamily:CONSTANT.PoppinsMedium,
  },

  //------------------------ SearchResultScreen Styles -------------------------
  SearchResultScreencontainer: {
    flex: 1
  },
  SearchResultScreenText: {
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  SearchResultScreenNoResultArea: {
    flex: 1,
    alignItems:'center',
    justifyContent: "center",
  },
  SearchResultScreenNoResultImage: {
    resizeMode: "contain",
    height: 200,
    width: 200,
    alignSelf: "center"
  },
  SearchResultScreenNoResultText: {
    fontSize: 25,
    color: CONSTANT.primaryColor,
    fontWeight: "700",
    alignSelf: "center"
  },
  SearchResultScreenMainArea: {
    justifyContent: "center",
    height: "100%"
  },
  SearchResultScreenMainStyle: {
    height: 30,
    width: 30,
    borderRadius: 60,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5
  },
  SearchResultScreenListArea: {
    marginLeft: 7,
    marginRight: 7
  },
  SearchResultScreenfooter: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  SearchResultScreenloadMoreBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  SearchResultScreenbtnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily:CONSTANT.PoppinsMedium,
  },
  SearchResultScreenListStyle: { paddingLeft: 5 },

  //----------------------- SearchResultTopCategory Styles -----------------------
  searchResultTopCategorycontainer: {
    flex: 1,
  },
  searchResultTopCategoryNoResultArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignContent: 'center',
  },
  searchResultTopCategoryNoResultImage: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  searchResultTopCategoryNoResultText: {
    fontSize: 18,
    color: '#3d4461',
    fontWeight: '700',
    alignSelf: 'center',
  },
  searchResultTopCategoryMainArea: {
    justifyContent: 'center',
    height: '100%',
  },
  searchResultTopCategoryMainStyle: {
    height: 30,
    width: 30,
    borderRadius: 60,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  searchResultTopCategoryListArea: {
    marginLeft: 7,
    marginRight: 7,
  },
  searchResultTopCategoryfooter: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchResultTopCategoryloadMoreBtn: {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft:20 ,
    paddingRight:20,
    backgroundColor: CONSTANT.primaryColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultTopCategorybtnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontFamily:CONSTANT.PoppinsMedium,
  },
  searchResultTopCategoryListStyle: {paddingLeft: 5},
  searchResultTopCategoryfavArea: {
    flex: 1,
    marginTop: '40%',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultTopCategoryfavImageStyle: {
    width: 250,
    height: 250,
  },
  searchResultTopCategoryfavOopsText: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  searchResultTopCategoryfavNoDataText: {
    fontSize: 17,
    fontWeight: '700',
  },

  //---------------------- AccountSecuritySetting Styles -----------------------
  Accountsecuritycontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  AccountsecurityScrollArea: {height: '90%'},
  AccountsecurityScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  AccountsecurityScrollDetailText: {
    color: '#323232',
    marginLeft: 10,
    marginRight: 10,
    textAlign:'left'
  },
  AccountsecurityScrollDisableArea: {
    margin: 10,
    flexDirection: 'row',
    width: '100%'
  },
  AccountsecurityScrollDisableText: {
    color: '#323232',
    width: '85%',
    textAlign:'left'
  },
  AccountsecurityScrollSwitch: {
    alignSelf: 'flex-end',
    marginTop: -8,
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },

  //-------------------------- ChangePassword Styles ---------------------------
  changePasswordcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  changePasswordScrollArea: {height: '90%'},
  changePasswordScrollStyle: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 4,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },

  //--------------------------- DeleteAccount Styles ---------------------------
  deleteAccountcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  deleteAccountScrollArea: {height: '90%'},
  deleteAccountScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  deleteAccountMultiStyle: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  deleteAccountMultiDropdownStyle: {backgroundColor: '#000'},
  deleteAccountMultiSearchInput: {color: '#CCC'},

  //---------------------- ManageEmailNotification Styles ----------------------
  emailcontainer: {
    flex: 1,
    height: '100%',
    marginTop: 15,
    backgroundColor: '#f7f7f7',
  },
  emailScrollArea: {height: '90%'},
  emailScrollStyle: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
  },
  emailTextArea:{
    height: 50,
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: "#dddddd",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  emailTextStyle:{
    color: "#323232",
    fontFamily:CONSTANT.PoppinsMedium,
    marginHorizontal:10,
  },

  //------------------------- SecuritySettings Styles --------------------------
  tabBarTextStyle: {fontSize:15},
  tabBarUnderlineStyl: {color:'#3fabf3'},
  tabBarStyle: {height:'100%' },
  SecuritySettingsTouchableStyle: {
    backgroundColor: '#3fabf3',
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  SecuritySettingsTouchableText: {
    color: '#fff',
    fontSize: 16,
  },

  //--------------------------- TeamListCard Styles ----------------------------
  TeamListCardcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    borderRadius: 4,
    flexDirection: 'row',
    margin: 3,
    overflow: 'hidden',
  },
  TeamListCardMainTopRatedStyle: {
    width: '100%',
    margin: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  TeamListCardImageStyle: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  TeamListCarddocContentstyle: {
    flexDirection: 'column',
    marginLeft: 10,
    alignSelf: 'center',
    width: '60%',
  },
  TeamListCardImageLayoutStyle: {
    elevation: 4,
    shadowColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    width: 60,
    height: 60,
  },
  TeamListCardDocName: {
    color: '#3d4461',
    fontSize: 15,
    fontFamily:CONSTANT.PoppinsBold,
  },
  TeamListCardDocNameArea: {
    flexDirection: 'row',
    marginTop: 2
  },
  TeamListCardDocStatusArea: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  TeamListCardDocStatusTextOne: {
    color: '#767676',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  TeamListCardDocStatusTextTwo: {
    marginLeft: 5,
    color: '#767676',
    fontSize: 13,
    fontFamily:CONSTANT.PoppinsBold,
  },
  TeamListCardDocIconArea: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    height: 60,
    width: '25%',
  },

  //---------------------------- TeamListing Styles ----------------------------
  teamListingcontainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  teamListingTopRatedCardManagment: {
    marginRight: 5,
    marginLeft: 5,
  },
  teamListingRenderItem: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
  },
  teamListingRenderItemImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  teamListingRenderItemName: {
    fontSize: 20,
    fontFamily:CONSTANT.PoppinsBold,
    marginTop: 10
  },
  teamListingRenderItemRequest: {
    fontSize: 15,
    marginTop: 5,
    fontFamily:CONSTANT.PoppinsMedium,
  },
  teamListingTouchableArea: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamListingTouchableReject: {
    backgroundColor: '#ff5851',
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  teamListingTouchableApprove: {
    backgroundColor: '#90ee90',
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  teamListingCarousalSlideStyle: {paddingHorizontal: 10},
  teamListingFlatListStyle: {paddingLeft: 5},
  teamListingSectionText: {
    color: '#3d4461',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left'
  },
  teamListingInviteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left'
  },
})