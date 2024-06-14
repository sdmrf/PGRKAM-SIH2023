import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../custom-widgets/CustomText';
import {Image} from '@rneui/base';
import {COLORS} from '../../constants/colors';

const JobCard = ({jobData, gotToDescription}: any) => {
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Image
          source={{
            uri: jobData.companyLogo,
          }}
          style={styles.logo}
        />
        <View>
          <CustomText label={jobData.jobTitle} customStyle={styles.jobPost} />
          <CustomText
            label={jobData.companyName}
            customStyle={{fontSize: 16, color: COLORS.dark700}}
          />
        </View>
      </View>
      <CustomText
        label={` ₹${jobData.minSalary} - ${jobData.maxSalary} LPA`}
        customStyle={styles.salary}
      />
      <View style={styles.footer}>
        <CustomText label={jobData.specialization} customStyle={styles.tag} />
        <CustomText label={jobData.jobType} customStyle={styles.tag} />
        <TouchableOpacity onPress={() => gotToDescription(jobData)}>
          <CustomText
            label="Apply"
            customStyle={[styles.tag, {backgroundColor: COLORS.orange}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  logo: {
    height: 42,
    width: 42,
    borderRadius: 10,
  },
  jobPost: {
    color: COLORS.title,
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
  },
  jobCard: {
    padding: 20,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    backgroundColor: COLORS.light,
  },
  jobHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  salary: {
    fontSize: 18,
    fontFamily: 'DMSans-Black',
    color: COLORS.title,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  tag: {
    backgroundColor: '#e8e8e8',
    color: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 12,
    fontFamily: 'DMSans-SemiBold',
  },
});
