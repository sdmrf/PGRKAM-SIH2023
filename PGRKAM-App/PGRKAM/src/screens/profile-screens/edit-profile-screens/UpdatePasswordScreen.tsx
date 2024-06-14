import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import CustomText from '../../../components/custom-widgets/CustomText';
import {COLORS} from '../../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/custom-widgets/CustomButton';

const UpdatePassword = ({navigation}: any) => {
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
          <CustomText label="Update Password" customStyle={styles.headingtxt} />
        </View>
        <View>
          {/* 1st input */}
          <View style={styles.container}>
            <CustomText
              label="Old Password"
              customStyle={{
                color: COLORS.dark,
                marginLeft: '5%',
                fontFamily: 'DMSans-Bold',
              }}
            />
            <View style={styles.inputcontainer}>
              <TextInput
                placeholder=" Enter old password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.container}>
            <CustomText
              label="New Password"
              customStyle={{
                color: COLORS.dark,
                fontFamily: 'DMSans-Bold',
                marginLeft: '5%',
              }}
            />
            <View style={styles.inputcontainer}>
              <TextInput
                placeholder="Enter new password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
          </View>
          {/* 3rd input */}
          <View style={styles.container}>
            <CustomText
              label="Confirm Password"
              customStyle={{
                color: COLORS.dark,
                marginLeft: '5%',
                fontFamily: 'DMSans-Bold',
              }}
            />
            <View style={styles.inputcontainer}>
              <TextInput
                placeholder="Enter confirm new password"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            alignItems: 'center',
          }}>
          <CustomButton
            label="Update"
            customStyle={{
              backgroundColor: COLORS.dark,

              width: '80%',
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  backbtn: {
    padding: '2%',
    marginTop: '3%',
    width: '100%',
  },
  headingtxt: {
    color: COLORS.dark,
    fontFamily: 'DMSans-Black',
    fontSize: 25,
    padding: '4%',
    marginBottom: 10,
  },
  inputcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2%',
  },
  input: {
    backgroundColor: '#ffffff',
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  container: {
    marginBottom: '5%',
  },
});
