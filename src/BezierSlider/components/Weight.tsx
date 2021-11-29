import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {R} from './BezierSlider';

type WeightProps = {
  translateX: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
  isRunning: Animated.SharedValue<boolean>;
};

const {width, height} = Dimensions.get('window');

const Weight: React.FC<WeightProps> = ({translateY, translateX, isRunning}) => {
  const textColor = useSharedValue<string | number>('#212027');
  const backgroundColor = useSharedValue<string | number>('#fff');

  useAnimatedReaction(
    () => isRunning.value,
    bool => {
      if (bool) {
        textColor.value = withTiming('#fff');
        backgroundColor.value = withTiming('#212027');
      } else {
        textColor.value = withTiming('#212027');
        backgroundColor.value = withTiming('#fff');
      }
    },
  );

  const rStyleText = useAnimatedStyle(() => {
    const fontSize = interpolate(
      -translateX.value,
      [0, width / 2 - R],
      [18, 21],
      Extrapolate.CLAMP,
    );

    return {
      fontSize,
      color: textColor.value,
      fontFamily: 'SFProDisplayBold',
    };
  });

  const rStyleContainer = useAnimatedStyle(() => ({
    position: 'absolute',
    top: height / 2 - 30,
    transform: [
      {translateY: translateY.value},
      {translateX: -translateX.value},
    ],
    backgroundColor: backgroundColor.value,
    paddingHorizontal: 15,

    borderRadius: 10,
  }));

  const weight = useDerivedValue(() => {
    const currentWeight = interpolate(
      translateX.value,
      [-width / 2 + R * 2, 0, width / 2 - R * 2],
      [120, 70, 40],
      Extrapolate.CLAMP,
    );

    return `${Math.round(currentWeight)}`;
  });

  return (
    <Animated.View style={[rStyleContainer, styles.container]}>
      <ReText text={weight} style={rStyleText} />
      <Text style={styles.kg}>kg</Text>
    </Animated.View>
  );
};

export default Weight;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  kg: {
    color: '#cdcdd2',
    fontSize: 15,
  },
});
