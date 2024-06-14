import React, {useContext, useState} from 'react';
import {Input} from '@rneui/themed';
import {
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
import {handleUpdate} from '../../../utils/update';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileData} from '../../../redux/slices/profileSlice';

let educationSchema = object({
  course: string()
    .matches(/\S/, 'Course cannot be only spaces')
    .required('Name is required'),
  institute: string()
    .matches(/\S/, 'Institute cannot be only spaces')
    .required('Please enter email address'),
  major: string()
    .matches(/\S/, 'Major cannot be only spaces')
    .required('Password is required'),

  description: string(),
});

const EducationScreen = ({navigation}: any) => {
  const route = useRoute();
  const edu = route.params;

  let {email, education: educations} = useSelector(
    (state: any) => state.profile,
  );

  console.log(educations);
  const [fromDateLabel, setFromDateLabel] = useState(
    edu && (edu as {from: string}).from
      ? (edu as {from: string}).from
      : 'Select Date',
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);

  const [toDateLabel, setToDateLabel] = useState(
    edu && (edu as {to: string}).to ? (edu as {to: string}).to : 'Select Date',
  );
  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);

  const dispatch = useDispatch();
  const handleEducationSubmit = async (values: any) => {
    const updatedEducation = {
      ...values,
      from: fromDateLabel,
      to: toDateLabel,
    };

    let index = -1;

    if (edu && !(edu as {isFromHome: any}).isFromHome) {
      index = educations.findIndex(
        (x: any) => x._id == (edu as {_id: any})._id,
      );
    }

    if (index != -1) {
      const updatedEducations = [...educations];
      updatedEducations[index] = updatedEducation;
      educations = [...updatedEducations];
    } else {
      educations = [...educations, updatedEducation];
    }

    const updatedData = await handleUpdate(email, {
      education: educations,
    });

    dispatch(setProfileData(updatedData));
    if ((edu as {isFromHome: any}).isFromHome)
      navigation.navigate('SkillsScreen', true);
    else navigation.goBack();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{width: '100%', height: '100%', paddingBottom: 20}}>
        {!(edu as {isFromHome: any}).isFromHome ? (
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
        <CustomText label="Add Education" customStyle={styles.titleStyle} />
        <Formik
          initialValues={{
            course: edu ? (edu as {course: string}).course : '',
            institute: edu ? (edu as {institute: string}).institute : '',
            major: edu ? (edu as {major: string}).major : '',
            description: edu ? (edu as {description: string}).description : '',
          }}
          validationSchema={educationSchema}
          onSubmit={values => {
            handleEducationSubmit(values);
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
                  <CustomText
                    label="Level of Education"
                    customStyle={styles.inputText}
                  />
                  <Input
                    placeholder="Enter level of education"
                    value={values.course}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    onChangeText={handleChange('course')}
                  />
                  {touched.course && errors.course && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.course}
                    />
                  )}
                </View>

                <View style={{width: '100%'}}>
                  <CustomText
                    label="Institute"
                    customStyle={styles.inputText}
                  />
                  <Input
                    placeholder="Enter Institute Name"
                    value={values.institute}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    style={{borderBottomWidth: 0}}
                    onChangeText={handleChange('institute')}
                  />
                  {touched.institute && errors.institute && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.institute}
                    />
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <CustomText
                    label="Field of Study"
                    customStyle={styles.inputText}
                  />

                  <Input
                    placeholder="Enter field of study"
                    value={values.major}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    onChangeText={handleChange('major')}
                  />
                  {touched.major && errors.major && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.major}
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
                    style={{textAlignVertical: 'top'}}
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
                  onPress={() => handleSubmit()}
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
  EducationFooter: {
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

export default EducationScreen;
