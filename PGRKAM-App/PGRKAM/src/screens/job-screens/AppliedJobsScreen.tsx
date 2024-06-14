import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import JobCard from '../../components/cards/JobCard';
import {DUMMY_JOBS} from '../../constants/dummy';
import {COLORS} from '../../constants/colors';
import CustomText from '../../components/custom-widgets/CustomText';
import {Input} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppliedJobCard from '../../components/cards/AppliedJobsCard';

const AppliedJobsScreen = ({navigation}: any) => {
  const [allJobs, setAllJobs] = useState<any>([]);
  const [tempAllJobs, setTempAllJobs] = useState<any>([]);
  useEffect(() => {
    setAllJobs(DUMMY_JOBS);
    setTempAllJobs(DUMMY_JOBS);
  }, []);
  const gotToDescription = (jobData: any) => {
    navigation.navigate('JobDescriptionScreen', jobData);
  };
  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllJobs.filter((job: any) => {
      return (
        job.companyName.toLowerCase().includes(value) ||
        job.jobTitle.toLowerCase().includes(value) ||
        job.specialization.toLowerCase().includes(value) ||
        job.jobType.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value)
      );
    });
    setAllJobs(data);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.head}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backbtn}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={COLORS.dark}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <View>
              <CustomText
                label="Applied Jobs"
                customStyle={styles.headingtxt}
              />
            </View>
          </View>
          <TouchableOpacity>
            <CustomText label="Delete All" customStyle={styles.deleteText} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchInput}>
          <Ionicons
            name="search"
            size={20}
            color="#364F6B"
            style={{paddingVertical: 5, paddingHorizontal: 10}}
          />
          <TextInput
            placeholder="Search by Role, Company, etc."
            onChangeText={(value: string) => filterResults(value)}
            placeholderTextColor={COLORS.dark700}
            style={{flex: 1, paddingVertical: 0, color: '#364F6B'}}
          />
        </View>

        <View style={{width: '93%', marginTop: 10}}>
          <View>
            {allJobs.length > 0 && (
              <FlatList
                style={{marginBottom: 368}}
                data={allJobs}
                keyExtractor={item => item?.jobId} // You can use a unique key here
                renderItem={({item}) => {
                  return (
                    <AppliedJobCard
                      jobData={item}
                      gotToDescription={gotToDescription}
                    />
                  );
                }}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppliedJobsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  textStyle: {
    fontSize: 26,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
  },
  searchInput: {
    borderRadius: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginHorizontal: '3%',
    borderBottomColor: '#ccc',
    backgroundColor: '#fbfbfb',
  },
  headingtxt: {
    color: COLORS.title,
    fontFamily: 'DMSans-ExtraBold',
    fontSize: 25,
    marginBottom: 5,
    padding: '5%',
  },
  backbtn: {
    paddingLeft: 12,
    paddingBottom: 10,
    width: '100%',
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteText: {
    color: COLORS.yellow,
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    marginRight: 20,
    marginTop: -2,
  },
});
