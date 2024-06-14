import {StyleSheet, View, TouchableOpacity, Switch} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import CustomText from '../components/custom-widgets/CustomText';
import {COLORS} from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppwriteContext from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import SettingsCard from '../components/cards/SettingsCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/custom-widgets/CustomButton';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setGoogleLoginUser} from '../redux/slices/userSlice';
import {setProfileData} from '../redux/slices/profileSlice';

const SettingsScreen = ({navigation}: any) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const googleLoginState = useSelector((state: any) => state.googleUser);
  const dispatch = useDispatch();

  const handleRemoveData = () => {
    dispatch(
      setGoogleLoginUser({
        name: '',
        email: '',
        photoURL: '',
        isGoogleLoggedIn: false,
      }),
    );
    dispatch(
      setProfileData({
        _id: '',
        name: '',
        email: '',
        gender: '',
        vide: '',
        photoURL: '',
        about: '',
        experience: [],
        education: [],
        skills: [],
        languages: [],
        achievements: [],
      }),
    );
  };

  const handleLogout = ({navigation}: any) => {
    if (googleLoginState.isGoogleLoggedIn) {
      auth()
        .signOut()
        .then(() => {
          setIsLoggedIn(false);
          handleRemoveData();
          Snackbar.show({
            text: 'Logout Successful',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    } else {
      appwrite.logout().then(() => {
        setIsLoggedIn(false);
        handleRemoveData();
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
    }
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
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
          <CustomText label="Settings" customStyle={styles.headingtxt} />
        </View>

        <View style={styles.container2}>
          <SettingsCard
            color={COLORS.title}
            icon="bell-outline"
            label="Notifications"
            customStyle={styles.container}
            comp={
              <Switch
                trackColor={{false: '#767577', true: '#57cd59'}}
                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
          />
          <SettingsCard
            color={COLORS.title}
            icon="moon-waxing-crescent"
            label="Dark Mode"
            customStyle={styles.container}
            comp={
              <Switch
                trackColor={{false: '#767577', true: '#57cd59'}}
                thumbColor={isEnabled2 ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
              />
            }
          />
          <SettingsCard
            color={COLORS.title}
            icon="lock-outline"
            label="Password"
            customStyle={styles.container}
            comp={
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdatePasswordScreen')}>
                <MaterialCommunityIcons
                  name="greater-than"
                  color={COLORS.dark}
                  size={22}
                />
              </TouchableOpacity>
            }
          />
          <SettingsCard
            color={COLORS.title}
            icon="logout"
            label="Logout"
            customStyle={styles.container}
            comp={
              <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons
                  name="greater-than"
                  color={COLORS.title}
                  size={20}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <View
          style={{
            width: '100%',
            paddingHorizontal: '5%',
            position: 'absolute',
            bottom: 20,
          }}>
          <CustomButton label="Save" customStyle={styles.savebtn} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  backbtn: {
    paddingHorizontal: 12,
    paddingTop: 30,
    paddingBottom: 10,
    width: '100%',
  },
  headingtxt: {
    color: COLORS.title,
    fontFamily: 'DMSans-ExtraBold',
    fontSize: 25,
    marginBottom: 5,
    padding: '5%',
  },
  container: {
    marginTop: '5%',
  },
  container2: {
    alignItems: 'center',
  },
  savebtn: {
    backgroundColor: COLORS.dark,
    width: '100%',
  },
});
