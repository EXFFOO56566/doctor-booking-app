import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { RadioGroup } from "react-native-btr";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CONSTANT from "../Constants/local";
import styles from "../styles/DoctreatAppStyles";
import CustomHeader from "../Header/CustomHeader";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

class Prescription extends Component {
  state = {
    personalInformationRadioButtons: [
      {
        label: "Male",
        value: "male",
        checked: false,
        color: "#323232",
        disabled: false,
        size: 7
      },
      {
        label: "Female",
        value: "female",
        checked: false,
        color: "#323232",
        disabled: false,
        size: 7
      }
    ],
    spinner: false,
    patientLocationSelected: [],
    patientLaboratory_testsSelected: [],
    patientDiseaseSelected: [],
    patientMarital_statusSelected: [],
    patientMedicine_durationSelected: "",
    patientMedicine_usageSelected: "",
    patientMedicine_typesSelected: "",
    patientChildhood_illnessSelected: [],
    patientVital_signsSelected: "",
    patientVital_signsSelectedName: "",
    patientVital_signs: [],
    initialData: {},
    patientName: "",
    patientNo: "",
    age: "",
    address: "",
    value: "",
    history: "",
    gender: "",
    name: "",
    comment: "",
    commonIssue: [],
    newCommonIssue: [],
    Vitalrefresh: false,
    medicationsList: [],
    medicationsListWithID: [],
    medicationsRefresh: false
  };

  componentDidMount() {
    this.patientLocationSpinner();
    this.patientLaboratory_testsSpinner();
    this.patientDiseaseSpinner();
    this.patientMarital_statusSpinner();
    this.patientMedicine_durationSpinner();
    this.patientMedicine_usageSpinner();
    this.patientMedicine_typesSpinner();
    this.patientChildhood_illnessSpinner();
    this.patientVital_signsSpinner();
    this.getData();
  }
  getData = async () => {
    const { params } = this.props.navigation.state;
    return fetch(
      CONSTANT.BaseUrl +
        "prescription/saved_prescription?booking_id=" +
        params.id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          patientName: responseJson.patient_info.patient_name,
          age: responseJson.patient_info.age,
          patientNo: responseJson.patient_info.phone,
          address: responseJson.patient_info.address,
          history: responseJson.patient_info.medical_history,
          gender: responseJson.patient_info.gender
        });
        this.state.patientLocationSelected.push(
          responseJson.patient_info.location.id
        );
        for (
          var i = 0;
          i < this.state.personalInformationRadioButtons.length;
          i++
        ) {
          if (
            this.state.personalInformationRadioButtons[i].value ==
            this.state.gender
          ) {
            this.state.personalInformationRadioButtons[i].checked = true;
          }
        }
        this.state.patientMarital_statusSelected.push(
          responseJson.patient_info.marital_status.id
        );
        for (
          var i = 0;
          i < responseJson.patient_info.childhood_illness.length;
          i++
        ) {
          this.state.patientChildhood_illnessSelected[i] =
            responseJson.patient_info.childhood_illness[i].id;
        }
        for (var i = 0; i < responseJson.patient_info.diseases.length; i++) {
          this.state.patientDiseaseSelected[i] =
            responseJson.patient_info.diseases[i].id;
        }
        for (
          var i = 0;
          i < responseJson.patient_info.laboratory_test.length;
          i++
        ) {
          this.state.patientLaboratory_testsSelected[i] =
            responseJson.patient_info.laboratory_test[i].id;
        }
        for (var i = 0; i < responseJson.patient_info.medication.length; i++) {
          this.state.medicationsList.push({
            name: responseJson.patient_info.medication[i].name,
            medicine_types:
              responseJson.patient_info.medication[i].medicine_types.id,
            medicine_duration:
              responseJson.patient_info.medication[i].medicine_duration.id,
            medicine_usage:
              responseJson.patient_info.medication[i].medicine_usage.id,
            medicine_types_name:
              responseJson.patient_info.medication[i].medicine_types.name,
            medicine_duration_name:
              responseJson.patient_info.medication[i].medicine_duration.name,
            medicine_usage_name:
              responseJson.patient_info.medication[i].medicine_usage.name,
            detail: responseJson.patient_info.medication[i].detail
          });

          this.setState({ medicationsRefresh: !this.state.medicationsRefresh });
        }

        for (var i = 0; i < responseJson.patient_info.vital_sign.length; i++) {
          this.state.commonIssue[
            responseJson.patient_info.vital_sign[i].vital.id
          ] = {
            name: responseJson.patient_info.vital_sign[i].vital.id,
            value: responseJson.patient_info.vital_sign[i].value,
            displayName: responseJson.patient_info.vital_sign[i].vital.name
          };
          this.setState({ Vitalrefresh: !this.state.Vitalrefresh });
        }
        console.log("dsadsffds", this.state.commonIssue);
      })
      .catch(error => {
        console.error(error);
      });
  };

  patientLocationSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=locations",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientLocation = responseJson;
        this.setState({
          patientLocation
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientLaboratory_testsSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=laboratory_tests",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientLaboratory_tests = responseJson;
        this.setState({
          patientLaboratory_tests
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientDiseaseSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=diseases",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientDisease = responseJson;
        this.setState({
          patientDisease
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientMarital_statusSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=marital_status",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientMarital_status = responseJson;
        this.setState({
          patientMarital_status
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientMedicine_durationSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=medicine_duration",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientMedicine_duration = responseJson;
        this.setState({
          patientMedicine_duration
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientMedicine_usageSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=medicine_usage",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientMedicine_usage = responseJson;
        this.setState({
          patientMedicine_usage
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientMedicine_typesSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=medicine_types",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientMedicine_types = responseJson;
        this.setState({
          patientMedicine_types
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientChildhood_illnessSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=childhood_illness",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let patientChildhood_illness = responseJson;
        this.setState({
          patientChildhood_illness
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  patientVital_signsSpinner = async () => {
    this.setState({
      spinner: true
    });
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=vital_signs",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          patientVital_signs: responseJson,
          spinner: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ spinner: false });
      });
  };
  addCommonIssue = val => {
    var displayName = "";
    for (var i = 0; i < this.state.patientVital_signs.length; i++) {
      if (this.state.patientVital_signs[i].id == val) {
        displayName = this.state.patientVital_signs[i].name;
      }
    }
    this.setState({
      Vitalrefresh: true
    });
    this.state.commonIssue[val] = {
      name: val,
      value: this.state.value,
      displayName: displayName
    };
    const result = this.state.commonIssue.filter(key => key != null);
    console.log(result);
    this.setState({
      Vitalrefresh: true,
      value: "",
      patientVital_signsSelected: ""
    });
  };
  addMedicationsList = () => {
    var medicineTypeName = "";
    var medicineDurationName = "";
    var medicineUsageName = "";
    var medicineTypeid = "";
    var medicineDurationid = "";
    var medicineUsageid = "";

    for (var i = 0; i < this.state.patientMedicine_types.length; i++) {
      if (
        this.state.patientMedicine_types[i].id ==
        this.state.patientMedicine_typesSelected[0]
      ) {
        medicineTypeName = this.state.patientMedicine_types[i].name;
        medicineTypeid = this.state.patientMedicine_types[i].id;
      }
    }

    for (var i = 0; i < this.state.patientMedicine_duration.length; i++) {
      if (
        this.state.patientMedicine_duration[i].id ==
        this.state.patientMedicine_durationSelected[0]
      ) {
        medicineDurationName = this.state.patientMedicine_duration[i].name;
        medicineDurationid = this.state.patientMedicine_duration[i].id;
      }
    }

    for (var i = 0; i < this.state.patientMedicine_usage.length; i++) {
      if (
        this.state.patientMedicine_usage[i].id ==
        this.state.patientMedicine_usageSelected[0]
      ) {
        medicineUsageName = this.state.patientMedicine_usage[i].name;
        medicineUsageid = this.state.patientMedicine_usage[i].id;
      }
    }

    if (
      this.state.patientMedicine_typesSelected.toString() != "" &&
      this.state.patientMedicine_durationSelected.toString() != "" &&
      this.state.patientMedicine_usageSelected.toString() != ""
    ) {
      this.setState({
        medicationsRefresh: true
      });
      this.state.medicationsList.push({
        name: this.state.name,
        medicine_types: medicineTypeid,
        medicine_duration: medicineDurationid,
        medicine_usage: medicineUsageid,
        medicine_types_name: medicineTypeName,
        medicine_duration_name: medicineDurationName,
        medicine_usage_name: medicineUsageName,
        detail: this.state.comment
      });
      this.setState({
        medicationsRefresh: true,
        name: ""
      });
    } else {
      Alert.alert(CONSTANT.Oops, CONSTANT.AddCompleteData);
    }
  };
  HandleDeleteIssues = (index, item) => {
    this.state.commonIssue[item.name] = null
    // this.state.commonIssue.splice(item.name, 1);
    this.setState({
      Vitalrefresh: !this.state.Vitalrefresh
    });
    console.log(this.state.commonIssue.filter(x => x != null));
  };

  HandleDeleteMedicinesList = index => {
    this.state.medicationsList.splice(index, 1);
    this.setState({
      medicationsRefresh: !this.state.medicationsRefresh
    });
  };

  CreatePrescription = async () => {
    this.setState({
      spinner: true
    });
    let genderItem = this.state.personalInformationRadioButtons.find(
      e => e.checked == true
    );
    genderItem = genderItem
      ? genderItem.value
      : this.state.personalInformationRadioButtons[0].value;

    const { params } = this.props.navigation.state;
    const uid = await AsyncStorage.getItem("projectUid");
    const {
      patientName,
      patientNo,
      age,
      address,
      value,
      history,
      name,
      comment,
      patientLocationSelected,
      patientLaboratory_testsSelected,
      patientDiseaseSelected,
      patientMarital_statusSelected,
      patientMedicine_durationSelected,
      patientMedicine_usageSelected,
      patientMedicine_typesSelected,
      patientChildhood_illnessSelected,
      patientVital_signsSelected
    } = this.state;
    console.log("medicine", this.state.commonIssue);
    axios
      .post(CONSTANT.BaseUrl + "prescription/create_prescription", {
        user_id: uid,
        booking_id: params.id,
        patient_name: patientName,
        phone: patientNo,
        age: age,
        address: address,
        location: patientLocationSelected.toString(),
        gender: genderItem,
        marital_status: patientMarital_statusSelected.toString(),
        medical_history: history,
        childhood_illness: patientChildhood_illnessSelected,
        diseases: patientDiseaseSelected,
        laboratory_tests: patientLaboratory_testsSelected,
        vital_signs: this.state.commonIssue,
        medicine: this.state.medicationsList
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({
            spinner: false
          });
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({
            spinner: false
          });
        }
      })
      .catch(error => {
        Alert.alert(CONSTANT.Error, JSON.stringify(error));
      });
  };
  render() {
    const { spinner } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader headerText={CONSTANT.PrescriptionHeaderText} />
        {spinner ? (
          <Spinner
            visible={this.state.spinner}
            textContent={CONSTANT.BookAppointmentPleaseWait}
            color={"#fff"}
            textStyle={styles.SpinnerTextStyle}
          />
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: "#f7f7f7", margin: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionPersonalInformation}
            </Text>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PrescriptionPatientName}
                autoCorrect={false}
                value={this.state.patientName}
                style={styles.TextInputLayoutStyle}
                onChangeText={patientName => this.setState({ patientName })}
              ></TextInput>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PrescriptionPatientPhone}
                keyboardType="numeric"
                value={this.state.patientNo}
                style={styles.TextInputLayoutStyle}
                onChangeText={patientNo => this.setState({ patientNo })}
              ></TextInput>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PrescriptionAge}
                value={this.state.age}
                autoCorrect={false}
                style={styles.TextInputLayoutStyle}
                onChangeText={age => this.setState({ age })}
              ></TextInput>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PrescriptionAddress}
                value={this.state.address}
                autoCorrect={false}
                style={styles.TextInputLayoutStyle}
                onChangeText={address => this.setState({ address })}
              ></TextInput>
            </View>

            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientLocationSelected: value })
                }
                selectedItems={this.state.patientLocationSelected}
                items={this.state.patientLocation}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PrescriptionSearchLocation}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectLocation}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
            <View>
              <RadioGroup
                color="#3fabf3"
                labelStyle={styles.RadioLabelStyle}
                radioButtons={this.state.personalInformationRadioButtons}
                onPress={personalInformationRadioButtons =>
                  this.setState({ personalInformationRadioButtons })
                }
                style={styles.RadioButtonStyle}
              />
            </View>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionMaritalStatus}
            </Text>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientMarital_statusSelected: value })
                }
                selectedItems={this.state.patientMarital_statusSelected}
                items={this.state.patientMarital_status}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={
                  CONSTANT.PrescriptionSearchMaritalStatus
                }
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectMaritalStatus}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionChildhoodIllness}
            </Text>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientChildhood_illnessSelected: value })
                }
                selectedItems={this.state.patientChildhood_illnessSelected}
                items={this.state.patientChildhood_illness}
                uniqueKey="id"
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.PrescriptionSearchIllness}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectIllness}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionDiseases}
            </Text>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientDiseaseSelected: value })
                }
                selectedItems={this.state.patientDiseaseSelected}
                items={this.state.patientDisease}
                uniqueKey="id"
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.PrescriptionSearchDiseases}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectDiseases}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionLaboratoryTests}
            </Text>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientLaboratory_testsSelected: value })
                }
                selectedItems={this.state.patientLaboratory_testsSelected}
                items={this.state.patientLaboratory_tests}
                uniqueKey="id"
                borderBottomWidth={0}
                searchInputPlaceholderText={
                  CONSTANT.PrescriptionSearchLaboratoryTests
                }
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectLaboratoryTests}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.PrescriptionCommonIssues}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.addCommonIssue(this.state.patientVital_signsSelected[0])
                }
              >
                <Text
                  style={{
                    color: "#3fabf3",
                    fontWeight: "700",
                    paddingHorizontal: 10,
                    paddingTop: 10
                  }}
                >
                  {CONSTANT.PrescriptionAddNew}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientVital_signsSelected: value })
                }
                selectedItems={this.state.patientVital_signsSelected}
                items={this.state.patientVital_signs}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={
                  CONSTANT.PrescriptionSearchVitalSign
                }
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectVitalSign}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              keyboardType="numeric"
              placeholder={CONSTANT.PrescriptionValue}
              value={this.state.value}
              style={styles.TextInputLayoutStyle}
              onChangeText={value => this.setState({ value })}
            ></TextInput>

            <FlatList
              data={this.state.commonIssue.filter(x => x != null)}
              keyExtractor={(x, i) => i.toString()}
              extraData={this.state.Vitalrefresh}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    alignItems: "center",
                    marginBottom: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: CONSTANT.primaryColor,
                      width: "85%",
                      borderTopLeftRadius: 4,
                      borderBottomLeftRadius: 4,
                      padding: 6,
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#fff",
                        marginHorizontal: 15,
                        marginVertical: 10
                      }}
                    >
                      {item.displayName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#fff",
                        marginHorizontal: 25,
                        marginVertical: 10
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.HandleDeleteIssues(index,item)}
                    style={{
                      width: "15%",
                      backgroundColor: "#ff5851",
                      padding: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomRightRadius: 4,
                      borderTopRightRadius: 4
                    }}
                  >
                    <AntIcon name="delete" color={"#fff"} size={20} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PrescriptionMedicalHistory}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.PrescriptionYourPatientMadicalHistory}
              multiline={true}
              value={this.state.history}
              style={styles.TextInputLayoutStyleForDetail}
              onChangeText={history => this.setState({ history })}
            ></TextInput>
          </View>
          <View style={{ backgroundColor: "#f7f7f7", marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.PrescriptionMedications}
              </Text>
              <TouchableOpacity onPress={() => this.addMedicationsList()}>
                <Text
                  style={{
                    color: "#3fabf3",
                    fontWeight: "700",
                    paddingHorizontal: 10,
                    paddingTop: 10
                  }}
                >
                  {CONSTANT.PrescriptionAddNew}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.PrescriptionName}
              autoCorrect={false}
              value={this.state.name}
              style={styles.TextInputLayoutStyle}
              onChangeText={name => this.setState({ name })}
            ></TextInput>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientMedicine_typesSelected: value })
                }
                selectedItems={this.state.patientMedicine_typesSelected}
                items={this.state.patientMedicine_types}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PrescriptionSearchType}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectType}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientMedicine_durationSelected: value })
                }
                selectedItems={this.state.patientMedicine_durationSelected}
                items={this.state.patientMedicine_duration}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={
                  CONSTANT.PrescriptionSearchMedicineDuration
                }
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectMedicineDuration}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ patientMedicine_usageSelected: value })
                }
                selectedItems={this.state.patientMedicine_usageSelected}
                items={this.state.patientMedicine_usage}
                uniqueKey="id"
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={
                  CONSTANT.PrescriptionSearchMedicineUsage
                }
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PrescriptionSelectMedicineUsage}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.PrescriptionAddComment}
              value={this.state.comment}
              style={styles.TextInputLayoutStyle}
              onChangeText={comment => this.setState({ comment })}
            ></TextInput>

            <FlatList
              data={this.state.medicationsList}
              keyExtractor={(x, i) => i.toString()}
              extraData={this.state.medicationsRefresh}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      borderColor: "#767676",
                      borderRadius: 4,
                      borderWidth: 0.6,
                      padding: 7,
                      marginHorizontal: 10,
                      width: "95%",
                      marginVertical: 5,
                      backgroundColor: CONSTANT.primaryColor
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#fff",
                          marginHorizontal: 15,
                          marginVertical: 10
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#fff",
                          marginHorizontal: 15,
                          marginVertical: 10
                        }}
                      >
                        {item.medicine_types_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#fff",
                          marginHorizontal: 15,
                          marginVertical: 10
                        }}
                      >
                        {item.medicine_duration_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#fff",
                          marginHorizontal: 15,
                          marginVertical: 10
                        }}
                      >
                        {item.medicine_usage_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: "#fff",
                          marginHorizontal: 15,
                          marginVertical: 10
                        }}
                      >
                        {item.detail}
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.HandleDeleteMedicinesList(index)}
                        style={{
                          backgroundColor: "#ff5851",
                          paddingVertical: 10,
                          paddingHorizontal: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderBottomRightRadius: 4,
                          borderTopRightRadius: 4
                        }}
                      >
                        <AntIcon name="delete" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.CreatePrescription()}
            style={styles.CustomButtonRightArea}
          >
            <Text style={styles.MainButtonText}>{CONSTANT.SaveUpdate}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Prescription;
