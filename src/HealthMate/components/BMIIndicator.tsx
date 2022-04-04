import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

type BMIIndicatorProps = {
  translateY: Animated.SharedValue<number>;
};

const {width, height} = Dimensions.get('window');
const INDICATOR_HEIGHT = 80;
const THRESHOLD = height / 2 - INDICATOR_HEIGHT / 2;
const TOP = height / 2 - INDICATOR_HEIGHT / 2;
const LEFT = width / 2 - INDICATOR_HEIGHT / 2;

const BMIIndicator: React.FC<BMIIndicatorProps> = ({translateY}) => {
  const indicator = useDerivedValue<string>(() => {
    const value = interpolate(
      translateY.value,
      [-THRESHOLD, 0, THRESHOLD],
      [-25, 0, 25],
      Extrapolate.CLAMP,
    );

    return `${value.toFixed(1)}`;
  }, [translateY.value]);

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [-THRESHOLD, 0, THRESHOLD],
      [1, 0, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[rStyle, styles.root]}>
      <ReText text={indicator} style={styles.text} />
    </Animated.View>
  );
};

export default BMIIndicator;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: TOP,
    left: LEFT,
    width: INDICATOR_HEIGHT,
    height: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_HEIGHT / 2,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#37caff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
  },
});
