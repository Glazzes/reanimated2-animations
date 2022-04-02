import React, {useRef} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import UserInfo from './UserInfo';
import Content from './Content';
import {StyleSheet, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import TestContent from './TestContent';

const GoogleConfig: NavigationFunctionComponent = () => {
  const translateY = useSharedValue<number>(0);
  const infoHeight = useSharedValue<number>(200);

  return (
    <View style={styles.root}>
      <UserInfo infoHeight={infoHeight} translateY={translateY} />
      <TestContent infoHeight={infoHeight} translate={translateY} />
    </View>
  );
};

export default GoogleConfig;

GoogleConfig.options = {
  statusBar: {
    drawBehind: true,
    translucent: true,
    style: 'light',
    visible: true,
  },
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
