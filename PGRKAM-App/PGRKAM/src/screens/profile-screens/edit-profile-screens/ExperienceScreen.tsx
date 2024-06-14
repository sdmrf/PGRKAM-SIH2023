import React, {useContext, useState} from 'react';
import {Input} from '@rneui/themed';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../../components/custom-widgets/CustomButton';
import {COLORS} from '../../../constants/colors';
import CustomText from '../../../components/custom-widgets/CustomText';
import {Formik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DatePicker from 'react-native-date-picker';
//context API
import {object, string, ref} from 'yup';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {handleUpdate} from '../../../utils/update';
import {setProfileData} from '../../../redux/slices/profileSlice';

let experienceSchema = object({
  role: string()
    .matches(/\S/, 'Role cannot be only spaces')
    .required('Name is required'),
  company: string()
    .matches(/\S/, 'Company cannot be only spaces')
    .required('Please enter email address'),
  empType: string()
    .matches(/\S/, 'Employee type cannot be only spaces')
    .required('Password is required'),
  description: string().matches(/\S/, 'Description cannot be only spaces'),
});

const ExperienceScreen = ({navigation}: any) => {
  const route = useRoute();
  const exp = route.params;

  const [fromDateLabel, setFromDateLabel] = useState(
    exp && (exp as {from: string}).from
      ? (exp as {from: string}).from
      : 'Select Date',
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);

  const [toDateLabel, setToDateLabel] = useState(
    exp && (exp as {to: string}).to ? (exp as {to: string}).to : 'Select Date',
  );
  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);

  let {email, experience: experiences} = useSelector(
    (state: any) => state.profile,
  );

  const dispatch = useDispatch();

  const handleExperienceSubmit = async (values: any) => {
    const updatedEducation = {
      ...values,
      from: fromDateLabel,
      to: toDateLabel,
    };
    let index = -1;
    if (exp && !(exp as {isFromHome: any}).isFromHome) {
      index = experiences.findIndex(
        (x: any) => x._id == (exp as {_id: any})._id,
      );
    }
    if (index != -1) {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = updatedEducation;
      experiences = [...updatedExperiences];
    } else {
      experiences = [...experiences, updatedEducation];
    }

    const updatedData = await handleUpdate(email, {
      experience: experiences,
    });

    dispatch(setProfileData(updatedData));
    if ((exp as {isFromHome: any}).isFromHome)
      navigation.navigate('HomeScreen');
    else navigation.goBack();
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{width: '100%', height: '100%', paddingBottom: 20}}>
        {!(experiences as {isFromHome: any}).isFromHome ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.back}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={COLORS.dark}
                size={25}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.back}></View>
        )}
        <CustomText label="Add Experience" customStyle={styles.titleStyle} />
        <Formik
          initialValues={{
            role: exp ? (exp as {role: string}).role : '',
            company: exp ? (exp as {company: string}).company : '',
            empType: exp ? (exp as {empType: string}).empType : '',
            description: exp ? (exp as {description: string}).description : '',
          }}
          validationSchema={experienceSchema}
          onSubmit={values => {
            handleExperienceSubmit(values);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={[styles.container]}>
                <View style={{width: '100%'}}>
                  <CustomText label="Role" customStyle={styles.inputText} />
                  <Input
                    placeholder="Enter your job role"
                    value={values.role}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    onChangeText={handleChange('role')}
                  />
                  {touched.role && errors.role && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.role}
                    />
                  )}
                </View>

                <View style={{width: '100%'}}>
                  <CustomText
                    label="Company Name"
                    customStyle={styles.inputText}
                  />
                  <Input
                    placeholder="Enter company Name"
                    value={values.company}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    style={{borderBottomWidth: 0}}
                    onChangeText={handleChange('company')}
                  />
                  {touched.company && errors.company && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.company}
                    />
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <CustomText
                    label="Employee Type"
                    customStyle={styles.inputText}
                  />

                  <Input
                    placeholder="Ex - Internship"
                    value={values.empType}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    onChangeText={handleChange('empType')}
                  />
                  {touched.empType && errors.empType && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.empType}
                    />
                  )}
                </View>
                <View style={styles.dateContainer}>
                  <View style={{width: '48%'}}>
                    <CustomText
                      label="From"
                      customStyle={[styles.inputText, {paddingLeft: 5}]}
                    />
                    <View style={styles.dateStyle}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={COLORS.dark700}
                        style={{marginRight: 5, marginTop: 3}}
                      />
                      <TouchableOpacity onPress={() => setFromDateOpen(true)}>
                        <Text
                          style={{
                            color: COLORS.dark700,
                            marginLeft: 3,
                            marginTop: 4,
                          }}>
                          {fromDateLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{width: '4%'}}></View>
                  <View style={{width: '48%'}}>
                    <CustomText
                      label="To"
                      customStyle={[styles.inputText, {paddingLeft: 5}]}
                    />
                    <TouchableOpacity onPress={() => setToDateOpen(true)}>
                      <View style={styles.dateStyle}>
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={COLORS.dark700}
                          style={{marginRight: 5, marginTop: 3}}
                        />
                        <Text
                          style={{
                            color: COLORS.dark700,
                            marginLeft: 3,
                            marginTop: 4,
                          }}>
                          {toDateLabel}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <DatePicker
                  modal
                  open={fromDateOpen}
                  date={fromDate}
                  mode={'date'}
                  maximumDate={new Date('2030-01-01')}
                  minimumDate={new Date('1999-10-08')}
                  onConfirm={date => {
                    setFromDateOpen(false);
                    setFromDate(date);
                    setFromDateLabel(
                      date.toDateString().split(' ')[1] +
                        ' ' +
                        date.toDateString().split(' ')[3],
                    );
                  }}
                  onCancel={() => {
                    setFromDateOpen(false);
                  }}
                />
                <DatePicker
                  modal
                  open={toDateOpen}
                  date={toDate}
                  mode={'date'}
                  maximumDate={new Date('2030-01-01')}
                  minimumDate={new Date('1999-10-08')}
                  onConfirm={date => {
                    setToDateOpen(false);
                    setToDate(date);
                    setToDateLabel(
                      date.toDateString().split(' ')[1] +
                        ' ' +
                        date.toDateString().split(' ')[3],
                    );
                  }}
                  onCancel={() => {
                    setToDateOpen(false);
                  }}
                />
                <View style={{width: '100%'}}>
                  <CustomText
                    label="Description (optional)"
                    customStyle={styles.inputText}
                  />
                  <Input
                    multiline
                    style={{textAlignVertical: 'top', paddingTop: 0}}
                    numberOfLines={5}
                    placeholder="Enter Description"
                    value={values.description}
                    inputContainerStyle={[styles.inputStyle, {height: 150}]}
                    onChangeText={handleChange('description')}
                  />
                  {touched.description && errors.description && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.description}
                    />
                  )}
                </View>

                <CustomButton
                  label="SAVE"
                  customStyle={{backgroundColor: COLORS.dark}}
                  onPress={() => {
                    console.log('Submitted');
                    handleSubmit();
                  }}
                />
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputText: {
    color: COLORS.text,
    paddingLeft: '4.8%',
    paddingBottom: 5,
  },
  ExperienceScreenFooter: {
    gap: 5,
    paddingVertical: 8,
    marginBottom: 20,
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    paddingVertical: 40,
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
  },
  errorText: {
    fontSize: 13,
    marginTop: -25,
    marginLeft: '4.9%',
    marginBottom: 20,
    color: COLORS.error,
  },
  dateStyle: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    backgroundColor: COLORS.white,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 9,
    marginTop: 5,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    padding: 5,
    fontSize: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#cdcccc',
    marginHorizontal: '2%',
    backgroundColor: COLORS.white,
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
    marginBottom: 30,
    marginHorizontal: 13,
  },
  back: {
    paddingVertical: 20,
    paddingHorizontal: 9,
    color: COLORS.dark,
  },
});

export default ExperienceScreen;
