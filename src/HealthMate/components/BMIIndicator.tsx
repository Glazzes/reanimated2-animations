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

const {height} = Dimensions.get('window');
const INDICATOR_SIZE = height / 2 - 40;

const BMIIndicator: React.FC<BMIIndicatorProps> = ({translateY}) => {
  const indicator = useDerivedValue<string>(() => {
    const value = interpolate(
      translateY.value,
      [-INDICATOR_SIZE, 0, INDICATOR_SIZE],
      [-25, 0, 25],
      Extrapolate.CLAMP,
    );

    return `${value}`;
  }, [translateY.value]);

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [-INDICATOR_SIZE, 0, INDICATOR_SIZE],
      [1, 0, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[rStyle, styles.root]}>
      <ReText text={indicator} />
    </Animated.View>
  );
};

export default BMIIndicator;

const styles = StyleSheet.create({
  root: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#37caff',
  },
});
