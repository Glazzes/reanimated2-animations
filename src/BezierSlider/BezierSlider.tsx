import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import SVG, {Path} from 'react-native-svg';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ReText, vec2, Vector} from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {NavigationFunctionComponent} from 'react-native-navigation';

const R = 25;
const {width} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

const curve = (c1: Vector, c2: Vector, to: Vector): string => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const BezierSlider: NavigationFunctionComponent = () => {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const halfStep = useSharedValue<number>(R * 2);
  const fullStep = useSharedValue<number>(R * 2);

  const weightStatus = useDerivedValue(() => {
    if (translateX.value >= -50 && translateX.value <= 50) {
      return 'Balanced';
    }

    if (translateX.value >= 50) {
      return 'Overweight';
    }

    return 'Underweight';
  });

  const aniamtedProps = useAnimatedProps(() => {
    const C = R * 0.5522847498;

    const p1 = vec2(width / 2 - R * 2 + translateX.value, R * 2);
    const p2 = vec2(p1.x + R, halfStep.value);
    const p3 = vec2(p2.x + R, fullStep.value);
    const p4 = vec2(p3.x + R, halfStep.value);
    const p5 = vec2(p4.x + R, R * 2);

    const cp11 = vec2(p1.x + C, p1.y);
    const cp12 = vec2(p2.x, p2.y);

    const cp21 = vec2(p2.x, p2.y);
    const cp22 = vec2(p3.x - C, p3.y);

    const cp31 = vec2(p3.x + C, p3.y);
    const cp32 = vec2(p4.x, p4.y);

    const cp41 = vec2(p4.x, p4.y);
    const cp42 = vec2(p5.x - C, p5.y);

    return {
      d: [
        `M 0 ${R * 2}`,
        `H ${width / 2 - R * 2 + translateX.value}`,
        curve(cp11, cp12, p2),
        curve(cp21, cp22, p3),
        curve(cp31, cp32, p4),
        curve(cp41, cp42, p5),
        `H ${width}`,
      ].join(' '),
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      halfStep.value = withTiming(R + R / 2);
      fullStep.value = withTiming(R);
      translateY.value = withTiming(-R + 5);
    },
    onActive: (e, ctx) => {
      translateX.value = Math.max(
        -width / 2 + R,
        Math.min(ctx.x + e.translationX, width / 2 - R),
      );
    },
    onEnd: _ => {
      translateY.value = withTiming(0);
      halfStep.value = withSpring(R * 2);
      fullStep.value = withSpring(R * 2);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color={'#212027'} />
      </Appbar.Header>
      <View style={styles.textContainer}>
        <Text style={styles.title}>What is your weight goal?</Text>
        <ReText style={styles.weight} text={weightStatus} />
      </View>
      <SVG width={width} height={57}>
        <AnimatedPath
          animatedProps={aniamtedProps}
          stroke={'#cdcdd2'}
          strokeWidth={3}
        />
      </SVG>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.sliderBall, rStyle]} />
      </PanGestureHandler>
      <View style={styles.weightContainer}>
        <Text style={styles.weightNumber}>40</Text>
        <Text style={styles.weightNumber}>120</Text>
      </View>
    </View>
  );
};

export default BezierSlider;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  appbar: {
    width,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  textContainer: {
    width,
    paddingHorizontal: 20,
  },
  title: {
    color: '#212027',
    fontSize: 30,
    maxWidth: width * 0.6,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weight: {
    color: '#cdcdd2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderBall: {
    backgroundColor: '#212027',
    height: R - 5,
    width: R - 5,
    borderRadius: R / 2,
  },
  weightContainer: {
    width,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightNumber: {
    color: '#cdcdd2',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
