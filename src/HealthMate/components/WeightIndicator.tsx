import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  scrollTo,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type WeightIndicatorProps = {
  translateY: Animated.SharedValue<number>;
};

// Repeatition of variables along multiple components it's needed bause some times
// the metro bundler does not want to cooperate with importing them correctly
const {height} = Dimensions.get('window');
const INDICATOR_HEIGHT = 80;
const THRESHOLD = height / 2 - INDICATOR_HEIGHT / 2;
const SCROLL = (height / 9) * 20;

const WeightIndicator = React.forwardRef<
  FlatList<number>,
  WeightIndicatorProps
>(({translateY}, ref) => {
  const scale = useSharedValue<number>(1);
  const offset = useSharedValue<number>(0);

  const indicator = useDerivedValue<string>(() => {
    const base = 84;
    const plus = interpolate(
      translateY.value,
      [-THRESHOLD, 0, THRESHOLD],
      [-25, 0, 25],
      Extrapolate.CLAMP,
    );

    const result = base + plus;
    return result.toFixed(1).toString();
  }, [translateY.value]);

  const pan = Gesture.Pan()
    .onStart(_ => {
      offset.value = translateY.value;
      cancelAnimation(scale);
      scale.value = withTiming(1);
    })
    .onUpdate(e => {
      translateY.value = Math.max(
        -THRESHOLD,
        Math.min(offset.value + e.translationY, THRESHOLD),
      );
    })
    .onEnd(({velocityY}) => {
      translateY.value = withDecay(
        {velocity: velocityY, clamp: [-THRESHOLD, THRESHOLD]},
        isFinished => {
          if (isFinished) {
            scale.value = withDelay(
              3000,
              withRepeat(withTiming(1.2, {duration: 500}), -1, true),
            );
          }
        },
      );
    });

  useAnimatedReaction(
    () => translateY.value,
    value => {
      // @ts-ignore
      scrollTo(ref, 0, SCROLL + value, false);
    },
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.root, rStyle]}>
        <ReText text={indicator} style={styles.text} />
        <View
          style={[StyleSheet.absoluteFill, {backgroundColor: 'transparent'}]}
        />
      </Animated.View>
    </GestureDetector>
  );
});

export default WeightIndicator;

const styles = StyleSheet.create({
  root: {
    height: INDICATOR_HEIGHT,
    width: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_HEIGHT / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#37caff',
    fontSize: 25,
  },
});
