import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';
import CustomButton from '../custom-widgets/CustomButton';
import CustomText from '../custom-widgets/CustomText';

const HomeCard = () => {
  return (
    <View style={styles.mainCard}>
      <View style={{paddingVertical: 20, paddingLeft: 20}}>
        <CustomText label="Find" customStyle={styles.cardText} />
        <View style={{flexDirection: 'row', gap: 8}}>
          <CustomText label="Jobs With" customStyle={styles.cardText} />
          <CustomText
            label="AR !"
            customStyle={[styles.cardText, {color: COLORS.primary}]}
          />
        </View>
        <CustomButton label="Scan Building" customStyle={styles.scanButton} />
      </View>
      <Image
        source={require('../../assets/images/theme-images/main-image.png')}
        style={styles.cardImage}
      />
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  mainCard: {
    width: '94%',
    borderRadius: 10,
    paddingRight: '10%',
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark,
  },

  cardText: {
    fontSize: 25,
    color: COLORS.light,
    fontFamily: 'TrebuchetMS-Bold',
  },
  scanButton: {
    padding: 10,
    width: '75%',
    marginTop: 18,
    borderRadius: 8,
    backgroundColor: COLORS.pink,
    color: COLORS.white,
  },
  cardImage: {
    paddingRight: 10,
  },
});
