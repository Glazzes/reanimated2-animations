import {View, StyleSheet, LogBox} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Content from './Content';
import BMIScrollview from './BMIScrollview';
import WeightIndicator from './WeightIndicator';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const HealthMate: NavigationFunctionComponent = ({}) => {
  const scrollRef = useAnimatedRef<Animated.FlatList<number>>();
  const sharedValue = useSharedValue<number>(0);

  return (
    <View style={styles.root}>
      <WeightIndicator translateY={sharedValue} />
    </View>
  );
};

export default HealthMate;

HealthMate.options = {
  topBar: {
    visible: false,
  },
  statusBar: {
    backgroundColor: 'transparent',
    style: 'light',
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
