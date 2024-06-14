import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Section from '../Section';
import {COLORS} from '../../../constants/colors';
import {Divider} from '@rneui/base';
const IntroVideo = ({video}: any) => {
  return (
    <View style={{marginTop: 5}}>
      <Section
        fromEdit
        label="Introduction Video"
        iconLeft="videocam-outline"
        iconRight={
          video && video.trim().length > 0 ? 'create-outline' : 'add-outline'
        }
        navigationScreen="IntroVideoScreen"
      />
      {video && (
        <View style={styles.video}>
          <Divider style={{marginTop: -10, marginBottom: 10}} />
          <Text numberOfLines={4} style={styles.text}>
            {video}
          </Text>
        </View>
      )}
    </View>
  );
};

export default IntroVideo;

const styles = StyleSheet.create({
  video: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 25,
    marginHorizontal: '3%',
    marginTop: -10,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 11.25,
    shadowRadius: 11.84,
  },
  text: {
    textAlign: 'justify',
    color: COLORS.dark,
    lineHeight: 21,
    fontFamily: 'DMSans-SemiBold',
  },
});
