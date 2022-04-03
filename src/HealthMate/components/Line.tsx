import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

type LineProps = {
  translateY: Animated.SharedValue<number>;
};

const Line: React.FC<LineProps> = ({translateY}) => {
  const rStyle = useAnimatedStyle(() => {
    const width = 0;
    return {width};
  });

  return <Animated.View style={[rStyle, styles.root]} />;
};

export default Line;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    height: 2,
    transform: [{rotate: '90deg'}],
  },
});
