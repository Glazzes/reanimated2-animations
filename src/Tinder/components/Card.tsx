import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import {User} from './data';
import {Image} from 'react-native-magnus';

const {width, height} = Dimensions.get('window');

const RIGHT_SNAP = width * 1.7;
const LEFT_SNAP = -1 * width * 1.7;

const MAX_ANGLE = Math.PI / 4;
const ROTATED_CARD_WIDTH =
  height * Math.sin(MAX_ANGLE) + width * Math.cos(MAX_ANGLE);

type CardProps = {
  user: User;
};

const Card: React.FC<CardProps> = ({user}) => {
  const translate = useSharedValue<number>(0);
  const borderRadius = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translate.value,
      [-width / 2, 0, width / 2],
      [-Math.PI / 4, 0, Math.PI / 4],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius: borderRadius.value,
      transform: [
        {translateX: translate.value},
        {rotate: `${rotate}rad`},
        {scale: scale.value},
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      borderRadius.value = withTiming(20);
      scale.value = withTiming(0.9);
    })
    .onChange(e => {
      translate.value = e.translationX;
    })
    .onEnd(({velocityX}) => {
      const snap = snapPoint(translate.value, velocityX, [
        LEFT_SNAP,
        0,
        RIGHT_SNAP,
      ]);

      if (snap === 0) {
        translate.value = withSpring(0);
      }

      if (snap === LEFT_SNAP) {
        translate.value = withSpring(-1 * ROTATED_CARD_WIDTH);
      }

      if (snap === RIGHT_SNAP) {
        translate.value = withSpring(ROTATED_CARD_WIDTH);
      }

      scale.value = withTiming(1);
      borderRadius.value = withTiming(0);
    });

  return (
    <React.Fragment>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[rStyle, StyleSheet.absoluteFill]}>
          <Image source={user.profilePicture} style={StyleSheet.absoluteFill} />
        </Animated.View>
      </GestureDetector>
    </React.Fragment>
  );
};

export default Card;
