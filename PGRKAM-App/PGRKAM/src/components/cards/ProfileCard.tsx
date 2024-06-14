import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CustomText from '../../components/custom-widgets/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from '@rneui/base';
import {COLORS} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AppwriteContext from '../../appwrite/AppwriteContext';
import {setProfileData} from '../../redux/slices/profileSlice';
const ProfileCard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const {email} = useSelector((state: any) => state.profile);
  const {isGoogleLoggedIn, name: googleName} = useSelector(
    (state: any) => state.googleUser,
  );
  const [name, setName] = useState('');
  useEffect(() => {
    if (!isGoogleLoggedIn) {
      appwrite.getCurrentUser().then(response => {
        if (response) {
          setName(response.name);
        }
      });
    } else {
      setName(googleName);
    }
  }, []);
  return (
    <LinearGradient
      colors={[COLORS.dark, COLORS.dark700, COLORS.dark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        width: '100%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <View>
            <Icon style={styles.settings} name="settings-outline" size={40} />
          </View>
        </TouchableOpacity>
        <View style={styles.leftHeader}>
          <TouchableOpacity>
            <Avatar
              rounded
              size="large"
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgejyHo5OoakWlI6Bvv-nWsKVXLueGCwizwLBxmJ5y5i7ZEWAoeyIIP8-wL1-OFgdpcU&usqp=CAU',
              }}
            />
          </TouchableOpacity>
          <View>
            <CustomText label={name} customStyle={styles.nameTextStyle} />
            <CustomText label={email} customStyle={styles.emailTextStyle} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => navigation.navigate('ProfileInfoScreen')}>
          <CustomText
            label="Edit Profile"
            customStyle={{color: COLORS.white}}
          />
          <Icon style={styles.editIcon} name="create-outline" size={40} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingBottom: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
  },
  leftHeader: {
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  settings: {
    fontSize: 24,
    color: COLORS.light,
    position: 'absolute',
    top: 15,
    right: 20,
  },
  nameTextStyle: {
    color: COLORS.light,
    fontFamily: 'DMSans-Black',
    fontSize: 18,
    marginTop: 10,
    lineHeight: 20,
  },
  editContainer: {
    gap: 5,
    right: 20,
    bottom: 25,
    padding: 7,
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emailTextStyle: {color: COLORS.light},
  editIcon: {
    fontSize: 15,
    color: COLORS.white,
  },
});
