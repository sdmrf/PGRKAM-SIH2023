import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../constants/colors';
import CustomText from '../../../components/custom-widgets/CustomText';
import CustomButton from '../../../components/custom-widgets/CustomButton';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DUMMY_PROFILE} from '../../../constants/dummy';
import {useDispatch, useSelector} from 'react-redux';
import {handleUpdate} from '../../../utils/update';
import {setProfileData} from '../../../redux/slices/profileSlice';
import {useRoute} from '@react-navigation/native';

const ApplyForJob = ({navigation}: any) => {
  const {email, about} = useSelector((state: any) => state.profile);
  const [aboutInput, setAboutInput] = useState('');
  const dispatch = useDispatch();
  const router = useRoute();
  const isFromHome = router.params;
  const saveAbout = async () => {
    const updatedData = await handleUpdate(email, {about: aboutInput});
    dispatch(setProfileData(updatedData));
    if (isFromHome) {
      navigation.navigate('EducationScreen', {
        isFromHome: true,
      });
    } else navigation.goBack();
  };

  const getAboutData = () => {
    setAboutInput(about);
  };

  useEffect(() => {
    getAboutData();
  }, []);

  return (
    <ScrollView>
      {!isFromHome ? (
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
      <View style={styles.container}>
        <CustomText label="About me" customStyle={styles.description} />
        <TextInput
          multiline
          value={aboutInput}
          onChangeText={value => setAboutInput(value)}
          numberOfLines={15}
          placeholder="Explain about your skills, interests, experience, etc"
          placeholderTextColor="gray"
          style={styles.textarea}
        />
        <View style={styles.apply}>
          <CustomButton
            label="Save"
            onPress={saveAbout}
            customStyle={{backgroundColor: COLORS.dark, width: '100%'}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ApplyForJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: '4%',
    marginTop: 20,
  },
  description: {
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
    fontSize: 18,
  },
  textarea: {
    marginTop: 10,
    backgroundColor: COLORS.light,
  },
  apply: {
    width: '100%',
    marginTop: 30,
  },
  back: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
