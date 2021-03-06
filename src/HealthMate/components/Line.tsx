import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type LineProps = {
  translateY: Animated.SharedValue<number>;
};

const {width, height} = Dimensions.get('window');
const INDICATOR_HEIGHT = 80;
const THRESHOLD = height / 2 - INDICATOR_HEIGHT / 2;
const TOP = height / 2;
const LEFT = width / 2;

const Line: React.FC<LineProps> = ({translateY}) => {
  const rStyle = useAnimatedStyle(() => {
    const ty = interpolate(
      translateY.value,
      [-THRESHOLD, 0, THRESHOLD],
      [-height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const h = interpolate(
      translateY.value,
      [-THRESHOLD, 0, THRESHOLD],
      [height, 0, height],
    );

    return {height: h, transform: [{translateY: ty}]};
  });

  return <Animated.View style={[rStyle, styles.root]} />;
};

export default Line;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: LEFT - 1,
    top: TOP - 1,
    backgroundColor: '#fff',
    width: 2,
  },
});
