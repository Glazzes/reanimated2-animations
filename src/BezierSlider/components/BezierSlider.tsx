import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import SVG, {Path} from 'react-native-svg';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ReText, vec2} from 'react-native-redash';
import {curve} from '../utils/curve';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {NavigationFunctionComponent} from 'react-native-navigation';
import DrawerWrapper from '../../navigation/DrawerWrapper';
import Weight from './Weight';

export const R = 25;
const {width, height} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

const BezierSlider: NavigationFunctionComponent = ({componentId}) => {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const isRunning = useSharedValue<boolean>(false);

  const weightStatus = useDerivedValue(() => {
    if (-translateX.value >= -50 && -translateX.value <= 50) {
      return 'Balanced';
    }

    if (-translateX.value >= 50) {
      return 'Overweight';
    }

    return 'Underweight';
  });

  const velocity = useSharedValue<number>(0);
  const stepY = useSharedValue<Number>(0);
  const rightTrial = useSharedValue<number>(0);
  const leftTrial = useSharedValue<number>(0);

  const aniamtedProps = useAnimatedProps(() => {
    const CURVE = R * 0.5522847498;
    const HALF_CURVE = CURVE / 2;

    const p1 = vec2(width / 2 - R * 2 + translateX.value, 0);
    const p2 = vec2(p1.x + R, p1.y + +stepY.value);
    const p3 = vec2(p2.x + R, p2.y + +stepY.value);
    const p4 = vec2(p3.x + R, p3.y - +stepY.value);
    const p5 = vec2(p4.x + R, p4.y - +stepY.value);

    const cp11 = vec2(p1.x + HALF_CURVE, p1.y);
    const cp12 = vec2(p2.x, p2.y);

    const cp21 = vec2(p2.x, p2.y);
    const cp22 = vec2(p3.x - CURVE, p3.y);

    const cp31 = vec2(p3.x + CURVE, p3.y);
    const cp32 = vec2(p4.x, p4.y);

    const cp41 = vec2(p4.x, p4.y);
    const cp42 = vec2(p5.x - HALF_CURVE, p5.y);

    return {
      d: [
        'M 0 0',
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
    {x: number; time?: number}
  >({
    onStart: (_, ctx) => {
      isRunning.value = true;
      ctx.x = translateX.value;
      stepY.value = withTiming(R / 4);
      translateY.value = withTiming(-R * 0.75);
    },
    onActive: (e, ctx) => {
      translateX.value = Math.max(
        -width / 2 + R * 2,
        Math.min(ctx.x - e.translationX, width / 2 - R * 2),
      );

      const now = new Date().getTime();
      const deltaTime = now - (ctx?.time ?? 0);
      const deltaX = e.translationX - ctx.x;
      velocity.value = deltaX / deltaTime;

      leftTrial.value = interpolate(
        velocity.value,
        [0, 2],
        [0, R],
        Extrapolate.CLAMP,
      );

      rightTrial.value = interpolate(
        velocity.value,
        [-2, 0],
        [R, 0],
        Extrapolate.CLAMP,
      );

      ctx.time = now;
    },
    onEnd: () => {
      velocity.value = withTiming(0);
      translateY.value = withTiming(0);
      stepY.value = withSpring(0);
      leftTrial.value = withTiming(0);
      rightTrial.value = withTiming(0);
      isRunning.value = false;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: -translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <DrawerWrapper parentComponentId={componentId}>
      <View style={styles.root}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction color={'#212027'} />
        </Appbar.Header>
        <View style={styles.textContainer}>
          <Text style={styles.title}>What is your weight goal?</Text>
          <ReText style={styles.weight} text={weightStatus} />
        </View>

        <View style={styles.svgContainer}>
          <View style={styles.weightContainer}>
            <Text style={styles.weightNumber}>40</Text>
            <Text style={styles.weightNumber}>120</Text>
          </View>
          <SVG viewBox={`0 -3 ${width} 30`} width={width} height={30}>
            <AnimatedPath
              animatedProps={aniamtedProps}
              stroke={'#cdcdd2'}
              strokeWidth={3}
            />
          </SVG>
        </View>
        <Weight
          translateX={translateX}
          translateY={translateY}
          isRunning={isRunning}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.sliderBall, rStyle]} />
        </PanGestureHandler>
      </View>
    </DrawerWrapper>
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
    backgroundColor: '#fff',
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
    fontFamily: 'SFProDisplayBold',
  },
  weight: {
    color: '#cdcdd2',
    fontSize: 18,
    fontFamily: 'SFProDisplayBold',
  },
  svgContainer: {
    position: 'absolute',
    top: height / 2,
    transform: [{rotate: `${Math.PI}rad`}],
  },
  sliderBall: {
    position: 'absolute',
    top: height / 2 + 40,
    backgroundColor: '#212027',
    height: R * 0.75,
    width: R * 0.75,
    borderRadius: (R * 0.75) / 2,
  },
  weightContainer: {
    width,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform: [{rotate: `${Math.PI}rad`}],
  },
  weightNumber: {
    color: '#cdcdd2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'flex-end',
    marginLeft: 30,
  },
});
