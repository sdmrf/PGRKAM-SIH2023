import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../components/custom-widgets/CustomText';
import {DUMMY_NOTIFICATIONS} from '../constants/dummy';
import NotificationCard from '../components/cards/NotificationCard';
import {COLORS} from '../constants/colors';
import CustomButton from '../components/custom-widgets/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationScreen = ({navigation}: any) => {
  const goToScreen = () => {};
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backbtn}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.dark}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <CustomText label="Read All" customStyle={styles.read} />
      </View>
      <View style={{paddingHorizontal: '2%', marginTop: 10}}>
        <CustomText label="Notifications" customStyle={styles.textStyle} />
        <View>
          {DUMMY_NOTIFICATIONS.map(notificationData => (
            <NotificationCard
              notificationData={notificationData}
              key={notificationData.id}
              goToScreen={goToScreen}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    color: COLORS.title,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  backbtn: {
    paddingVertical: 20,
    color: COLORS.dark,
  },
  read: {
    fontFamily: 'DMSans-Bold',
    color: COLORS.yellow,
    fontSize: 15,
  },
});
