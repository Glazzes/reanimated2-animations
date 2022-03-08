// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect} from 'react';
import Animated, {
  BounceIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Image} from 'react-native-magnus';
import {Electron} from './data';
import {StyleSheet} from 'react-native';
import {center, radius} from './CryptoAtom';

type PlanetProps = {
  electron: Electron;
};

const TAU = Math.PI * 2;

const Particle: React.FC<PlanetProps> = ({electron}) => {
  const angle = useSharedValue<number>(electron.angle);

  const rStyle = useAnimatedStyle(() => {
    const translateX = radius.x * Math.cos(angle.value);
    const translateY = radius.y * (-1 * Math.sin(angle.value));

    return {
      top: center.y - electron.size / 2,
      left: center.x - electron.size / 2,
      width: electron.size,
      height: electron.size,
      transform: [{translateX}, {translateY}],
    };
  });

  const imageBoxStyle = {
    width: electron.size,
    height: electron.size,
    borderRadius: electron.size / 2,
    backgroundColor: electron.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    angle.value = withDelay(
      2000,
      withRepeat(withTiming(TAU + electron.angle, {duration: 6000}), -1, false),
    );
  });

  return (
    <Animated.View style={[styles.box, rStyle]}>
      <Animated.View
        entering={BounceIn.delay(300 + electron.delay)}
        style={imageBoxStyle}>
        <Image
          source={electron.image}
          w={electron.size * 0.7}
          h={electron.size * 0.7}
          rounded={'xl'}
          resizeMode={'cover'}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Particle;

const styles = StyleSheet.create({
  box: {
    elevation: 2,
    position: 'absolute',
  },
});
