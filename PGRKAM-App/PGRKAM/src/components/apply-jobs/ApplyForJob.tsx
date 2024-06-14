import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';
import CustomText from '../custom-widgets/CustomText';
import {TextInput} from 'react-native-paper';
import CustomButton from '../custom-widgets/CustomButton';

const ApplyForJob = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText
          label="Write Cover Letter"
          customStyle={styles.description}
        />
        <TextInput
          multiline
          numberOfLines={15}
          placeholder="Explain why you are the right person for the job..."
          placeholderTextColor="gray"
          style={styles.textarea}
        />
        <View style={styles.apply}>
          <CustomButton
            label="Apply"
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
});
