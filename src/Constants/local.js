import React from "react";
import LocalizedStrings from 'react-native-localization';
const strings = new LocalizedStrings({
   "en": {
      BaseUrl: "https://your domian name/wp-json/api/v1/",
      BaseUrlforDownload: "https://your domian name/",

      color: "#ffffff",
      primaryColor: "#3d4461",
      PoppinsBold: 'Poppins-Bold',
      PoppinsItalic: 'Poppins-Italic',
      PoppinsRegular: 'Poppins-Regular',
      PoppinsMedium: 'Poppins-Medium',
      OpenSansBold: 'OpenSans-Bold',
      OpenSansItalic: 'OpenSans-Italic',
      OpenSansRegula: 'OpenSans-Regular',
      PLAY_STORE_LINK: 'Play Store Link',
      APP_STORE_LINK: 'App Store Link',

      Oops: "Oops,",
      NoDataAvailable: "No Data Available",
      OopsNoRecordFound: "Oops , No Record Found",
      Submit: "Submit",
      Description: "Description",
      SaveUpdate: "Save & Update",
      UpdatedSuccessfully: "Updated Successfully",
      Error: "Error",
      LoadMore: "Load More",
      Success: "Success",
      Edit: "Edit",
      Update: "Update",
      Delete: "Delete",
      PleaseLoginFirst: "Please Login First",
      Sorry: "Sorry",
      SelectLanguages: "Select Languages",
      AddCompleteData : "Please add complete data",
      ChangeLanguage : "Change Language",
      ChangLangTitle : "Select One to Change the Language",
      ResendEmail : "Resend Email",
      NoThanks : "No, Thanks",
      Doctor : 'Doctor',
      Hospital : 'Hospital',
      invoices : 'Invoices',
  
      //For SpecialitiesAndServices
      SpecialitiesAndServicesManageServices: "Manage Services",
      SpecialitiesAndServicesAddNewService: "Add New Service:",
      SpecialitiesAndServicesPickSpeciality: "Pick Speciality",
      SpecialitiesAndServicesPickServices: "Pick Services",
      SpecialitiesAndServicesPrice: "Price",
      SpecialitiesAndServicesPriceC: "Price:",
      SpecialitiesAndServicesAddNow: "Add Now",
      SpecialitiesAndServicesAvailableServices: "Available Services:",
      SpecialitiesAndServicesAddCompleteData: "Please Add Complete Data",
  
      //For AddSetting
      AddSettingNewLocation: "Add New Location",
      AddSettingInviteHospital: "Invite Hospital",
      AddSettingPickHospital: "Pick Hospital",
      AddSettingPickInterval: "Pick Interval",
      AddSettingPickDuration: "Pick Duration",
      AddSettingPickStartTime: "Pick Start Time",
      AddSettingEndTime: "Pick End Time",
      AddSettingAvailableServices: "Available Services:",
      AddSettingPricePickService: "Pick Service",
      AddSettingAssignAppointmentSpaces: "Assign Appointment Spaces:",
      AddSettingOtherValue: "Other Value",
      AddSettingDaysIOfferMyServices: "Days I Offer My Services:",
      AddSettingPickDays: "Pick Days",
      AddSettingConsultancyFee: "Consultancy Fee",
      AddSettingOther : "Other",
  
      //For InviteHospitals
      InviteHospitals: "Invite Hospitals",
      InviteHospitalsEmailText: "email",
      InviteHospitalsDescriptionText: "Description",
      InviteHospitalsSubmitBtn: "Submit",
      InviteHospitalsEmailexist: "Email already exist",
      InviteHospitalsFillcompleteform : "Please fill the complete form.",

      //For AppointmentDetailPage
      AppointmentDetailPageheaderText: "Appointment Detail",
      AppointmentDetailPageAccepted: "Accepted",
      AppointmentDetailPagePending: "Pending",
      AppointmentDetailPageRejected: "Rejected",
      AppointmentDetailPagePatientName: "Client Name:",
      AppointmentDetailPageRelationWithUser: "Relation With User:",
      AppointmentDetailPageAppointmentLocation: "Appointment Location:",
      AppointmentDetailPageAppointmentDate: "Appointment Date:",
      AppointmentDetailPageCharges: "Charges:",
      AppointmentDetailPageServicesRequired: "Services Required:",
      AppointmentDetailPageComments: "Comments:",
      AppointmentDetailPageApprove: "Approve",
      AppointmentDetailPageReject: "Reject",
      AppointmentDetailPagelookcode : "Please have a look on your code",

  
      //For AppointmentList
      AppointmentListheaderText: "Appointments",
      AppointmentListRecentAppointments: "Recent Appointments:",
      AppointmentListStatus: "Status",
      AppointmentListAddBooking: "Add Booking",
      AppointmentListPleaseWait: "Please Wait...",
  
      //For AppointmentListPatient
      AppListPatientheaderText: "Appoinments",
      AppListPatientRecentAppointments: "Recent Appointments:",
      AppListPatientStatus: "Status:",
  
      //For AppointmentSettings
      AppointmentSettingsheaderText: "Appointment Settings",
      AppointmentSettingsHospitalheaderText: "Hospital Appointment Settings",
      AppointmentSettingsClinicheaderText: "Clinic Appointment Settings",
      AppointmentSettingsSett : "Settings",
      AppointmentSettingsLocations : "Locations",
  
  
      //For PayoutSetting
      PayoutSettingheaderText: "Payout Settings",
      PayoutMainText: "All the earning will be sent to below selected payout method",
      PayoutYourPayoutDetails: "Your Payout details:",
      PayoutChangePayoutSetting: "Change Payout Setting",
      PayoutBankTransferSetting: "Please add all required settings for the bank transfer.",
      PayoutBankAccountName: "Bank Account Name",
      PayoutBankAccountNumber: "Bank Account Number",
      PayoutBankName: "Bank Name",
      PayoutBankRoutingNumber: "Bank Routing Number",
      PayoutBankIBAN: "Bank IBAN",
      PayoutBankBICSWIFT: "Bank BIC/SWIFT",
      PayoutAddPayPalIDBelow: " You need to add your PayPal ID below in the text field. For more about",
      PayoutPaypal: "Paypal",
      PayoutCreateAnAccount: "Create an account",
      PayoutAddPayPalEmailAddress: "Add PayPal Email Address",
      PayoutYourPayments: "Your Payments:",
      PayoutDate: "Date:",
      PayoutPayoutDetails: "Payout Details:",
      PayoutNoDetail: "No Detail",
      PayoutAmount: "Amount:",
      PayoutPaymentMethod: "Payment Method:",
  
  
      //For BookAppointment
      BookAppointmentMySelf: "Myself",
      BookAppointmentSomeoneElse: "Someone Else",
      BookAppointmentBrother: "Brother",
      BookAppointmentWife: "Wife",
      BookAppointmentMother: "Mother",
      BookAppointmentSister: "Sister",
      BookAppointmentBookAppointment: "Book Appointment",
      BookAppointmentSelectLocation : "Please select the location.",
      BookAppointmentWhoisvisitingtoDoctor: "Who is visiting to the Doctor?",
      BookAppointmentSearch: "Search doctors, hospitals, etc.",
      BookAppointmentEmailAddress: "Email Address",
      BookAppointmentMobileNumber: "Your Mobile Number",
      BookAppointmentPatientName: "Client Name",
      BookAppointmentPickRelation: "Pick Relation...",
      BookAppointmentPickHospital: "Where to Visit?",
      BookAppointmentSelectedServices: "Selected Services:",
      BookAppointmentConsultationFee: "Consultation Fee:",
      BookAppointmentTotalCharges: "Total Charges:",
      BookAppointmentSelectDateTime: "Select Date & Time:",
      BookAppointmentAvailableSlots: "Available Slots:",
      BookAppointmentOccupied: "Occupied",
      BookAppointmentSpace: "Space:",
      BookAppointmentNoSlotAvailable: "No Slot Available",
      BookAppointmentSelectedSlot: "Selected Slot:",
      BookAppointmentBASubmit: "BookAppointmentSubmit",
      BookAppointmentPleaseWait: "PleaseWait",
  
      BookAppointmentUserEmail: "Email Address",
      BookAppointmentUserName: "Client Name",
      BookAppointmentUserPhoneNumber: "Your Phone Number",
  
      //For BookAppointmentCall
      BookAppCallheaderText: "Call Doctor",
      BookAppCallCallForBooking: "Call For Booking",
      BookAppCallPleaseCallOn: "Please Call On",
  
      //For DoctorAddBooking
      DoctorAddBookingPatientOnly: "Patient only",
      DoctorAddBookingSomeoneElse: "Someone Else",
      DoctorAddBookingBrother: "Brother",
      DoctorAddBookingWife: "Wife",
      DoctorAddBookingMother: "Mother",
      DoctorAddBookingSister: "Sister",
      DoctorAddBookingheaderText: "Add Appointment",
      DoctorAddBookingPleaseWait: "PleaseWait...",
      DoctorAddBookingAddPatientDetails: "Add Client Details:",
      DoctorAddBookingNote: "Please add correct email address to find client from the database, if not found then you can add new client into database by typing email address and name",
      DoctorAddBookingFirstName: "First Name",
      DoctorAddBookingEmail: "Email",
      DoctorAddBookingLastName: "Last Name",
      DoctorAddBookingCreateNewUser: "Create New User",
      DoctorAddBookingWhoisvisitingtoDoctor: "Who is visiting to the Doctor?",
      DoctorAddBookingSearch: "Search doctors, hospitals, etc.",
      DoctorAddBookingPickRelation: "Pick Relation...",
      DoctorAddBookingPickHospital: "Where to Visit?",
      DoctorAddBookingSelectedServices: "Selected Services:",
      DoctorAddBookingConsultationFee: "Consultation Fee:",
      DoctorAddBookingTotalCharges: "Total Charges:",
      DoctorAddBookingSelectDateTime: "Select Date & Time:",
      DoctorAddBookingAvailableSlots: "Available Slots:",
      DoctorAddBookingOccupied: "Occupied",
      DoctorAddBookingSpace: "Space:",
      DoctorAddBookingNoSlotAvailable: "No Slot Available",
      DoctorAddBookingSelectedSlot: "Selected Slot:",
      DoctorAddBookingBookAppointment: "Book Appointment",
  
      //For  LocationDetail
      LocationDetailOther: "Other",
      LocationDetailheaderText: "Location Detail",
      LocationDetailDaysIOfferMyServices: "Days I Offer My Services:",
      LocationDetailMonday: "Monday",
      LocationDetailDeleteAll: "Delete All",
      LocationDetailSpace: "Space:",
      LocationDetailAddNewSlot: "Add New Slot:",
      LocationDetailPickInterval: "Pick Interval",
      LocationDetailPickDuration: "Pick Duration",
      LocationDetailPickStartTime: "Pick Start Time",
      LocationDetailPickEndTime: "Pick End Time",
      LocationDetailAssignAppointmentSpaces: "Assign Appointment Spaces:",
      LocationDetailOtherValue: "Other Value",
      LocationDetailAddMore: "Add More",
      LocationDetailTuesday: "Tuesday",
      LocationDetailWednesday: "Wednesday",
      LocationDetailThursday: "Thursday",
      LocationDetailFriday: "Friday",
      LocationDetailSaturday: "Saturday",
      LocationDetailSunday: "Sunday",
  
      //For PayAppointmentCheckout
      PayAppointmentCheckoutBuyNow: "Buy Now",
  
      //For SubmitCode
      SubmitCodeheaderText: "Verify Password",
      SubmitCodePleaseWait: "Please Wait...",
      SubmitCodePleaseAddAuthenticationCode: "Please add Authentication Code",
      SubmitCodePassword: "Password",
      SubmitCodeSubmitCode: "Submit Code",
      SubmitCodeEnterCode : "Please Enter Code",
  
      //For VerifyPasswordForBooking
      VerifyPasswordheaderText: "Verify Password",
      VerifyPasswordPleaseWait: "Please Wait...",
      VerifyPasswordPleaseVerify: "Please verify that its you",
      VerifyPasswordPassword: "Password",
      VerifyPasswordRetypePassword: "Retype Password",
      VerifyPasswordAlertNotMatched: "Passwords not Matched",
      VerifyPasswordAlertNotBeEmpty: "Fields should not be empty",
  
      //For PostArticle
      ArticlePostArticleDetail: "Add Article Detail",
      ArticlePostArticlePhoto: "Article Photo",
      ArticlePostAddArticlePhoto: "Add Article Photo",
      ArticlePostAddCategory: "Add Category",
      ArticlePostAddTags: "Add Tags",
      ArticlePostPostArticle: "Post Article",
      ArticlePostAddDetail: "Add Detail...",
      ArticlePostSearchCategory: "Search Category...",
      ArticlePostPickCategory: "Pick Category",
      ArticlePostEnterValue: "Enter Value Here",
  
      //For LoginScreen
      LoginHeader: "Sign In",
      Loginmain: "Consectetur adipisicing dotem eiusmod \n tempor incuntes ulabe etdolore.",
      LoginEmail: "Email",
      LoginPassword: "Password",
      LoginButton: "SIGN IN",
      LoginForget: "Forget Password",
      LoginMoveSignup: "Don't have Account? Sign Up",
      LoginLoading: "Loading",
      LoginUsername: "username",
      Loginpassword: "password",
      LoginCheckEmailPasswordorNetwork : "Please Check Your Email / Password or Check Network ",

  
      //For SignupScreen
      SignupHeader: "Register Now",
      Signupmain: "Consectetur adipisicing dotem eiusmod \n tempor incuntes ulabe etdolore",
      SignupPersonal: "Personal Details:",
      SignupMale: "Male",
      SignupFemale: "Female",
      SignupFname: "First Name",
      SignupLname: "Last Name",
      SignupUname: "User Name",
      SignupDname: "Display Name",
      SignupEmail: "Email",
      SignupPassword: "Password",
      SignupRetypePassword: "Retype Password",
      SignupLocation: "Your Location:",
      SignupStartas: "Start as:",
      SignupRegularUser: "Client",
      SignupDoctor: "Doctor",
      SignupHospital: "Hospital",
      SignupNoEmp: "No. of Employees",
      SignupDepartment: "Department",
      SignupContinue: "CONTINUE",
      SignupMoveSignin: "Already have account? Sign In",
      SignupSearchProjectLocation: "Search Project Location...",
      SignupPickLocation: "Pick Location",
      SignupData : "Data",
      SignupEnterCompDetail : "Please enter Complete Detail",
      SignupEmailNotCorrect : "Email is Not Correct",
      SignupPasswordsnotmatch : "Passwords don't match",
  
      //For VerificationAccount
      VerifyAccountHeader: "Verify Account",
      VerifyAccountmain: "",
      VerifyAccountCode: "Code",
      VerifyAccountButton: "Verify Account",
  
      //For ArticleDetailPage
      ArticleDetailHeaderText: "Detail Article",
  
      //For ArticleListing
      ArticleListingHeaderText: "Blog Listing",
      MyArticlesHeaderText: "My Articles",
      BlogListingSectionText: "Blog Found",
      ArticleListingSectionText: "Article Found",
      ArticleNodata : "No More Data Available",

  
      //For BuyPackageWebview
      BuyPackagesBuyNow: "Buy Now",
      BuyPackagesPackages: "Packages",
      BuyPackagesPrice: "Price:",
      BuyPackagesLoading: "Loading",
  
      //For Packages
      Packagesincludealltaxes: "include all taxes",
      PackagesBuyNow: "Buy Now",
      PackagesPackageFeatures: "Package Features:",
      PackagesPackages: "Packages",
      PackagesPrice: "Price:",
  
      //For DownloadCard
      DownloadCardStoragePermission: "Storage Permission",
      DownloadCardAccess: "App needs access to memory to download the file",
      DownloadCardPermissionDenied: "Permission Denied!",
      DownloadCardStorage: "You need to give storage permission to download the file",
  
      //For ArticlesCard
      ArticlesCardShare: "Share",
  
      //For DetailDoctorScreen
      DetailDoctorScreenSorry: "Sorry",
      DetailDoctorScreenNotAllowed: "You are not allowed",
      DetailDoctorScreenDetailPage: "Detail Page",
      DetailDoctorScreenFeedback: "Feedback",
      DetailDoctorScreenContact: "Contact",
      DetailDoctorScreenBookNow: "Book Now",
      DetailDoctorScreenMessage: "Message",
      DetailDoctorScreenAlreadyAddedinWishlist: "Already Added in Wishlist.",
      DetailDoctorScreenLocationsBy: "Locations By",
      DetailDoctorScreenAbout: "About",
      DetailDoctorScreenOfferedServices: "Offered Services",
      DetailDoctorScreenPrice: "Price",
      DetailDoctorScreenExperience: "Experience",
      DetailDoctorScreenEducation: "Education",
      DetailDoctorScreenSpecializations: "Specialisations",
      DetailDoctorScreenAwardsAndRecognitions: "Awards And Recognitions",
      DetailDoctorScreenMemberships: "Memberships",
      DetailDoctorScreenRegistrations: "Registrations",
      DetailDoctorScreenDownloads: "Downloads",
      DetailDoctorScreenGallery: "Gallery",
      DetailDoctorScreenConsultationBy: "Consultation By",
      DetailDoctorScreenTeamBy: "Team By",
      DetailDoctorScreenPatientFeedback: "Client Feedback",
      DetailDoctorScreenArticlesBy: "Articles By",
      DetailDoctorScreenUserD: "User Detail",
      DetailDoctorScreenAvailableL: "Available Locations",
      DetailDoctorScreenOnlineC: "Online Consultation",
      DetailDoctorScreenArticles: "Articles",
      DetailDoctorScreenOnboardD : "Onboard Doctors",


  
      //For LocationCard
      LocationCardOnboardDoctors: "Onboard Doctors:",
      LocationCardAvailability: "Availability:",
  
      //For MessageDoctor
      MessageDoctorPleaseaddmessage: "Please add message",
      MessageDoctorSuccess: "Success",
      MessageDoctorMessageSentSuccessfully: "Message Sent Successfully",
      MessageDoctorSendMessage: "Send Message",
      MessageDoctorTypeHere: "Please Type Message here...",
      MessageDoctorSendNow: "Send Now",
  
      //For OnlineConsultationCard
      OnlineConsultationCardAnsweredby: "Answered by",
  
      //For Favorites
      FavoritesFavoriteListing: "Favorite Listing",
      FavoritesDoctors: "Doctors",
      FavoritesHospitals: "Hospitals",
      FavoritesRemovedAllDoctors: "Removed all saved Doctors",
      FavoritesRemovedAllHospitals: "Removed all saved hospitals",
      FavoritesArticles: "Articles",
  
      //For AddFeedback
      AddFeedback: "Add Feedback",
      AddFeedbackIRecommendThisDoctor: "I Recommend This Doctor:",
      AddFeedbackIHowlongwait: "How long did you wait?",
  
      //About Us
      AboutUs: "About Us",
      AboutUsMain: "Doctreat is a WordPress theme  to find nearest doctors  and hospitals and get an appointment in a minute.",
      AboutUsCompany: "Company",
      AboutUsCompanyName: "Amentotech.pvt.ltd",
      AboutUsAPPversionText: "APP version",
      AboutUsAppVersion: "2.0",
  
      //Contact Support
      ContactNumberContactSupport: "Contact Support",
      ContactNumberHeader: "Phone Numbers:",
      ContactNumberOne: "+9635-2569-269",
      ContactNumberTwo: "+9625-3478-340",
      ContactEmailHeader: "Emails Address:",
      ContactEmailOne: "info@yourdomain.com",
      ContactEmailTwo: "support@yourdomain.com",
  
      //For HealthForum
      GetAnswersHeaderText: "Legal Forum",
      GetAnswersPostQuestion: "Post Your Question",
      GetAnswersQuestion: "Question:",
      GetAnswersPostAnswer: "Post Answer",
      GetAnswersAnswers: "Answers",
      GetAnswersTypeQuery: "Type Your Query*",
      GetAnswersPickSpeciality: "Pick Speciality",
      GetAnswersQueryDetail: "Type Your Query Detail*",
      GetAnswersAskQuery: "Ask Free Query",
      GetAnswersSearchQuery: "Search Query",
      GetAnswersSearchSpeciality: "Search A Speciality",
      GetAnswersSearch: "Search",
      GetAnswersPublicHealthForum: "Public Legal Forum",
      GetAnswersTypeReply: "Type Your Reply",
      GetAnswersSubmit: "Submit",
  
      //For Home
      HomeHeaderText: "Start Your Search",
      HomeHeaderSearchText: "Search doctors, hospitals, etc.",
      HomeHeaderSearchButton: "Search",
      HomeHeaderAdvanceSearch: "ADVANCED \n SEARCH",
      AdvanceSerchHeaderText: "Narrow Your Search",
      AdvanceSearchRadioButtonOne: "Doctor",
      AdvanceSearchRadioButtonTwo: "Hospital",
      AdvanceSearchLocation: "Pick Location",
      AdvanceSearchSpeciality: "Pick Speciality",
      AdvanceSearchService: "Pick Service",
      AdvanceSearchApplyButton: "Apply Filter",
      AdvanceSearchClearButton: "CLEAR \n FILTERS",
      BannerTextOne: "Are You a Doctor?",
      BannerTextTwo: "Join Our Team",
      BannerButton: "Join Now",
      CategoriesSection: "Top Categories:",
      TopRatedCardFeedback: "Feedback",
      TopRatedSection: "Featured Doctors:",
  
      //For Location
      LocationSearchLocation: "Search Location",
      LocationSearch: "Search",
      LocationCurrentLocation: "Use My Current Location",
  
      //Messages
      MessagesTypehere: "Please Type Message here...",
      MessagesHeaderText: "Inbox",
      MessageSearchUsers: "Search Users",
  
      //For AddAwardlayout
      AddAwardLayoutCompanyName: "Company Name",
      AddAwardLayoutStartingDate: "Starting Date",
      AddAwardLayoutJobTitle: "Job Title",
      AddAwardLayoutDescription: "Description",
      AddAwardLayoutAddNow: "Add Now",
  
      //For AddListCard
      AddListCardAddExperience: "Add Experience",
      AddListCardCompanyName: "Company Name",
      AddListCardStartingDate: "Starting Date",
      AddListCardEndDate: "End Date",
      AddListCardJobTitle: "Job Title",
      AddListCardDescription: "Description",
      AddListCardAddNow: "Add Now",
  
      //For EducationAndExperienceLayout
      EducationAndExperienceLayoutAddExperience: "Add Experience",
      EducationAndExperienceLayoutCompanyName: "Company Name",
      EducationAndExperienceLayoutStartingDate: "Starting Date",
      EducationAndExperienceLayoutEndDate: "End Date",
      EducationAndExperienceLayoutJobTitle: "Job Title",
      EducationAndExperienceLayoutDescription: "Description",
      EducationAndExperienceLayoutAddNow: "Add Now",
      EducationAndExperienceLayoutInstituteName: "Institute Name",
      EducationAndExperienceLayoutAddYourEducation: "Add Your Education",
  
      //For PersonalDetail
      PersonalDetailProfileSettingsHeader: "Profile Settings",
      PersonalDetailBaseName: "Base Name",
      PersonalDetailSubHeading: "Sub Heading",
      PersonalDetailFirstName: "First Name",
      PersonalDetailLastName: "Last Name",
      PersonalDetailUsername: "Username",
      PersonalDetailMobileNum: "Personal mobile number",
      PersonalDetailStartingPrice: "Starting Price",
      PersonalDetailWebUrl: "Web url",
      PersonalDetailDescription: "Description",
      PersonalDetailYourClinicName: "Your Hospital Name",
      PersonalDetailSelectLocation: "Select Location",
      PersonalDetailSearchProjectLocation: "Search Project Location...",
      PersonalDetailPickLocation: "Pick Location",
      PersonalDetailYourAddress: "Your Address",
      PersonalDetailEnterLongitude: "Enter Longitude",
      PersonalDetailEnterLatitude: "Enter Latitude",
      PersonalDetailEnterNumberHere: "Enter Number Here",
      PersonalDetailCompanyName: "Company Name",
      PersonalDetailJobTitle: "Job Title",
      PersonalDetailStartingDate: "Starting Date",
      PersonalDetailEndDate: "End Date",
      PersonalDetailInstituteName: "Institute Name",
      PersonalDetailInstituteTitle: "Institute Title",
      PersonalDetailDegreeTitle: "Degree Title",
      PersonalDetailAwardTitle: "Award Title",
      PersonalDetailYear: "Year",
      PersonalDetailAwardYear: "Award Year",
      PersonalDetailEnterRegistrationNumber: "Enter Legal Registration Number",
      PersonalDetailFileSize: "File Size:",
      PersonalDetailMemberships: "Memberships",
      PersonalDetailYourMemberships: "Your Memberships",
      PersonalDetailYourAddPhNum: "Add phone number",
      PersonalDetailBookingDetails: "Booking Details",
      PersonalDetailYourAddConDet: "Add contact detail",
      PersonalDetailYourContactPhNum: "Contact Phone Number",
      PersonalDetailUser: "Your Details",
      PersonalDetailAddClinicLogo: "Add Hospital Logo",
      PersonalDetailLocation: "Default Location",
      PersonalDetailPhoto: "Profile Photo",
      PersonalDetailAddPhoto: "Add Profile Photo",
      PersonalDetailCurrentPhoto: "Current Profile Photo",
      PersonalDetailCurrentLogo: "Current Hospital Logo",
      PersonalDetailPhoneNo: "Booking Phone Number",
      PersonalDetailSelectedLanguages: "Select languages",
      PersonalDetailExperience: "Add Your Experience",
      PersonalDetailAddNow: "Add Now",
      PersonalDetailEducation: "Add Your Education",
      PersonalDetailAddReward: "Add Your Awards",
      PersonalDetailDownloads: "Downloads",
      PersonalDetailAddFileforDownlaod: "Add Files for Download",
      PersonalDetailAddImages: "Add Images",
      PersonalDetailRegistrationNo: "Add Your Legal Registration No.",
      PersonalDetailAddDocument: "Add Document",
      PersonalDetailGallery: "Gallery",
      PersonalDetailVideos: "Videos",
      PersonalDetailYourVideoURL: "Your Video URL",
      PersonalDetailUpdateAllChanges: "Save & Update",
      PersonalDetailAddNew: "Add New",
  
      //For SearchResult
      SearchResultNoRecordFound: "Oops , No Record Found",
      SearchResultSearchResult: "Search Result",
      SearchResultResultFound: "Search Result Found",
      SearchResultDisableFromAdmin: "Disabled from Admin",
  
      //For SecuritySetting
      SecuritySettingEmailNotification: "Manage Email Notifications",
      SecuritySettingUpdate: "Update all the latest changes",
      SecuritySettingAccount: "Account Security & Settings",
      SecuritySettingDisableAccount: "Disable my account temporarily",
      SecuritySettingChangePassword: "Change Your Password",
      SecuritySettingLastPassword: "Last Remember Password*",
      SecuritySettingNewPassword: "New Password*",
      SecuritySettingDeleteAccount: "Delete Account",
      SecuritySettingEnterPassword: "Enter Password*",
      SecuritySettingRetypePassword: "Retype Password*",
      SecuritySettingPickReason: "Pick Reason To Leave",
      SecuritySettingReason: "Reason To Leave",
      SecuritySettingDescription: "Description (Optional)",
      SecuritySettingTabPassword: "Password",
      SecuritySettingTabAccount: "Account",
      SecuritySettingTabSecurity: "Security",
      SecuritySettingTabEmail: "Email",
      SecuritySettingHeaderText: "Security Settings",
  
      //For TeamListCard
      TeamListCardStatus: "Status:",
  
      //For TeamListing
      TeamManagementHeaderText: "Team Listing",
      TeamManagementSectionText: "Team Members:",
      TeamManagementInviteDoctors: "Invite Doctors",
      TeamManagementNewRequest: "New Request",
  
      //For App.js
      AppSkip: "Skip",
      AppWizardParagraph: 'Find your nearest doctors and hospitals and get \n anappointment in a minute',
      AppConfirm: "Confirm",
      AppWantToLogout: "Are you sure that you want to logout?",
      AppYes: "Yes",
      AppCancel: "Cancel",
      AppIncorrectDetail: "Incorrect Detail",
      AppRateThisApp: "Rate This App",
      AppPleasegiveusFiveStar: "Please give us five stars on",
      Appappstore: "App store",
      Appplaystore: "Play store",
      AppRateNow: "Rate Now",
      AppWowdidyouseethat: "Wow, did you see that?",
      AppShareAppLink: "Share App Link",
      AppGuest: "Guest",
      AppGreetings: "Greetings",
      AppDashboard: "Dashboard",
      AppAppointmentSettings: "Appointment Settings",
      AppAppointmentSettingsHospital: "Hospital Appointment Settings",
      AppAppointmentSettingsClinic: "Clinic Appointment Settings",
      AppAppointmentListing: "Appointment Listing",
      AppPharmacyStore: "Pharmacy & Store",
      AppSpecialitiesServices: "Specialities & Services",
      AppPayoutSetting: "Payout Settings",
      AppPackages: "Packages",
      AppFavorites: "Favorites",
      AppInbox: "Inbox",
      AppManageTeam: "Manage Team",
      AppLogin: "Login",
      AppHealthForum: "Legal Forum",
      AppBlogList: "Blog List",
      AppMyArticles: "My Articles",
      AppPostArticle: "Post Article",
      AppGeneral: "General",
      AppBottomSheetSearch: "Start Search",
      DrawerAboutus: "About Us",
      DrawerPrivacyPolicy: "Privacy Policy",
      DrawerTermsOfService: "Terms of Service",
      DrawerFAQ: "FAQ",
      DrawerRateApp: "Rate this App",
      DrawerInviteFriends: "Invite Friends",
      DrawerContact: "Contact Support",
      DrawerDashboard: "Dashboard",
  
      //For Dashboard
      DashboardHeader: "Dashboard",
      DashboardNewMessages: "New Messages",
      DashboardClickToView: "Click To View",
      DashboardCountDownFinished: "Finished",
      DashboardCheckPackageDetail: "Check Package Detail",
      DashboardUpdrageNow: "Upgrade Now",
      DashboardViewSavedItems: " View Saved items",
      DashboardAvailableBalance: "Available Balance",
      DashboardAddArticle: "Add Article",
      DashboardArticlesPublished: "Articles published",
      DashboardSpecialitiesAndServices: "Specialities and Services",
      DashboardManageTeam: "Manage Team",
  
      //For Profile Settings
      HeaderText: "Profile Settings",
      PersonalDetail: "Personal Detail",
      ExperienceAndEducation: 'Experience & Education',
      AwardsAndDownloads: "Awards & Downloads",
      Registrations: "Registrations",
      Gallery: "Gallery",
      BookingSettings: "Booking Settings",
      DefaultLocation: "Default Location",
  
      //For Prescription
      PrescriptionHeaderText: "Prescription",
      PrescriptionPersonalInformation: "Personal Information:",
      PrescriptionPatientName: "Patient Name",
      PrescriptionPatientPhone: "Patient Phone",
      PrescriptionAge: "Age",
      PrescriptionAddress: "Address",
      PrescriptionSearchLocation: "Search Location...",
      PrescriptionSelectLocation: "Select Location",
      PrescriptionMaritalStatus: "Marital Status:",
      PrescriptionSearchMaritalStatus: "Search Marital Status...",
      PrescriptionSelectMaritalStatus: "Select Marital Status",
      PrescriptionChildhoodIllness: "Childhood illness:",
      PrescriptionSearchIllness: "Search illness...",
      PrescriptionSelectIllness: "Select illness",
      PrescriptionDiseases: "Diseases:",
      PrescriptionSearchDiseases: "Search Diseases...",
      PrescriptionSelectDiseases: "Select Diseases",
      PrescriptionLaboratoryTests: "Laboratory Tests:",
      PrescriptionSearchLaboratoryTests: "Search Laboratory Tests...",
      PrescriptionSelectLaboratoryTests: "Select Laboratory Tests",
      PrescriptionCommonIssues: "Common Issues:",
      PrescriptionAddNew: "Add New",
      PrescriptionSearchVitalSign: "Search vital sign...",
      PrescriptionSelectVitalSign: "Select vital sign",
      PrescriptionValue: "Value",
      PrescriptionMedicalHistory: "Medical History:",
      PrescriptionYourPatientMadicalHistory: "Your Patient Madical History",
      PrescriptionMedications: "Medications:",
      PrescriptionName: "Name",
      PrescriptionSearchType: "Search type...",
      PrescriptionSelectType: "Select type",
      PrescriptionSearchMedicineDuration: "Search medicine duration...",
      PrescriptionSelectMedicineDuration: "Select medicine duration",
      PrescriptionSearchMedicineUsage: "Search medicine usage...",
      PrescriptionSelectMedicineUsage: "Select medicine usage",
      PrescriptionAddComment: "Add Comment",

   },
   "ar": {
      BaseUrl: "https://your domian name/wp-json/api/v1/",
      BaseUrlforDownload: "https://your domian name/",

      color: "#ffffff",
      primaryColor: "#3d4461",
      PoppinsBold: 'Poppins-Bold',
      PoppinsItalic: 'Poppins-Italic',
      PoppinsRegular: 'Poppins-Regular',
      PoppinsMedium: 'Poppins-Medium',
      OpenSansBold: 'OpenSans-Bold',
      OpenSansItalic: 'OpenSans-Italic',
      OpenSansRegula: 'OpenSans-Regular',
      PLAY_STORE_LINK: 'Play Store Link',
      APP_STORE_LINK: 'App Store Link',

      

    Oops: "عفوًا ,",

    NoDataAvailable : "لا توجد بيانات متاحة" ,

    OopsNoRecordFound : "عفوًا , لم يتم العثور على سجل" ,

    Submit: "إرسال",

    Description: "الوصف",

    SaveUpdate : "حفظ وتحديث" ,

    UpdatedSuccessfully: "تم التحديث بنجاح",

    Error: "خطأ",

    LoadMore : "تحميل المزيد" ,

    Success: "النجاح",

    Edit: "تحرير",

    Update: "تحديث",

    Delete: "حذف",

    PleaseLoginFirst : "الرجاء الدخول أولا" ,

    Sorry: "آسف",

    SelectLanguages : "حدد اللغات" ,

    AddCompleteData : "الرجاء إضافة بيانات كاملة",

    ChangeLanguage : "تغيير اللغة",

    ChangLangTitle : "  حدد واحدًا لتغيير اللغة   ",

    ResendEmail : "إعادة إرسال البريد الإلكتروني",

    NoThanks : "لا شكرا",

    Doctor : 'طبيبة',

    Hospital : 'مستشفى',

    invoices : 'الفواتير',


    // للتخصصات والخدمات

    SpecialitiesAndServicesManageServices : "إدارة الخدمات" ,

    SpecialitiesAndServicesAddNewService : "إضافة خدمة جديدة:" ,

    SpecialitiesAndServicesPickSpeciality : "اختر التخصص" ,

    SpecialitiesAndServicesPickServices : "اختر الخدمات" ,

    SpecialitiesAndServicesPrice: "السعر",

    SpecialitiesAndServicesPriceC : "السعر:" ,

    SpecialitiesAndServicesAddNow : "أضف الآن" ,

    SpecialitiesAndServicesAvailableServices : "الخدمات المتاحة:" ,

    SpecialitiesAndServicesAddCompleteData: "الرجاء إضافة بيانات كاملة",
 

    // من أجل AddSetting

    AddSettingNewLocation : "إضافة موقع جديد" ,

    AddSettingInviteHospital : "دعوة المستشفى" ,

    AddSettingPickHospital : "اختر المستشفى" ,

    AddSettingPickInterval : "انتقاء الفاصل الزمني" ,

    AddSettingPickDuration : "اختيار المدة" ,

    AddSettingPickStartTime : "اختر وقت البدء" ,

    AddSettingEndTime : "اختر وقت الانتهاء" ,

    AddSettingAvailableServices : "الخدمات المتاحة:" ,

    AddSettingPricePickService : "اختر الخدمة" ,

    AddSettingAssignAppointmentSpaces : "تعيين مساحات المواعيد:" ,

    AddSettingOtherValue : "قيمة أخرى" ,

    AddSettingDaysIOfferMyServices : "الأيام التي أقدم فيها خدماتي:" ,

    AddSettingPickDays : "اختيار الأيام" ,

    AddSettingConsultancyFee : "رسوم الاستشارات" ,

    AddSettingOther : "أخرى",
 

    // لدعوة المستشفيات

    InviteHospitals : "دعوة المستشفيات" ,

    InviteHospitalsEmailText : "البريد الإلكتروني" ,

    InviteHospitalsDescriptionText : "الوصف" ,

    InviteHospitalsSubmitBtn : "إرسال" ,

    InviteHospitalsEmailexist: "البريد الالكتروني موجود مسبقا",

    InviteHospitalsFillcompleteform : "من فضلك املأ الاستمارة كاملة.",


 

    // For AppointmentDetailPage

    AppointmentDetailPageheaderText : "تفاصيل الموعد" ,

    AppointmentDetailPageAccepted : "مقبول" ,

    AppointmentDetailPagePending: "معلق",

    AppointmentDetailPageRejected : "مرفوضة" ,

    AppointmentDetailPagePatientName : " اسم العميل : " ,

    AppointmentDetailPageRelationWithUser : "العلاقة مع المستخدم:" ,

    AppointmentDetailPageAppointmentLocation : "موقع الموعد:" ,

    AppointmentDetailPageAppointmentDate: "تاريخ الموعد:",

    AppointmentDetailPageCharges : "شحنة:" ,

    AppointmentDetailPageServicesRequired : "الخدمات المطلوبة:" ,

    AppointmentDetailPageComments : "تعليقات:" ,

    AppointmentDetailPageApprove : "موافقة" ,

    AppointmentDetailPageReject : "رفض" ,

    AppointmentDetailPagelookcode : "يرجى إلقاء نظرة على رمزك",

    // لقائمة المواعيد

    AppointmentListheaderText : "المواعيد" ,

    AppointmentListRecentAppointments : "تعيينات الأخيرة:" ,

    AppointmentListStatus : "الحالة" ,

    AppointmentListAddBooking : "إضافة حجز" ,

    AppointmentListPleaseWait : "ارجوك انتظر ..." ,

 

    // For AppointmentListPatient

    AppListPatientheaderText : "المواعيد" ,

    AppListPatientRecentAppointments : "المواعيد الأخيرة:" ,

    AppListPatientStatus : "الحالة:" ,

 

    // لإعدادات المواعيد

    AppointmentSettingsheaderText : "إعدادات الموعد" ,

    AppointmentSettingsHospitalheaderText : "إعدادات موعد المستشفى" ,

    AppointmentSettingsClinicheaderText : "إعدادات موعد المستشفى" ,

    AppointmentSettingsSett : "إعدادات",

    AppointmentSettingsLocations : "المواقع",

 

    // للحصول على PayoutSetting

    PayoutSettingheaderText : "إعدادات الدفع " ,

    PayoutMainText : "سيتم إرسال كل الأرباح إلى طريقة الدفع المحددة أدناه" ,

    PayoutYourPayoutDetails : "تفاصيل العائد الخاص بك:" ,

    PayoutChangePayoutSetting : "تغيير إعداد العائد" ,

    PayoutBankTransferSetting : "الرجاء إضافة جميع الإعدادات المطلوبة للتحويل المصرفي. و",

    PayoutBankAccountName : "اسم الحساب المصرفي" ,

    PayoutBankAccountNumber : "رقم الحساب المصرفي" ,

    PayoutBankName : "اسم البنك" ,

    PayoutBankRoutingNumber : "رقم التوجيه المصرفي" ,

    PayoutBankIBAN : "رقم الحساب المصرفي الدولي للبنك" ,

    PayoutBankBICSWIFT : "بنك BIC / SWIFT" ,

    PayoutAddPayPalIDBelow : "تحتاج إلى إضافة معرّف PayPal أدناه في حقل النص. لمزيد من المعلومات حول" ,

    PayoutPaypal : "Paypal" ,

    PayoutCreateAnAccount : "إنشاء حساب" ,

    PayoutAddPayPalEmailAddress : "إضافة عنوان بريد PayPal الإلكتروني" ,

    PayoutYourPayments : " مدفوعاتك :" ,

    PayoutDate: "التاريخ:",

    PayoutPayoutDetails: "تفاصيل الدفع :",

    PayoutNoDetail : "بلا تفاصيل" ,

    PayoutAmount : "Amount:" ,

    PayoutPaymentMethod : "طريقة الدفع:" ,

 

 

    // For BookAppointment

    BookAppointmentMySelf : "نفسي" ,

    BookAppointmentSomeoneElse : "شخص آخر" ,

    BookAppointmentBrother : "شقيق" ,

    BookAppointmentWife : "زوجة" ,

    BookAppointmentMMother : "الأم" ,

    BookAppointmentSister: "الأخت",

    BookAppointmentBookAppointment : "حجز موعد" ,

    BookAppointmentSelectLocation : "الرجاء تحديد الموقع",

    BookAppointmentWhoisvisitingtoDoctor: "من يزور الطبيب؟",

    BookAppointmentSearch : "ابحث عن الأطباء والمستشفيات وما إلى ذلك.",

    BookAppointmentEmailAddress : "عنوان البريد الإلكتروني" ,

    BookAppointmentMobileNumber : "رقم هاتفك" ,

    BookAppointmentPatientName : " اسم العميل " ,

    BookAppointmentPickRelation : "اختر العلاقة ..." ,

    BookAppointmentPickHospital : "أين تزور؟" ,

    BookAppointmentSelectedServices : "خدمات مختارة:" ,

    BookAppointmentConsultationFee : "رسوم الاستشارة:" ,

    BookAppointmentTotalCharges : "إجمالي الرسوم:" ,

    BookAppointmentSelectDateTime : "حدد التاريخ والوقت:" ,

    BookAppointmentAvailableSlots : "الفتحات المتاحة:" ,

    BookAppointmentOccupied : " محتل " ,

    BookAppointmentSpace : "مساحة:" ,

    BookAppointmentNoSlotAvailable : "لا توجد فتحة متاحة" ,

    BookAppointmentSelectedSlot : "الفتحة المحددة:" ,

    BookAppointmentBASubmit : "إرسال موعد الكتاب" ,

    BookAppointmentPleaseWait : "ارجوك انتظر" ,

 

    BookAppointmentUserEmail : "عنوان البريد الإلكتروني" ,

    BookAppointmentUserName : "اسم العميل " ,

    BookAppointmentUserPhoneNumber : "رقم تليفونك" ,

 

    // For BookAppointmentCall

    BookAppCallheaderText : "اتصل طبيبة" ,

    BookAppCallCallForBooking : "اتصل للحجز" ,

    BookAppCallPleaseCallOn : "الرجاء الاتصال" ,

 

    // من أجل DoctorAddBooking

    DoctorAddBookingPatientOnly: "للمريض فقط",

    DoctorAddBookingSomeoneElse : "شخص آخر" ,

    DoctorAddBookingBrother : "شقيق" ,

    DoctorAddBookingWife : "زوجة" ,

    DoctorAddBookingMother : "الأم" ,

    DoctorAddBookingSister : "أخت" ,

    DoctorAddBookingheaderText : "إضافة موعد" ,

    DoctorAddBookingPleaseWait : "ارجوك انتظر ..." ,

    DoctorAddBookingAddPatientDetails : "إضافة تفاصيل العميل:" ,

    DoctorAddBookingNote : "يرجى إضافة عنوان بريد إلكتروني صحيح للعثور على عميل من قاعدة البيانات , إذا لم يتم العثور عليه , يمكنك إضافة عميل جديد إلى قاعدة البيانات عن طريق كتابة عنوان البريد الإلكتروني والاسم" ,

    DoctorAddBookingFirstName : "الاسم الأول" ,

    DoctorAddBookingEmail : "البريد الإلكتروني" ,

    DoctorAddBookingLastName : "اسم العائلة" ,

    DoctorAddBookingCreateNewUser : "إنشاء مستخدم جديد" ,

    DoctorAddBookingWhoisvisitingtoDoctor : "من يزور الطبيب؟",

    DoctorAddBookingSearch : "ابحث عن الأطباء والمستشفيات وما إلى ذلك.",

    DoctorAddBookingPickRelation : "اختر العلاقة ..." ,

    DoctorAddBookingPickHospital : "أين تزور؟" ,

    DoctorAddBookingSelectedServices : "الخدمات المحددة:" ,

    DoctorAddBookingConsultationFee : "رسوم الاستشارة:" ,

    DoctorAddBookingTotalCharges : "إجمالي الرسوم:" ,

    DoctorAddBookingSelectDateTime : "حدد التاريخ والوقت:" ,

    DoctorAddBookingAvailableSlots : "الفتحات المتاحة:" ,

    DoctorAddBookingOccupied : "محتلة" ,

    DoctorAddBookingSpace : " مسافة :" ,

    DoctorAddBookingNoSlotAvailable : "لا توجد فتحة متاحة" ,

    DoctorAddBookingSelectedSlot : "الفتحة المحددة:" ,

    DoctorAddBookingBookAppointment : "حجز موعد" ,

 

    // للحصول على تفاصيل الموقع

    LocationDetailOther : "أخرى" ,

    LocationDetailheaderText : "تفاصيل الموقع" ,

    LocationDetailDaysIOfferMyServices : "الأيام التي أقدم فيها خدماتي:" ,

    LocationDetailMonday: "الاثنين",

    LocationDetailDeleteAll : "حذف الكل" ,

    LocationDetailSpace : "مساحة:" ,

    LocationDetailAddNewSlot : "أضف فتحة جديدة:" ,

    LocationDetailPickInterval : "انتقاء الفاصل الزمني" ,

    LocationDetailPickDuration: "اختر المدة",

    LocationDetailPickStartTime : "اختر وقت البدء" ,

    LocationDetailPickEndTime : "اختيار وقت الانتهاء" ,

    LocationDetailAssignAppointmentSpaces : "تعيين مساحات المواعيد:" ,

    LocationDetailOtherValue : "قيمة أخرى" ,

    LocationDetailAddMore : "إضافة المزيد" ,

    LocationDetailTuesday: "الثلاثاء",

    LocationDetailWednesday : "الأربعاء" ,

    LocationDetailThursday: "الخميس",

    LocationDetailFriday: "الجمعة",

    LocationDetailSaturday: "السبت", 

    LocationDetailSunday: "الأحد",

 

    // For PayAppointmentCheckout

    PayAppointmentCheckoutBuyNow : "اشتر الآن" ,

 

    // For SubmitCode

    SubmitCodeheaderText : "تحقق من كلمة المرور" ,

    SubmitCodePleaseWait : "ارجوك انتظر ..." ,

    SubmitCodePleaseAddAuthenticationCode : "الرجاء إضافة رمز المصادقة" ,

    SubmitCodePassword : "كلمة المرور" ,

    SubmitCodeSubmitCode : "إرسال الرمز" ,

   SubmitCodeEnterCode : "الرجاء إدخال الرمز",
   

    // من أجل VerifyPasswordForBooking

    VerifyPasswordheaderText : "التحقق من كلمة المرور" ,

    VerifyPasswordPleaseWait : "ارجوك انتظر ..." ,

    VerifyPasswordPleaseVerify : "الرجاء التحقق من هويتك " ,

    VerifyPasswordPassword : "كلمة المرور" ,

    VerifyPasswordRetypePassword : "إعادة كتابة كلمة المرور" ,

    VerifyPasswordAlertNotMatched : "كلمات المرور غير متطابقة" ,

    VerifyPasswordAlertNotBeEmpty : "يجب ألا تكون الحقول فارغة" ,

 

    // لمقالة PostArticle

    ArticlePostArticleDetail : "إضافة تفاصيل المقالة" ,

    ArticlePostArticlePhoto : "صورة المقالة" ,

    ArticlePostAddArticlePhoto : "إضافة صورة مقالة" ,

    ArticlePostAddCategory : "إضافة تصنيف" ,

    ArticlePostAddTags : "إضافة علامات" ,

    ArticlePostPostArticle : "مقال آخر " ,

    ArticlePostAddDetail : "أضف التفاصيل ..." ,

    ArticlePostSearchCategory : "فئة البحث ..." ,

    ArticlePostPickCategory : "اختر الفئة" ,

    ArticlePostEnterValue : "أدخل القيمة هنا" ,

 

    // لشاشة تسجيل الدخول

    LoginHeader: "تسجيل الدخول",

    Loginmain : "Consectetur adipisicing dotem eiusmod \n tempor incuntes ulabe etdolore",

    LoginEmail : "البريد الإلكتروني" ,

    LoginPassword : "كلمة السر" ,

    LoginButton : "تسجيل الدخول" ,

    LoginForget: "نسيت كلمة المرور",

    LoginMoveSignup : "ليس لديك حساب؟ قم بالتسجيل" ,

    LoginLoading: "تحميل",

    LoginUsername : "اسم المستخدم" ,

    Loginpassword: "كلمة المرور",

    LoginCheckEmailPasswordorNetwork : "يرجى التحقق من بريدك الإلكتروني / كلمة المرور أو التحقق من الشبكة",


 

    // من أجل SignupScreen

    SignupHeader : "سجل الآن" ,

    Signupmain : "Consectetur adipisicing dotem eiusmod \n tempor incuntes ulabe etdolore",

    SignupPersonal : "تفاصيل الشخصية:" ,

    SignupMale : "ذكر" ,

    SignupFemale: "أنثى",

    SignupFname : "الاسم الأول" ,

    SignupLname : "اسم العائلة" ,

    SignupUname : "اسم المستخدم" ,

    SignupDname: "اسم العرض",

    SignupEmail : "أرسل" ,

    SignupPassword : "كلمة السر" ,

    SignupRetypePassword : "إعادة كتابة كلمة المرور" ,

    SignupLocation: "موقعك:",

    SignupStartas : "ابدأ كـ:" ,

    SignupRegularUser : " العميل " ,

    SignupDoctor: "طبيبة",

    SignupHospital : "مستشفى" ,

    SignupNoEmp : "عدد الموظفين" ,

    SignupDepartment: "الإدارة",

    SignupContinue: "استمر",

    SignupMoveSignin : "لديك حساب بالفعل؟ تسجيل الدخول" ,

    SignupSearchProjectLocation : "البحث عن موقع المشروع ..." ,

    SignupPickLocation : "اختيار المكان" ,

    SignupData : "البيانات",

    SignupEnterCompDetail : "الرجاء إدخال التفاصيل الكاملة",
    
    SignupEmailNotCorrect : "البريد الإلكتروني غير صحيح",

    SignupPasswordsnotmatch : "كلمات المرور غير متطابقة",



 

    // For VerificationAccount

    VerifyAccountHeader : "التحقق من الحساب" ,

    VerifyAccountmain : "" ,

    VerifyAccountCode : "كود" ,

    VerifyAccountButton : "التحقق من الحساب" ,

 

    // من أجل ArticleDetailPage

    ArticleDetailHeaderText : "تفاصيل المقال" ,

 

    // لقائمة المقالات

    ArticleListingHeaderText : "قائمة المدونة" ,

    MyArticlesHeaderText : " مقالاتي " ,

    ArticleListingSectionText : "تم العثور على المقالة" ,

    ArticleNodata : "لا مزيد من البيانات المتاحة",

 

    // من أجل BuyPackageWebview

    BuyPackagesBuyNow : "اشترِ الآن" ,

    BuyPackagesPackages : "الحزم" ,

    BuyPackagesPrice : "السعر:" ,

    BuyPackagesLoading : "تحميل" ,

 

    // للحزم


    Packagesincludealltaxes: "تشمل جميع الضرائب",

    PackagesBuyNow : "اشترِ الآن" ,

    PackagesPackageFeatures : "ميزات الحزمة:" ,

    PackagesPackages : "الحزم" ,

    PackagesPrice: "السعر:",

 

    // للحصول على DownloadCard

    DownloadCardStoragePermission : "إذن التخزين" ,

    DownloadCardAccess : "يحتاج التطبيق إلى الوصول إلى الذاكرة لتنزيل الملف" ,

    DownloadCardPermissionDenied : "تم رفض الإذن! ",

    DownloadCardStorage : "تحتاج إلى منح إذن التخزين لتنزيل الملف" ,

 

    // For ArticlesCard

    ArticlesCardShare : "مشاركة" ,

 

    // للحصول على DetailDoctorScreen

    DetailDoctorScreenSorry : "معذرة" ,

    DetailDoctorScreenNotAllowed : "غير مسموح لك" ,

    DetailDoctorScreenDetailPage : "صفحة التفاصيل" ,

    DetailDoctorScreenFeedback : "ملاحظات" ,

    DetailDoctorScreenContact : "جهة اتصال" ,

    DetailDoctorScreenBookNow : "احجز الآن" ,

    DetailDoctorScreenMessage : "رسالة" ,

    DetailDoctorScreenAlreadyAddedinWishlist: "أضيفت بالفعل في قائمة الرغبات.",

    DetailDoctorScreenLocationsBy : "المواقع حسب" ,

    DetailDoctorScreenAbout : "حول" ,

    DetailDoctorScreenOfferedServices : "الخدمات المقدمة" ,

    DetailDoctorScreenPrice: "السعر",

    DetailDoctorScreenExperience: "الخبرة",

    DetailDoctorScreenEducation: "التعليم",

    DetailDoctorScreenSpecializations: "التخصصات",

    DetailDoctorScreenAwardsAndRecognitions : "الجوائز والتقدير" ,

    DetailDoctorScreenMemberships : "العضويات" ,

    DetailDoctorScreenRegistrations : "التسجيلات" ,

    DetailDoctorScreenDownloads : "التنزيلات" ,

    DetailDoctorScreenGallery : "المعرض" ,

    DetailDoctorScreenConsultationBy : "استشارة بواسطة" ,

    DetailDoctorScreenTeamBy : "فريق بواسطة" ,

    DetailDoctorScreenPatientFeedback : " ملاحظات العميل " ,

    DetailDoctorScreenArticlesBy : "المقالات بقلم" ,

    DetailDoctorScreenUserD: "تفاصيل المستخدم",

   DetailDoctorScreenAvailableL: "المواقع المتاحة",

   DetailDoctorScreenOnlineC: "الاستشارة عبر الإنترنت",
      
   DetailDoctorScreenArticles: "مقالات",

   DetailDoctorScreenOnboardD : "الأطباء على متن الطائرة",

 

    // للحصول على LocationCard

    LocationCardOnboardDoctor : "الأطباء على متن الطائرة:" ,

    LocationCardAvailability : "التوفر:" ,

 

    // لـ MessageDoctor

    MessageDoctorPleaseaddmessage : "الرجاء إضافة رسالة" ,

    MessageDoctorSuccess : "نجاح" ,

    MessageDoctorMessageSentSuccessfully : "تم إرسال الرسالة بنجاح" ,

    MessageDoctorSendMessage : "إرسال رسالة" ,

    MessageDoctorTypeHere : "الرجاء كتابة الرسالة هنا ..." ,

    MessageDoctorSendNow : "ارسل الان" ,

 

    // For OnlineConsultationCard

    OnlineConsultationCardAnsweredby : "تمت الإجابة بواسطة" ,

 

    // للمفضلة 

    FavoritesFavoriteListing: "قائمة المفضلة",

    FavoritesDoctors: "الأطباء",

    FavoritesHospitals: "المستشفيات",

    FavoritesRemovedAllDoctors: "تمت إزالة جميع الأطباء المحفوظة",

   FavoritesRemovedAllHospitals: "تمت إزالة جميع المستشفيات المحفوظة",

    FavoritesArticles: "المقالات",

 

    // من أجل AddFeedback

    AddFeedback : "إضافة ملاحظات" ,

    AddFeedbackIRecommendThisDoctor : "أوصي بهذا الطبيب:" ,

    AddFeedbackIHowlongwait: "إلى متى الانتظار؟",
 

    //معلومات عنا

    AboutUs : "نبذة عنا" ,

    AboutUsMain : "Doctreat هو موضوع WordPress للعثور على أقرب الأطباء والمستشفيات والحصول على موعد في غضون دقيقة.",

    AboutUsCompany : "الشركة" ,

    AboutUsCompanyName : "Amentotech.pvt.ltd" ,

    AboutUsAPPversionText : "إصدار التطبيق" ,

    AboutUsAppVersion : "2.0" ,

 

    //اتصل بالدعم

    ContactNumberContactSupport : "الاتصال بالدعم" ,

    ContactEmailHeader : "عنوان البريد الإلكتروني:" , 

    ContactNumberHeader: "أرقام الهواتف:",

    ContactNumberOne: "+9635-2569-269",

    ContactNumberTwo: "+9625-3478-340",

    ContactEmailOne: "info@yourdomain.com",

    ContactEmailTwo: "support@yourdomain.com",


    // For HealthForum

    GetAnswersHeaderText : " المنتدى القانوني " ,

    GetAnswersPostQuestion : "انشر سؤالك" ,

    GetAnswersQuestion : "سؤال:" ,

    GetAnswersPostAnswer : "إجابة المشاركة" ,

    GetAnswersAnswers : "الإجابات" ,

    GetAnswersTypeQuery : "اكتب استعلامك *" ,

    GetAnswersPickSpeciality : "اختر التخصص" ,

    GetAnswersQueryDetail : "اكتب تفاصيل الاستعلام *" ,

    GetAnswersAskQuery : "طرح سؤال مجانية" ,

    GetAnswersSearchQuery : "استعلام البحث" ,

    GetAnswersSearchSpeciality : "بحث في تخصص" ,

    GetAnswersSearch : "بحث" ,

    GetAnswersPublicHealthForum : "المنتدى القانوني العام" ,

    GetAnswersTypeReply : "اكتب ردك" ,

    GetAnswersSubmit : "إرسال" ,

 

    //من أجل الوطن

    HomeHeaderText : "ابدأ البحث" ,

    HomeHeaderSearchText: "ابحث عن الأطباء والمستشفيات وما إلى ذلك.",

    HomeHeaderSearchButton : "بحث" ,

    HomeHeaderAdvanceSearch : " بحث \n متقدم  " ,

    AdvanceSerchHeaderText : "تضييق نطاق البحث" ,

    AdvanceSearchRadioButtonOne : "طبيبة" ,

    AdvanceSearchRadioButtonTwo : "مستشفى" ,

    AdvanceSearchLocation: "اختر موقعًا",

    AdvanceSearchSpeciality : "اختر التخصص" ,

    AdvanceSearchService : "اختر الخدمة" ,

    AdvanceSearchApplyButton : "تطبيق عامل التصفية" ,

    AdvanceSearchClearButton : "محو \n عوامل التصفية" ,

    BannerTextOne : "هل انت طبيب؟",

    BannerTextTwo : "انضم إلى فريقنا" ,

    BannerButton : "انضم الآن" ,

    CategoriesSection: "أهم الفئات:",

    TopRatedCardFeedback : "ملاحظات" ,

    TopRatedSection : "الأطباء المميزون:" ,

 

    // عن الموقع

    LocationSearchLocation : "موقع البحث" ,

    LocationSearch : "بحث" ,

    LocationCurrentLocation : "استخدم موقعي الحالي" ,

 

    //رسائل

    MessagesTypehere : "الرجاء نوع الرسالة هنا ..." ,

    MessagesHeaderText : "علبة الوارد" ,

 

    // من أجل AddAwardlayout

    AddAwardLayoutCompanyName : "اسم الشركة" ,

    AddAwardLayoutStartingDate : "تاريخ البدء" ,

    AddAwardLayoutJobTitle : "المسمى الوظيفي" ,

    AddAwardLayoutDescription: "الوصف",

    AddAwardLayoutAddNow : "أضف الآن" ,

 

    // من أجل AddListCard

    AddListCardAddExperience : "إضافة تجربة" ,

    AddListCardCompanyName : "اسم الشركة" ,

    AddListCardStartingDate : "تاريخ البدء" ,

    AddListCardEndDate : "تاريخ الانتهاء" ,

    AddListCardJobTitle : "المسمى الوظيفي" ,

    AddListCardDescription: "الوصف",

    AddListCardAddNow : "أضف الآن" ,

 

    // من أجل EducationAndExperienceLayout

    EducationAndExperienceLayoutAddExperience : "إضافة تجربة" ,

    EducationAndExperienceLayoutCompanyName : "اسم الشركة" ,

    EducationAndExperienceLayoutStartingDate: "تاريخ البدء",

    EducationAndExperienceLayoutEndDate : "تاريخ الانتهاء" ,

    EducationAndExperienceLayoutJobTitle : "المسمى الوظيفي" ,

    EducationAndExperienceLayoutDescription: "الوصف",

    EducationAndExperienceLayoutAddNow : "أضف الآن" ,

    EducationAndExperienceLayoutInstituteName : "اسم المعهد" ,

    EducationAndExperienceLayoutAddYourEducation : "أضف تعليمك" ,

 

    // للحصول على التفاصيل الشخصية

    PersonalDetailProfileSettingsHeader : "إعدادات ملف التعريف" ,

    PersonalDetailBaseName : "الاسم الأساسي" ,

    PersonalDetailSubHeading : "العنوان الفرعي" ,

    PersonalDetailFirstName : "الاسم الأول" ,

    PersonalDetailLastName : "اسم العائلة" ,

    PersonalDetailUsername : "اسم المستخدم" ,

    PersonalDetailMobileNum : "رقم الهاتف المحمول الشخصي" ,

    PersonalDetailStartingPrice: "السعر المبدئي",

    PersonalDetailWebUrl: "رابط الويب",

    PersonalDetailDescription : "الوصف" ,

    PersonalDetailYourClinicName : "اسم المستشفى الخاص بك" ,

    PersonalDetailSelectLocation : "حدد موقعًا" ,

    PersonalDetailSearchProjectLocation : "البحث عن موقع المشروع ..." ,

    PersonalDetailPickLocation : "اختر موقعًا" ,

    PersonalDetailYourAddress : "عنوانك" ,

    PersonalDetailEnterLongitude : "أدخل خط الطول" ,

    PersonalDetailEnterLatitude : "أدخل خط العرض" ,

    PersonalDetailEnterNumberHere : "أدخل الرقم هنا" ,

    PersonalDetailCompanyName : "اسم الشركة" ,

    PersonalDetailJobTitle : "المسمى الوظيفي" ,

    PersonalDetailStartingDate : "تاريخ البدء" ,

    PersonalDetailEndDate : "تاريخ الانتهاء" ,

    PersonalDetailInstituteName : "اسم المعهد" ,

    PersonalDetailInstituteTitle : "عنوان المعهد" ,

    PersonalDetailDegreeTitle : "عنوان الدرجة" ,

    PersonalDetailAwardTitle : "لقب الجائزة" ,

    PersonalDetailYear : "السنة" ,

    PersonalDetailAwardYear : "سنة الجائزة" ,

    PersonalDetailEnterRegistrationNumber : "أدخل رقم التسجيل القانوني" ,

    PersonalDetailFileSize : "حجم الملف:" ,

    PersonalDetailMemberships : "العضويات" ,

    PersonalDetailYourMemberships : "عضوياتك" ,

    PersonalDetailYourAddPhNum : "إضافة رقم الهاتف" ,

    PersonalDetailBookingDetails : "تفاصيل الحجز" ,

    PersonalDetailYourAddConDet : "إضافة تفاصيل جهة الاتصال" ,

    PersonalDetailYourContactPhNum : "رقم هاتف جهة الاتصال" ,

    PersonalDetailUser : "تفاصيلك" ,

    PersonalDetailAddClinicLogo : "إضافة شعار المستشفى" ,

    PersonalDetailLocation : "الموقع الافتراضي" ,

    PersonalDetailPhoto : "صورة الملف الشخصي" ,

    PersonalDetailAddPhoto : "إضافة صورة الملف الشخصي" ,

    PersonalDetailCurrentPhoto : "صورة الملف الشخصي الحالية" ,

    PersonalDetailCurrentLogo : "شعار المستشفى الحالي" ,

    PersonalDetailPhoneNo : "رقم هاتف الحجز" ,

    PersonalDetailSelectedLanguages: "حدد اللغات",

    PersonalDetailExperience : "أضف تجربتك" ,

    PersonalDetailAddNow : "أضف الآن" ,

    PersonalDetailEducation : "أضف تعليمك" ,

    PersonalDetailAddReward : "أضف جوائزك" ,

    PersonalDetailDownloads : "التنزيلات" ,

    PersonalDetailAddFileforDownlaod : "إضافة ملفات للتنزيل" ,

    PersonalDetailAddImages : "إضافة صور" ,

    PersonalDetailRegistrationNo : "أضف رقم تسجيلك القانوني و",

    PersonalDetailAddDocument : "إضافة مستند" ,

    PersonalDetailGallery: "صالة عرض",

    PersonalDetailVideos : "مقاطع الفيديو" ,

    PersonalDetailYourVideoURL : "عنوان URL للفيديو الخاص بك" ,

    PersonalDetailUpdateAllChanges : "حفظ وتحديث" ,

    PersonalDetailAddNew: "اضف جديد",


    // من أجل نتائج البحث

    SearchResultNoRecordFound : "عفوًا , لم يتم العثور على سجل" ,

    SearchResultSearchResult : "نتيجة البحث" ,

    SearchResultResultFound : "تم العثور على نتيجة البحث" ,

    SearchResultDisableFromAdmin: "معطل من المسؤول",


    // من أجل SecuritySetting

    SecuritySettingEmailNotification : "إدارة إشعارات البريد الإلكتروني" ,

    SecuritySettingUpdate : "تحديث كافة التغييرات الأخيرة" ,

    SecuritySettingAccount : "إعدادات وأمان الحساب" ,

    SecuritySettingDisableAccount : "تعطيل حسابي مؤقتًا" ,

    SecuritySettingChangePassword : "تغيير كلمة المرور" ,

    SecuritySettingLastPassword : "آخر تذكر كلمة المرور *" ,

    SecuritySettingNewPassword : "كلمة مرور جديدة *" ,

    SecuritySettingDeleteAccount : "حذف الحساب" ,

    SecuritySettingEnterPassword : "أدخل كلمة المرور *" ,

    SecuritySettingRetypePassword : "إعادة كتابة كلمة المرور *" ,

    SecuritySettingPickReason : "اختر سببًا للمغادرة" ,

    SecuritySettingReason : "سبب المغادرة" ,

    SecuritySettingDescription : "الوصف (اختياري)" ,

    SecuritySettingTabPassword : "كلمة المرور" ,

    SecuritySettingTabAccount : "الحساب" ,

    SecuritySettingTabSecurity : "الأمان" ,

    SecuritySettingTabEmail : "البريد الإلكتروني" ,

    SecuritySettingHeaderText : "إعدادات الأمان" ,

 

    // من أجل TeamListCard

    TeamListCardStatus: "الحالة:",

 

    // لقائمة الفريق

    TeamManagementHeaderText : "قائمة الفريق" ,

    TeamManagementSectionText : "أعضاء الفريق:" ,

    TeamManagementInviteDoctors: "ادعُ الأطباء",

    TeamManagementNewRequest : "طلب جديد" ,

 

    // بالنسبة إلى App.js

    AppSkip : "تخطي" ,

    AppWizardParagraph : 'ابحث عن أقرب الأطباء والمستشفيات لديك واحصل على \n موعدًا في غضون دقيقة',

    AppConfirm : "تأكيد" ,

    AppWantToLogout : "هل أنت متأكد أنك تريد تسجيل الخروج؟" ,

    AppYes: "نعم",

    AppCancel : "إلغاء" ,

    AppIncorrectDetail : "تفاصيل غير صحيحة" ,

    AppRateThisApp : "قيم هذا التطبيق" ,

    AppPleasegiveusFiveStar : "من فضلك أعطنا خمس نجوم على" ,

    Appappstore : " متجر التطبيقات " ,

    Appplaystore : " متجر Play " ,

    AppRateNow : "التقييم الآن" ,

    AppWowdidyouseethat : "رائع , هل رأيت ذلك؟ ",

    AppShareAppLink : "مشاركة رابط التطبيق" ,

    AppGuest : "ضيف" ,

    AppGreetings : "تحياتي" ,

    AppDashboard: "لوحة القيادة",

    AppAppointmentSettings : "إعدادات الموعد" ,

    AppAppointmentSettingsHospital : "إعدادات موعد المستشفى" ,

    AppAppointmentSettingsClinic : "إعدادات مواعيد المستشفيات" ,

    AppAppointmentListing : "تعيين قائمة" ,

    AppSpecialitiesServices : "التخصصات والخدمات" ,

    AppPayoutSetting : "إعدادات الدفع " ,

    AppPackages : "الحزم" ,

    AppFavorites: "المفضلة",

    AppInbox: "صندوق الوارد",

    AppManageTeam : "إدارة الفريق" ,

    AppLogin : "تسجيل الدخول" ,

    AppHealthForum : " المنتدى القانوني " ,

    AppBlogList : "قائمة المدونات" ,

    AppMyArticles : " مقالاتي " ,

    AppPostArticle : "مشاركة المقالة" ,

    AppGeneral : "عام" ,

    AppBottomSheetSearch : "ابدأ البحث" ,

    DrawerAboutus : "من نحن" ,

    DrawerPrivacyPolicy: "سياسة الخصوصية",

   DrawerTermsOfService: "شروط الخدمة",

   DrawerFAQ: "أسئلة مكررة",

    DrawerRateApp : "قيم هذا التطبيق" ,

    DrawerInviteFriends : "دعوة الأصدقاء" ,

    DrawerContact : "دعم الاتصال" ,

    DrawerDashboard: "لوحة القيادة",

 

    // من أجل لوحة القيادة

    DashboardHeader: "لوحة القيادة",

    DashboardNewMessages: "رسائل جديدة",

    DashboardClickToView : "انقر للعرض" ,

    DashboardCountDownFinished : "انتهى" ,

    DashboardCheckPackageDetail : "تحقق من تفاصيل الحزمة" ,

    DashboardUpdrageNow : "الترقية الآن" ,

    DashboardViewSavedItems : "عرض العناصر المحفوظة" ,

    DashboardAvailableBalance : "الرصيد المتاح" ,

    DashboardAddArticle: "إضافة مقالة",

    DashboardArticlesPublished : "المقالات المنشورة" ,

    DashboardSpecialitiesAndServices : "التخصصات والخدمات" ,

    DashboardManageTeam : "إدارة الفريق" ,

 

    // للحصول على إعدادات الملف الشخصي

    HeaderText : "إعدادات الملف الشخصي" ,

    PersonalDetail: "التفاصيل الشخصية",

    ExperienceAndEducation : "الخبرة والتعليم" ,

    AwardsAndDownloads: "الجوائز والتنزيلات",

    Registrations: "التسجيلات",

    Gallery: "صالة عرض",

    BookingSettings : "إعدادات الحجز" ,

    DefaultLocation : "الموقع الافتراضي" ,

 

    // للوصفة الطبية

    PrescriptionHeaderText: "وصفة طبية",

      PrescriptionPersonalInformation: "المعلومات الشخصية:",

      PrescriptionPatientName: "اسم المريض",

      PrescriptionPatientPhone: "هاتف المريض",

      PrescriptionAge: "العمر",

      PrescriptionAddress: "العنوان",

      PrescriptionSearchLocation: "موقع البحث ...",

      PrescriptionSelectLocation: "حدد موقعًا",

      PrescriptionMaritalStatus: "الحالة الاجتماعية:",

      PrescriptionSearchMaritalStatus: "بحث عن الحالة الاجتماعية ...",

      PrescriptionSelectMaritalStatus: "حدد الحالة الاجتماعية",

      PrescriptionChildhoodIllness: "مرض الطفولة:",

      PrescriptionSearchIllness: "البحث عن المرض ...",

      PrescriptionSelectIllness: "حدد المرض",

      PrescriptionDiseases: "الأمراض:",

      PrescriptionSearchDiseases: "البحث عن الأمراض ...",

      PrescriptionSelectDiseases: "حدد الأمراض",

      PrescriptionLaboratoryTests: "الاختبارات المعملية:",

      PrescriptionSearchLaboratoryTests: "البحث عن الاختبارات المعملية ...",

      PrescriptionSelectLaboratoryTests: "حدد الاختبارات المعملية",

      PrescriptionCommonIssues: "المشكلات الشائعة:",

      PrescriptionAddNew: "إضافة جديد",

      PrescriptionSearchVitalSign: "البحث في العلامة الحيوية ...",

      PrescriptionSelectVitalSign: "حدد العلامة الحيوية",

      PrescriptionValue: "القيمة",

      PrescriptionMedicalHistory: "التاريخ الطبي:",

      PrescriptionYourPatientMadicalHistory: "سجلك الطبي لمريضك",

      PrescriptionMedications: "الأدوية:",

      PrescriptionName: "الاسم",

      PrescriptionSearchType: "نوع البحث ...",

      PrescriptionSelectType: "حدد النوع",

      PrescriptionSearchMedicineDuration: "البحث عن مدة الدواء ...",

      PrescriptionSelectMedicineDuration: "حدد مدة الدواء",

      PrescriptionSearchMedicineUsage: "البحث عن استخدام الدواء ...",

      PrescriptionSelectMedicineUsage: "حدد استخدام الدواء",

      PrescriptionAddComment: "إضافة تعليق",


   }
})
export default strings;