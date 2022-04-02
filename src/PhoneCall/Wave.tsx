import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type WaveProps = {
  delay: number;
};

const Wave: React.FC<WaveProps> = ({delay}) => {
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, {duration: 1000}), -1, false),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0.7, 0]),
      transform: [{scale: interpolate(progress.value, [0, 1], [1, 5])}],
    };
  });

  return <Animated.View style={[styles.wave, rStyle]} />;
};

export default Wave;

const styles = StyleSheet.create({
  wave: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#805ad5',
    position: 'absolute',
  },
});
