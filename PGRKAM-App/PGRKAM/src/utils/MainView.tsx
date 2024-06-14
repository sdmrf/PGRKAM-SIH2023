import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../constants/colors';
interface Props {
  children: any;
}
const MainView: FC<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default MainView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
});
