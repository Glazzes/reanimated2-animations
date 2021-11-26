import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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
      translateX.value,
      [0, width / 2 - R],
      [18, 23],
      Extrapolate.CLAMP,
    );

    return {
      fontSize,
      backgroundColor: backgroundColor.value,
      color: textColor.value,
      fontFamily: 'SFProDisplayBold',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
    };
  });

  const rStyleContainer = useAnimatedStyle(() => ({
    position: 'absolute',
    top: height / 2 - 30,
    transform: [
      {translateY: 35 + translateY.value},
      {translateX: translateX.value},
    ],
  }));

  const weight = useDerivedValue(() => {
    const currentWeight = interpolate(
      translateX.value,
      [-width / 2 - R * 2, 0, width / 2 - R],
      [40, 70, 120],
      Extrapolate.CLAMP,
    );

    return `${Math.round(currentWeight)} kg`;
  });

  return (
    <Animated.View style={[rStyleContainer, styles.container]}>
      <ReText text={weight} style={rStyleText} />
    </Animated.View>
  );
};

export default Weight;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
