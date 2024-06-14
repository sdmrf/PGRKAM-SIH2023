import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../constants/colors';
import CustomText from '../../../components/custom-widgets/CustomText';
import CustomButton from '../../../components/custom-widgets/CustomButton';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DUMMY_PROFILE} from '../../../constants/dummy';
import {useDispatch, useSelector} from 'react-redux';
import {handleUpdate} from '../../../utils/update';
import {setProfileData} from '../../../redux/slices/profileSlice';
import {useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';

const IntroVideoScreen = ({navigation}: any) => {
  const {email, video} = useSelector((state: any) => state.profile);
  const [videoId, setVideoId] = useState('');
  const [introInput, setIntroInput] = useState('');
  const dispatch = useDispatch();
  const router = useRoute();
  const isFromHome = router.params;

  const getVideoID = (url: string) => {
    if (url) {
      var videoid = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
      );
      if (videoid != null) {
        return videoid[1];
      } else {
        return null;
      }
    }
  };
  const saveIntro = async () => {
    const updatedData = await handleUpdate(email, {video: introInput});
    dispatch(setProfileData(updatedData));
    navigation.goBack();
  };

  const getIntroData = () => {
    setIntroInput(video);
    const videoIdd: any = getVideoID(video);
    if (videoId) setVideoId(videoIdd);
  };

  useEffect(() => {
    getIntroData();
  }, []);

  return (
    <ScrollView>
      {!isFromHome ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.dark}
              size={25}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.back}></View>
      )}
      <View style={styles.container}>
        <CustomText
          label="Introduction Video"
          customStyle={styles.description}
        />
        <TextInput
          value={introInput}
          onChangeText={value => {
            const videoId: any = getVideoID(value);
            setVideoId(videoId);
            setIntroInput(value);
          }}
          placeholder="Enter youtube video link"
          placeholderTextColor="gray"
          style={styles.textarea}
        />
        {videoId && (
          <View style={styles.video}>
            <WebView
              style={{marginTop: 0}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: `https://www.youtube.com/embed/${videoId}`}}
            />
          </View>
        )}
        <View style={styles.apply}>
          <CustomButton
            label="Save"
            onPress={saveIntro}
            customStyle={{backgroundColor: COLORS.dark, width: '100%'}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: '4%',
    marginTop: 20,
  },
  video: {
    marginTop: 20,
    height: 300,
    width: '100%',
  },
  description: {
    color: COLORS.title,
    fontFamily: 'DMSans-Black',
    fontSize: 18,
  },
  textarea: {
    marginTop: 10,
    backgroundColor: COLORS.light,
  },
  apply: {
    width: '100%',
    marginTop: 30,
  },
  back: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
