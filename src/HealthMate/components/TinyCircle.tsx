import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

type TinyCircleProps = {
  translateY: Animated.SharedValue<number>;
};

const {width, height} = Dimensions.get('window');
const INDICATOR_HEIGHT = 20;
const THRESHOLD = height / 2 - INDICATOR_HEIGHT / 2;
const TOP = height / 2 - INDICATOR_HEIGHT / 2;
const LEFT = width / 2 - INDICATOR_HEIGHT / 2;

const TinyCircle: React.FC<TinyCircleProps> = ({translateY}) => {
  const rStyle = useAnimatedStyle(() => {
    const ty = interpolate(
      -translateY.value,
      [-THRESHOLD + 40, 0, THRESHOLD - 40],
      [-THRESHOLD, 0, THRESHOLD],
      Extrapolate.CLAMP,
    );
    return {transform: [{translateY: ty}]};
  });

  return <Animated.View style={[styles.root, rStyle]} />;
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: LEFT,
    top: TOP,
    width: INDICATOR_HEIGHT,
    height: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_HEIGHT / 2,
    backgroundColor: '#fff',
  },
});

export default TinyCircle;
