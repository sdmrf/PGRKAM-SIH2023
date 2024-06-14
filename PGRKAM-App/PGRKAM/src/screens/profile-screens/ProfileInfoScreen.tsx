import {View, ScrollView} from 'react-native';
import React from 'react';
import ProfileCard from '../../components/cards/ProfileCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import EditProfile from '../../components/profile-components/EditProfile';
const ProfileInfoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View>
      <ScrollView>
        <ProfileCard />
        <EditProfile />
      </ScrollView>
    </View>
  );
};

export default ProfileInfoScreen;
