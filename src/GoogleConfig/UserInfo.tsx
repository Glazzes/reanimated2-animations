import React from 'react';
import Appbar from './Appbar';
import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import {Divider} from 'react-native-paper';

const MAGNUM_BULLETS = require('./assets/bullets.png');
const GOOGLE = require('./assets/google.png');

const PADDING: number = 10;
const IMAGE_MAX_SIZE: number = 80;
const IMAGE_MIN_SIZE: number = 20;

type UserInfoProps = {
  translateY: Animated.SharedValue<number>;
  scrolly: Animated.SharedValue<number>;
};

const UserInfo: React.FC<UserInfoProps> = ({translateY, scrolly}) => {
  const {width} = useWindowDimensions();

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {y: number}
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({translationY}, ctx) => {
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({velocityY}) => {
      const snap = snapPoint(translateY.value, velocityY, [-100, 0]);
      translateY.value = withTiming(snap);
    },
  });

  const rImageStyles = useAnimatedStyle(() => {
    const size = interpolate(
      translateY.value,
      [0, -100],
      [IMAGE_MAX_SIZE, IMAGE_MIN_SIZE + PADDING],
      Extrapolate.CLAMP,
    );

    const left = interpolate(
      translateY.value,
      [0, -100],
      [width / 2 - size / 2, width - size - PADDING],
      Extrapolate.CLAMP,
    );

    const top = interpolate(
      translateY.value,
      [0, -100],
      [0, -45],
      Extrapolate.CLAMP,
    );

    return {
      zIndex: 2000,
      width: size,
      height: size,
      borderRadius: size / 2,
      position: 'absolute',
      top,
      left,
    };
  });

  const rBox = useAnimatedStyle(() => {
    const defaultHeight = 200;

    const tyHeight = interpolate(
      scrolly.value,
      [0, 100],
      [200, 0],
      Extrapolate.CLAMP,
    );

    return {height: tyHeight};
  });

  const rUserInfoStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, -60],
      [1, 0],
      Extrapolate.CLAMP,
    );

    const ty = interpolate(
      translateY.value,
      [0, -75],
      [0, -150],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateY: ty}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View>
        <Appbar translateY={translateY} />
        <Animated.View style={[styles.root]}>
          <Animated.Image source={MAGNUM_BULLETS} style={rImageStyles} />
          <Animated.View style={rBox}>
            <Animated.View style={[styles.userInfo, rUserInfoStyles]}>
              <View style={styles.placeholder} />
              <Text style={styles.username}>Centurion</Text>
              <View style={styles.emailbox}>
                <Text style={styles.email}>centurion@gmail.com</Text>
                <Icon name={'chevron-down'} size={20} color="grey" />
              </View>
              <View style={styles.googleBox}>
                <Image source={GOOGLE} style={styles.google} />
                <Text style={styles.infoText}>
                  Administra tu cuenta de google
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Divider />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
    height: IMAGE_MAX_SIZE,
  },
  username: {
    fontWeight: '400',
    fontSize: 25,
    textAlign: 'center',
  },
  userInfo: {
    padding: PADDING,
  },
  emailbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: PADDING,
  },
  email: {
    color: 'grey',
    fontSize: 15,
    textAlign: 'center',
    marginRight: PADDING,
  },
  googleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    padding: PADDING / 2,
    paddingHorizontal: PADDING,
    borderColor: 'grey',
    borderRadius: PADDING * 2,
  },
  google: {
    width: 20,
    height: 20,
  },
  infoText: {
    marginLeft: PADDING / 2,
    fontWeight: '500',
  },
});
