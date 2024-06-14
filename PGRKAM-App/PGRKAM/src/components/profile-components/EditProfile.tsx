import {View} from 'react-native';
import React from 'react';
import AboutMe from './edit-sections/AboutMe';
import Experience from './edit-sections/Experience';
import Education from './edit-sections/Education';
import Skills from './edit-sections/Skills';
import Achievements from './Achivements';
import Languages from './edit-sections/Languages';
import {DUMMY_PROFILE} from '../../constants/dummy';
import {useSelector} from 'react-redux';
import IntroVideo from './edit-sections/IntroVideo';

const EditProfile = () => {
  const profile = useSelector((state: any) => state.profile);
  const {about, experience, education, skills, languages, video, achievements} =
    profile;
  return (
    <View style={{paddingBottom: 20}}>
      <AboutMe about={about} />
      <Experience experience={experience} />
      <Education education={education} />
      <Skills />
      <Languages languages={languages} />
      <Achievements achievements={achievements} />
      <IntroVideo video={video} />
    </View>
  );
};

export default EditProfile;
