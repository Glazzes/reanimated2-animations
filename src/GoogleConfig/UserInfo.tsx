import React from 'react';
import Appbar from './Appbar';
import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import {Divider} from 'react-native-paper';

const MAGNUM_BULLETS = require('./assets/bullets.png');
const GOOGLE = require('./assets/google.png');

const PADDING: number = 10;
const IMAGE_MAX_SIZE: number = 80;
const IMAGE_MIN_SIZE: number = 20;

type UserInfoProps = {
  translateY: Animated.SharedValue<number>;
  infoHeight: Animated.SharedValue<number>;
};

const UserInfo: React.FC<UserInfoProps> = ({infoHeight}) => {
  const {width} = useWindowDimensions();
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onStart(_ => {
      offset.value = infoHeight.value;
    })
    .onChange(e => {
      infoHeight.value = Math.min(200, offset.value + e.translationY);
    })
    .onEnd(({velocityY}) => {
      const snap = snapPoint(infoHeight.value, velocityY, [0, 200]);
      infoHeight.value = withTiming(snap);
    });

  const rImageStyles = useAnimatedStyle(() => {
    const size = interpolate(
      infoHeight.value,
      [200, 0],
      [IMAGE_MAX_SIZE, IMAGE_MIN_SIZE + PADDING],
      Extrapolate.CLAMP,
    );

    const left = interpolate(
      infoHeight.value,
      [200, 0],
      [width / 2 - size / 2, width - size - PADDING],
      Extrapolate.CLAMP,
    );

    const top = interpolate(
      infoHeight.value,
      [200, 0],
      [0, -45],
      Extrapolate.CLAMP,
    );

    return {
      zIndex: 20,
      width: size,
      height: size,
      borderRadius: size / 2,
      position: 'absolute',
      top,
      left,
    };
  });

  const rBox = useAnimatedStyle(() => {
    return {height: infoHeight.value};
  });

  const rUserInfoStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      infoHeight.value,
      [200, 100],
      [1, 0],
      Extrapolate.CLAMP,
    );

    const ty = interpolate(
      infoHeight.value,
      [200, 0],
      [0, -200],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{translateY: ty}],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View>
        <Appbar translateY={infoHeight} />
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
    </GestureDetector>
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
