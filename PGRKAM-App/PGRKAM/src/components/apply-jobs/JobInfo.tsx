import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../custom-widgets/CustomText';
import {COLORS} from '../../constants/colors';
import WebView from 'react-native-webview';
import CustomButton from '../custom-widgets/CustomButton';
import axios from 'axios';
import URL from '../../constants/url';
import {useSelector} from 'react-redux';

const JobInfo = ({jobData}: any) => {
  const {recruiterEmail} = jobData;
  const profile = useSelector((state: any) => state.profile);

  const [isReadMore, setIsReadMore] = useState(false);
  const applyForJob = async () => {
    try {
      let applicants;
      if (jobData.applicants) applicants = [...jobData.applicants, profile];
      else applicants = [profile];
      const response = await axios.patch(
        `${URL}/api/v1/jobs/${recruiterEmail}`,
        {applications: applicants},
      );
      if (response) Alert.alert('Applied to Job Successfully');
    } catch (error) {
      console.error('Error updating Jobs:', error);
    }
  };

  return (
    <>
      <View style={{paddingHorizontal: '4%', marginTop: 15}}>
        <CustomText label="Job Description" customStyle={styles.description} />
        <Text
          numberOfLines={isReadMore ? 50 : 5}
          style={styles.descriptionText}>
          {jobData.description}
        </Text>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => setIsReadMore(!isReadMore)}>
          <Text style={styles.readMore}>
            {' '}
            Read {isReadMore ? 'Less' : 'More'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: '4%', marginTop: 15}}>
        <CustomText label="Requirements" customStyle={styles.description} />
        <View>
          {jobData?.requirements.map((item: string, index: number) => (
            <Text key={index} style={[styles.descriptionText, {margin: 0}]}>
              {'•' + ' '}
              {item}
            </Text>
          ))}
        </View>
      </View>
      <View style={{paddingHorizontal: '4%', marginTop: 22}}>
        <CustomText label="Location" customStyle={styles.description} />
        <CustomText
          label={jobData.location}
          customStyle={{fontSize: 15, color: COLORS.dark700}}
        />

        <WebView
          source={{
            html: `<div style="width: 100%; overflow="hidden; height: '120%;" >
              <iframe height='150%' width="100%" style="border:0; margin-top: -150px;"  src = "https://maps.google.com/maps?q=${jobData.latitude},${jobData.longitude}&hl=es;z=14&amp;output=embed">
              </iframe>
            </div>
            `,
          }}
          style={styles.map}
        />
      </View>

      <View style={{paddingHorizontal: '5%', marginTop: 20}}>
        <CustomText label="Information" customStyle={styles.description} />
        <View>
          <CustomText label="Position" customStyle={styles.infoTitle} />
          <CustomText label={jobData.jobTitle} customStyle={styles.infoDesc} />
        </View>
        <View>
          <CustomText label="Qualification" customStyle={styles.infoTitle} />
          <CustomText
            label={jobData.qualification}
            customStyle={styles.infoDesc}
          />
        </View>
        <View>
          <CustomText label="Experience" customStyle={styles.infoTitle} />
          <CustomText
            label={jobData.experience}
            customStyle={styles.infoDesc}
          />
        </View>
        <View>
          <CustomText label="Job Type" customStyle={styles.infoTitle} />
          <CustomText label={jobData.jobType} customStyle={styles.infoDesc} />
        </View>
        <View>
          <CustomText label="Specialization" customStyle={styles.infoTitle} />
          <CustomText
            label={jobData.specialization}
            customStyle={styles.infoDesc}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: '4%', marginTop: 20}}>
        <CustomText
          label="Facilities and Others"
          customStyle={styles.description}
        />
        <View>
          {jobData?.facilities.map((facility: string, ind: number) => {
            return (
              <CustomText
                label={` ${'\u25CF'}  ${facility}`}
                key={ind}
                customStyle={[styles.infoDesc, {lineHeight: 25}]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.apply}>
        <CustomButton
          onPress={() => applyForJob()}
          label="Apply"
          customStyle={{backgroundColor: COLORS.dark}}
        />
      </View>
    </>
  );
};

export default JobInfo;

const styles = StyleSheet.create({
  description: {
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
    fontSize: 20,
  },
  descriptionText: {
    marginTop: 7,
    textAlign: 'justify',
    color: COLORS.dark700,
    fontSize: 14,
  },
  readMore: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
    color: COLORS.dark700,
    fontFamily: 'DMSans-Bold',
    textDecorationLine: 'underline',
  },
  map: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginTop: 10,
  },
  infoTitle: {
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
    fontSize: 16,
    marginTop: 12,
  },
  infoDesc: {
    color: COLORS.dark,
    fontFamily: 'DMSans-SemiBold',
    fontSize: 15,
    marginTop: 5,
  },
  apply: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
});
