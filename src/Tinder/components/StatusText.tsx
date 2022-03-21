import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const MAX_ANGLE = Math.PI / 9;
const {width, height} = Dimensions.get('window');

type StatusTextProps = {
  status: 'like' | 'nope';
  inverted: boolean;
  color: string;
  translateX: Animated.SharedValue<number>;
};

const StatusText: React.FC<StatusTextProps> = ({
  status,
  color,
  inverted,
  translateX,
}) => {
  const direction = inverted ? -1 : 1;

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [inverted ? (width / 2) * 0.8 : (-width / 2) * 0.8, 0],
      [1, 0],
    );

    return {
      color,
      opacity,
      borderColor: color,
      width: width / 2 - 50 * Math.sin(MAX_ANGLE),
      marginTop: (Math.cos(direction * MAX_ANGLE) * 50) / 2,
      transform: [{rotate: `${direction * MAX_ANGLE}rad`}],
    };
  });

  return <Animated.Text style={[styles.text, rStyle]}>{status}</Animated.Text>;
};

const styles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
    fontSize: 30,
    borderWidth: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: height * 0.1125,
    borderRadius: 10,
    fontFamily: 'SFProDisplayBold',
  },
});

export default StatusText;
