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

let achievementSchema = object({
  achievement: string()
    .matches(/\S/, 'Name cannot be only spaces')
    .required('Name is required'),
  associatedWith: string().required('Please enter associated organization'),
  description: string(),
});

const Achievement = ({navigation}: any) => {
  const route = useRoute();
  const ach = route.params;
  const [fromDateLabel, setFromDateLabel] = useState(
    ach && (ach as {from: string}).from
      ? (ach as {from: string}).from
      : 'Select Date',
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [dateOpen, setdateOpen] = useState(false);

  let {email, achievements: allAchievements} = useSelector(
    (state: any) => state.profile,
  );

  const dispatch = useDispatch();

  const handleAchievementSubmit = async (values: any) => {
    const updatedAchievement = {
      ...values,
      date: fromDateLabel,
    };
    Alert.alert(updatedAchievement.associatedWith);
    let index = -1;
    if (ach) {
      index = allAchievements.findIndex(
        (x: any) => x._id == (ach as {_id: any})._id,
      );
    }

    if (index != -1) {
      const updatedallAchievements = [...allAchievements];
      updatedallAchievements[index] = updatedAchievement;
      allAchievements = [...updatedallAchievements];
    } else {
      allAchievements = [...allAchievements, updatedAchievement];
    }

    const updatedData = await handleUpdate(email, {
      achievements: allAchievements,
    });

    dispatch(setProfileData(updatedData));
    navigation.goBack();
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{width: '100%', height: '100%', paddingBottom: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.dark}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <CustomText label="Add Achievement" customStyle={styles.titleStyle} />
        <Formik
          initialValues={{
            achievement: ach ? (ach as {achievement: string}).achievement : '',
            associatedWith: ach
              ? (ach as {associatedWith: string}).associatedWith
              : '',
            description: ach ? (ach as {description: string}).description : '',
          }}
          validationSchema={achievementSchema}
          onSubmit={values => {
            handleAchievementSubmit(values);
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
                    label="Achievement"
                    customStyle={styles.inputText}
                  />
                  <Input
                    placeholder="Enter Achievement Title"
                    value={values.achievement}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    onChangeText={handleChange('achievement')}
                  />
                  {touched.achievement && errors.achievement && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.achievement.toString()}
                    />
                  )}
                </View>

                <View style={{width: '100%'}}>
                  <CustomText
                    label="Associated Organization"
                    customStyle={styles.inputText}
                  />
                  <Input
                    placeholder="Enter associated organization"
                    value={values.associatedWith}
                    inputContainerStyle={[styles.inputStyle, {height: 50}]}
                    style={{borderBottomWidth: 0}}
                    onChangeText={handleChange('associatedWith')}
                  />
                  {touched.associatedWith && errors.associatedWith && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.associatedWith.toString()}
                    />
                  )}
                </View>

                <View style={styles.dateContainer}>
                  <View style={{width: '100%'}}>
                    <CustomText
                      label="Date"
                      customStyle={[styles.inputText, {paddingLeft: 5}]}
                    />
                    <View style={styles.dateStyle}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={COLORS.dark700}
                        style={{marginRight: 5, marginTop: 3}}
                      />
                      <TouchableOpacity onPress={() => setdateOpen(true)}>
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
                </View>

                <DatePicker
                  modal
                  open={dateOpen}
                  date={fromDate}
                  mode={'date'}
                  maximumDate={new Date('2030-01-01')}
                  minimumDate={new Date('1999-10-08')}
                  onConfirm={date => {
                    setdateOpen(false);
                    setFromDate(date);
                    setFromDateLabel(
                      date.toDateString().split(' ')[1] +
                        ' ' +
                        date.toDateString().split(' ')[3],
                    );
                  }}
                  onCancel={() => {
                    setdateOpen(false);
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
                      label={errors.description.toString()}
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
  AchievementFooter: {
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

export default Achievement;
