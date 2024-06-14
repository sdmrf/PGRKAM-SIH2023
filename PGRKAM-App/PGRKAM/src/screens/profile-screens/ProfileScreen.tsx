import {View, ScrollView} from 'react-native';
import React from 'react';
import DashMenu from '../../components/profile-components/DashMenu';
import ProfileCard from '../../components/cards/ProfileCard';
const Profile = () => {
  return (
    <View>
      <ScrollView>
        <ProfileCard />
        <DashMenu />
      </ScrollView>
    </View>
  );
};

export default Profile;
