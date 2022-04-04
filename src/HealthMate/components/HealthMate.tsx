import {View, StyleSheet, LogBox, FlatList} from 'react-native';
import React from 'react';
import {useAnimatedRef, useSharedValue} from 'react-native-reanimated';
import {NavigationFunctionComponent} from 'react-native-navigation';
import BMIScrollView from './BMIScrollview';
import WeightIndicator from './WeightIndicator';
import BMIIndicator from './BMIIndicator';
import Line from './Line';
import TinyCircle from './TinyCircle';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const HealthMate: NavigationFunctionComponent = ({}) => {
  const flatlistRef = useAnimatedRef<FlatList<number>>();
  const translateY = useSharedValue<number>(0);

  return (
    <View style={styles.root}>
      <BMIScrollView ref={flatlistRef} />
      <Line translateY={translateY} />
      <TinyCircle translateY={translateY} />
      <BMIIndicator translateY={translateY} />
      <WeightIndicator ref={flatlistRef} translateY={translateY} />
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
