import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../custom-widgets/CustomText';
import {Image} from '@rneui/base';
import {COLORS} from '../../constants/colors';
import CustomButton from '../custom-widgets/CustomButton';

const NotificationCard = ({notificationData, goToScreen}: any) => {
  return (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <Image
          source={{
            uri: notificationData.logo,
          }}
          style={styles.logo}
        />
        <View>
          <CustomText
            label={notificationData.title}
            customStyle={styles.notificationPost}
          />
          <View style={{width: '95%'}}>
            <CustomText
              label={notificationData.description}
              customStyle={{
                fontSize: 16,
                color: COLORS.dark700,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <CustomButton
          label={notificationData.btnText}
          customStyle={styles.btnStyle}
          customTextStyle={styles.btnTextStyle}
        />
        <CustomText
          customStyle={{color: COLORS.dark700, marginTop: -4}}
          label={`${notificationData.timeAfterNotification} ago`}
        />
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  logo: {
    height: 42,
    width: 42,
    borderRadius: 10,
  },
  notificationPost: {
    color: COLORS.title,
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
  },
  notificationCard: {
    padding: 20,
    paddingHorizontal: 20,
    marginHorizontal: '2%',
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    backgroundColor: COLORS.light,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: 15,
  },
  btnStyle: {
    width: '55%',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderBlockColor: COLORS.dark700,
    color: COLORS.dark700,
    borderWidth: 1,
  },
  btnTextStyle: {
    color: COLORS.dark700,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    width: '84%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
    marginLeft: '18%',
  },
});
