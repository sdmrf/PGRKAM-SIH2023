import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Avatar} from '@rneui/base';
import CustomText from '../components/custom-widgets/CustomText';
import {COLORS} from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import HomeCard from '../components/cards/HomeCard';
import JobCard from '../components/cards/JobCard';
import {RECOMMENDED_JOBS} from '../constants/dummy';
import auth from '@react-native-firebase/auth';
import URL from '../constants/url';
import notifee from '@notifee/react-native';
import Geolocation from '@react-native-community/geolocation';
import axios, {all} from 'axios';
import {useSelector} from 'react-redux';
import {setProfileData} from '../redux/slices/profileSlice';
import {useDispatch} from 'react-redux';
type Props = {};
type UserObj = {
  name: string | any;
  email: string;
};

const Home = ({navigation}: any) => {
  const [userData, setUserData] = useState<UserObj>();
  const [loading, setLoading] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [allJobsData, setAllJobsData] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState<any>('');
  const [currentLongitude, setCurrentLongitude] = useState<any>('');

  const [jobsWithNotifications, setJobsWithNotifications] = useState<any>([]);

  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const dispatch = useDispatch();
  const googleLoginState = useSelector((state: any) => state.googleUser);
  const {email} = useSelector((state: any) => state.profile);

  const handleGetData = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/job-seekers/${email}`);
      console.log('Email : ', email);
      const jobSeekerProfile = response.data.data;
      console.log(jobSeekerProfile);
      dispatch(setProfileData(jobSeekerProfile));
      if (jobSeekerProfile?.about.trim().length === 0) {
        navigation.navigate('AboutMeScreen', true);
      }
      if (jobSeekerProfile?.education.length === 0) {
        navigation.navigate('EducationScreen', true);
      }
      if (jobSeekerProfile?.skills.length === 0) {
        navigation.navigate('SkillsScreen', true);
      }
    } catch (error) {
      navigation.navigate('AboutMeScreen', true);
    }
  };

  const getAllJobs = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/jobs/`);
      // console.log(response.data.data);
      setAllJobsData(response.data.data);
    } catch (err) {}
  };

  const haversine = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    // Radius of the Earth in meters
    const R = 6371000.0;

    // Convert latitude and longitude from degrees to radians
    const [radLat1, radLon1, radLat2, radLon2] = [lat1, lon1, lat2, lon2].map(
      coord => (coord * Math.PI) / 180,
    );

    // Calculate differences in coordinates
    const dlat = radLat2 - radLat1;
    const dlon = radLon2 - radLon1;

    // Haversine formula
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in meters
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    getAllJobs();
    handleGetData();
    getRecommendedJobs();
  }, []);

  const findLocations = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
        const nearbyJobs: any = allJobsData.filter((job: any, ind: number) => {
          const dist = haversine(
            currentLatitude,
            currentLongitude,
            job.latitude,
            job.longitude,
          );
          return (
            dist <= 50 && allJobsData.filter((thisJob: any) => thisJob !== job)
          );
        });
        if (allJobsData.length !== nearbyJobs.length) {
          setAllJobsData(nearbyJobs);
          onDisplayNotification(nearbyJobs);
        }
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  useEffect(() => {
    findLocations();
  }, [allJobsData]);

  const gotToDescription = (jobData: any) => {
    navigation.navigate('JobDescriptionScreen', jobData);
  };

  const getRecommendedJobs = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/jobs/`);
      // console.log(response.data.data);
      setJobsData(response.data.data);

      return fetch(`https://pgrkam-uh5k.onrender.com/api/v1/jobs/`)
        .then(res => {
          return res.json().then(resp => {
            return resp.data.data;
          });
        })
        .catch(err => {
          console.log('Erro with API : ', err);
        });
    } catch (err) {}
  };

  useEffect(() => {
    if (googleLoginState.isGoogleLoggedIn) {
      setUserData({name: googleLoginState.name, email: googleLoginState.email});
      dispatch(setProfileData({email: googleLoginState.email}));
    } else {
      appwrite.getCurrentUser().then(response => {
        if (response) {
          const user: UserObj = {
            name: response.name,
            email: response.email,
          };
          dispatch(setProfileData({email: user.email}));
          setUserData(user);
        }
      });
    }
  }, [appwrite]);

  async function onDisplayNotification(data: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    for (let i = 0; i < data.length; i++) {
      let isPresent = false;
      for (let j = 0; j < jobsWithNotifications.length; j++) {
        if (jobsWithNotifications[j]._id === data[i]._id) {
          isPresent = true;
          break;
        }
      }
      if (isPresent) continue;
      await notifee.displayNotification({
        title: `Nearby Job Available at ${data[i].companyName}`,
        body: `Job Title: ${data[i].jobTitle}`,
        android: {
          channelId,
          // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
      setJobsWithNotifications([...jobsWithNotifications, data]);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <CustomText
                label={loading ? 'Hi' : 'Hello'}
                customStyle={styles.headerTextStyle}
              />
              <CustomText
                label={userData?.name}
                customStyle={styles.headerTextStyle}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              // onPress={() => onDisplayNotification()}
            >
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgejyHo5OoakWlI6Bvv-nWsKVXLueGCwizwLBxmJ5y5i7ZEWAoeyIIP8-wL1-OFgdpcU&usqp=CAU',
                }}
              />
            </TouchableOpacity>
          </View>
          <HomeCard />
          <View style={{width: '93%', marginTop: 10}}>
            <CustomText
              label="Recommended Jobs"
              customStyle={styles.textStyle}
            />
            <View>
              {jobsData.map(jobData => (
                <JobCard
                  jobData={jobData}
                  key={(jobData as {_id: any})?._id}
                  gotToDescription={gotToDescription}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={{width: '88%'}}
            onPress={() => navigation.navigate('AllJobsScreen')}>
            <CustomText
              label="Explore More Jobs >>"
              customStyle={styles.explore}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    width: '95%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 25,
    lineHeight: 34,
    flexWrap: 'wrap',
    fontFamily: 'DMSans-Bold',
    color: COLORS.title,
  },
  textStyle: {
    fontSize: 21,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
  },
  explore: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'right',
    color: COLORS.dark,
    fontFamily: 'DMSans-Bold',
    textDecorationLine: 'underline',
  },
});
