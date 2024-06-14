import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../components/custom-widgets/CustomText';
import {Input} from '@rneui/base';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/custom-widgets/CustomButton';
import {setProfileData} from '../../../redux/slices/profileSlice';
import {handleUpdate} from '../../../utils/update';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const LanguagesScreen = ({navigation}: any) => {
  const {email, languages: allLanguages} = useSelector(
    (state: any) => state.profile,
  );
  const [inputValue, setInputValue] = useState<any>();
  const [languages, setLanguages] = useState<any>(allLanguages);
  const dispatch = useDispatch();

  const inputSubmit = () => {
    if (inputValue.trim().length > 0) {
      setLanguages([...languages, inputValue]);
      setInputValue('');
    }
  };

  const saveLanguages = async () => {
    const updatedData = await handleUpdate(email, {languages});
    dispatch(setProfileData(updatedData));
    navigation.goBack();
  };

  const removeTag = (ind: number) => {
    setLanguages(
      languages.filter((skill: string, skillInd: number) => {
        return ind != skillInd;
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.back}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.dark}
            size={25}
          />
        </View>
      </TouchableOpacity>
      <CustomText label="Add Languages" customStyle={styles.titleStyle} />
      <View style={styles.languages}>
        <Input
          style={[styles.inputStyle]}
          placeholder="Enter language"
          onChangeText={(value: any) => {
            setInputValue(value);
          }}
          inputContainerStyle={{borderBottomWidth: 0}}
          returnKeyType="search"
          autoFocus={true}
          value={inputValue}
          onSubmitEditing={inputSubmit}
          clearButtonMode="while-editing"
        />
        {languages.map((tag: string, ind: number) => (
          <View style={styles.tag} key={ind}>
            <Text style={{color: COLORS.dark}}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(ind)}>
              <Icon
                name="close-outline"
                color={COLORS.dark}
                style={{padding: 1}}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.bottomButton}>
        <CustomButton
          label="Save"
          onPress={() => saveLanguages()}
          customStyle={{backgroundColor: COLORS.dark}}
        />
      </View>
    </View>
  );
};

export default LanguagesScreen;

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginLeft: -10,
    fontSize: 20,
    borderRadius: 8,
    marginBottom: -20,
    borderBottomWidth: 1,
    borderColor: '#cdcccc',
    backgroundColor: COLORS.white,
  },
  languages: {
    paddingHorizontal: 13,
    paddingBottom: 25,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    shadowColor: '#000',
    marginHorizontal: '0%',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 11.25,
    shadowRadius: 11.84,
  },
  tag: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ededed',
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
    marginBottom: 20,
    marginHorizontal: 13,
  },
  back: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: COLORS.dark,
  },
  bottomButton: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
});
