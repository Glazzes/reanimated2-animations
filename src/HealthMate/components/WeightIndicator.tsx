import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type WeightIndicatorProps = {
  translateY: Animated.SharedValue<number>;
};

const {height} = Dimensions.get('window');
const INDICATOR_SIZE = height / 2 - 40;

const WeightIndicator: React.FC<WeightIndicatorProps> = ({translateY}) => {
  const scale = useSharedValue<number>(1);
  const offset = useSharedValue<number>(0);

  const indicator = useDerivedValue<string>(() => {
    const base = 84;
    const plus = interpolate(
      translateY.value,
      [-INDICATOR_SIZE, 0, INDICATOR_SIZE],
      [-25, 0, 25],
      Extrapolate.CLAMP,
    );

    const result = base + plus;
    return result.toString();
  }, [translateY.value]);

  const pan = Gesture.Pan()
    .onStart(_ => {
      offset.value = translateY.value;
      cancelAnimation(scale);
      scale.value = withTiming(1);
    })
    .onUpdate(e => {
      translateY.value = offset.value + e.translationY;
    })
    .onEnd(_ => {
      scale.value = withDelay(
        3000,
        withRepeat(withTiming(1.3, {duration: 1000}), -1, true),
      );
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[rStyle, styles.root]}>
        <ReText text={indicator} style={styles.text} />
      </Animated.View>
    </GestureDetector>
  );
};

export default WeightIndicator;

const styles = StyleSheet.create({
  root: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#37caff',
    fontSize: 25,
  },
});
