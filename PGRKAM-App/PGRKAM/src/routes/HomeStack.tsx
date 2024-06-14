import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import JobDescriptionScreen from '../screens/job-screens/JobDescriptionScreen';
import Profile from '../screens/profile-screens/ProfileScreen';
import EducationScreen from '../screens/profile-screens/edit-profile-screens/EducationScreen';
import AboutMeScreen from '../screens/profile-screens/edit-profile-screens/AboutMeScreen';
import ExperienceScreen from '../screens/profile-screens/edit-profile-screens/ExperienceScreen';
import SkillsScreen from '../screens/profile-screens/edit-profile-screens/SkillsScreen';
import LanguageScreen from '../screens/profile-screens/edit-profile-screens/LanguageScreen';
import AchievementScreen from '../screens/profile-screens/edit-profile-screens/AchievementScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileInfoScreen from '../screens/profile-screens/ProfileInfoScreen';
import AllJobsScreen from '../screens/job-screens/AllJobsScreen';
import {COLORS} from '../constants/colors';
import AppliedJobsScreen from '../screens/job-screens/AppliedJobsScreen';
import UpdatePassword from '../screens/profile-screens/edit-profile-screens/UpdatePasswordScreen';
import IntroVideoSceren from '../screens/profile-screens/edit-profile-screens/IntroVideoScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobDescriptionScreen"
        options={{
          headerShown: false,
        }}
        component={JobDescriptionScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="EducationScreen"
        options={{
          headerShown: false,
        }}
        component={EducationScreen}
      />
      <Stack.Screen
        name="AboutMeScreen"
        options={{
          headerShown: false,
        }}
        component={AboutMeScreen}
      />
      <Stack.Screen
        name="ExperienceScreen"
        options={{
          headerShown: false,
        }}
        component={ExperienceScreen}
      />
      <Stack.Screen
        name="SkillsScreen"
        options={{
          headerShown: false,
        }}
        component={SkillsScreen}
      />
      <Stack.Screen
        name="LanguageScreen"
        options={{
          headerShown: false,
        }}
        component={LanguageScreen}
      />
      <Stack.Screen
        name="AchievementScreen"
        options={{
          headerShown: false,
        }}
        component={AchievementScreen}
      />
      <Stack.Screen
        name="SettingsScreen"
        options={{
          headerShown: false,
        }}
        component={SettingsScreen}
      />
      <Stack.Screen
        name="ProfileInfoScreen"
        options={{
          headerShown: false,
        }}
        component={ProfileInfoScreen}
      />
      <Stack.Screen
        name="AllJobsScreen"
        options={{
          headerShown: false,
        }}
        component={AllJobsScreen}
      />
      <Stack.Screen
        name="AppliedJobsScreen"
        options={{
          headerShown: false,
        }}
        component={AppliedJobsScreen}
      />
      <Stack.Screen
        name="UpdatePasswordScreen"
        options={{
          headerShown: false,
        }}
        component={UpdatePassword}
      />
      <Stack.Screen
        name="IntroVideoScreen"
        options={{
          headerShown: false,
        }}
        component={IntroVideoSceren}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
