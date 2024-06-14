import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import CustomText from '../../components/custom-widgets/CustomText';
import {COLORS} from '../../constants/colors';
import ApplyForJob from '../../components/apply-jobs/ApplyForJob';
import JobInfo from '../../components/apply-jobs/JobInfo';
const JobDescriptionScreen = () => {
  const [isApplying, setIsApplying] = useState(false);
  const route = useRoute();
  const jobData: any = route.params;
  return (
    <ScrollView>
      <View style={{paddingTop: 40, paddingBottom: 20}}>
        <View style={styles.header}>
          <Image
            source={{
              uri: jobData.companyLogo,
            }}
            style={styles.logo}
          />
          <View>
            <CustomText label={jobData.jobTitle} customStyle={styles.title} />
          </View>
          <View style={styles.subtitles}>
            <CustomText
              label={`₹${jobData.minSalary} - ${jobData.maxSalary} LPA`}
              customStyle={styles.tag}
            />
            <Text style={styles.tag}> • </Text>
            <CustomText label={jobData.jobType} customStyle={styles.tag} />
            <Text style={styles.tag}> • </Text>
            <CustomText label="1 Day Ago" customStyle={styles.tag} />
          </View>
        </View>
        <JobInfo jobData={jobData} />
        {/* {isApplying ? (
          <ApplyForJob />
        ) : (
          <JobInfo jobData={jobData} setIsApplying={setIsApplying} />
        )} */}
      </View>
    </ScrollView>
  );
};

export default JobDescriptionScreen;

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 50,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: '-50%',
  },
  header: {
    paddingHorizontal: '6%',
    backgroundColor: '#ededed',
    paddingTop: 35,
    paddingBottom: 20,
  },
  tag: {
    color: COLORS.dark700,
    fontFamily: 'DMSans-SemiBold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
    marginBottom: 8,
  },
  subtitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
