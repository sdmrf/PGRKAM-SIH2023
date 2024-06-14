import React, {useContext, useEffect, useState} from 'react';
import {Input} from '@rneui/themed';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/custom-widgets/CustomButton';
import {COLORS} from '../../constants/colors';
import CustomText from '../../components/custom-widgets/CustomText';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

//context API
import {AppwriteContext} from '../../appwrite/AppwriteContext';
import {object, string} from 'yup';
import {AuthStackParamList} from '../../routes/AuthStack';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

GoogleSignin.configure({
  webClientId:
    '253538465352-shfd8ienlql9h2irh6co898j24p1a93q.apps.googleusercontent.com',
});

import {setGoogleLoginUser} from '../../redux/slices/userSlice';
import Loading from '../../components/loading-components/Loading';
import axios from 'axios';
import {setProfileData} from '../../redux/slices/profileSlice';
import {handleUpdate} from '../../utils/update';

let loginSchema = object({
  email: string()
    .email('Please enter valid email address')
    .required('Please enter email address'),
  password: string()
    .min(8, 'Password length must be minimum 8 ')
    .max(16, 'Password length must be less than 16')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required('Password is required'),
});

type User = {
  email: string;
  password: string;
};

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'LoginScreen'
>;

const Login = ({navigation}: LoginScreenProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  const handleRetrieveData = (email: string) => {
    axios
      .get(`${URL}/api/v1/job-seekers/${email}`)
      .then((response: any) => {
        dispatch(setProfileData(response.data.data));
      })
      .catch(error => {
        console.error('Error retrieving user data:', error);
      });
  };

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  function onAuthStateChanged(user: any) {
    if (user) {
      const {displayName: name, email, photoURL} = user;
      dispatch(
        setGoogleLoginUser({name, email, photoURL, isGoogleLoggedIn: true}),
      );
      dispatch(setProfileData({name, email, photoURL}));

      setIsLoggedIn(true);
      Snackbar.show({
        text: 'Login Success',
        duration: Snackbar.LENGTH_SHORT,
      });
      if (initializing) setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLoginSubmit = (values: User) => {
    const {email, password} = values;
    const user = {email, password};
    appwrite
      .login(user)
      .then(response => {
        if (response) {
          dispatch(setProfileData({email}));
          setIsLoggedIn(true);
          Snackbar.show({
            text: 'Login Success',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <SafeAreaView style={{width: '100%', height: '100%'}}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          onSubmit={values => {
            handleLoginSubmit(values);
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View style={[styles.container]}>
                <CustomText label="Welcome Back" customStyle={styles.header} />
                <View style={{width: '100%'}}>
                  <CustomText label="Email" customStyle={styles.inputText} />
                  <Input
                    placeholder="Enter email"
                    value={values.email}
                    inputContainerStyle={styles.inputStyle}
                    style={{borderBottomWidth: 0}}
                    onChangeText={handleChange('email')}
                  />
                  {touched.email && errors.email && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.email}
                    />
                  )}
                </View>
                <View style={{width: '100%'}}>
                  <CustomText label="Password" customStyle={styles.inputText} />

                  <Input
                    placeholder="Enter password"
                    value={values.password}
                    inputContainerStyle={styles.inputStyle}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <CustomText
                      customStyle={styles.errorText}
                      label={errors.password}
                    />
                  )}
                </View>
                <CustomButton
                  label="LOGIN"
                  customStyle={styles.buttonStyle}
                  onPress={() => handleSubmit()}
                />
                <CustomButton
                  label="SIGN IN WITH GOOGLE"
                  onPress={() =>
                    onGoogleButtonPress().then(() =>
                      console.log('Signed in with Google!'),
                    )
                  }
                  customStyle={[
                    styles.buttonStyle,
                    {backgroundColor: COLORS.pink},
                  ]}
                  icon={
                    <Icon
                      style={{fontSize: 20, color: '#fff'}}
                      onPress={onGoogleButtonPress}
                      name="logo-google"
                      size={40}
                    />
                  }
                />
                <View style={styles.loginFooter}>
                  <CustomText
                    label="You don't have account yet?"
                    customStyle={{color: COLORS.text}}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}>
                    <CustomText
                      label="Sign Up"
                      customStyle={{
                        color: COLORS.yellow,
                        textDecorationLine: 'underline',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    padding: 5,
    height: 50,
    fontSize: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#cdcccc',
    marginHorizontal: '2%',
    backgroundColor: COLORS.white,
  },
  buttonStyle: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  inputText: {
    color: COLORS.text,
    paddingLeft: '4.8%',
    paddingBottom: 5,
  },
  loginFooter: {
    gap: 5,
    paddingVertical: 8,
    flexDirection: 'row',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    paddingVertical: 40,
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
  },
  errorText: {
    fontSize: 13,
    marginTop: -25,
    marginLeft: '4.9%',
    marginBottom: 20,
    color: COLORS.error,
  },
});

export default Login;
