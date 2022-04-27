import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {selectionColors} from '../utils/data';
import {TAU} from 'react-native-redash';

type ColorIndicatorProps = {
  rotation: Animated.SharedValue<number>;
  theta: number;
};

const {width} = Dimensions.get('window');
const ARC = 15;
const h = width * 0.6;
const v = 30;
const R = 10;

const path = [
  'M 0 0',
  `h ${h + ARC}`,
  `v ${v + ARC * 2}`,
  `h ${-(h + ARC)}`,
  `v ${-(v + ARC * 2)}`,
  `M ${-ARC / 8} 0`,
  `h ${h}`,
  `a ${R} ${R} 0 0 1 ${R} ${R}`,
  `v ${v}`,
  `a ${R} ${R} 0 0 1 ${-R} ${R}`,
  `h ${-h / 2}`,
  `a ${R} ${R} 0 0 1 ${R} ${R}`,
  `a ${R} ${R} 0 0 1 ${R} ${-R}`,
  `h ${-h / 2}`,
  `a ${R} ${R} 0 0 1 ${-R} ${-R}`,
  `v ${-v}`,
  `a ${R} ${R} 0 0 1 ${R} ${-R}`,

  'z',
].join(' ');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ColorIndicator: React.FC<ColorIndicatorProps> = ({rotation, theta}) => {
  /*
  What's this non sense?
  InterpolateColor function can drop up to 31 fps
  */
  const rStyle = useAnimatedStyle(() => {
    const index = interpolate(
      -rotation.value + TAU,
      selectionColors.map((_, i) => i * theta),
      selectionColors.map((_, i) => i),
      Extrapolate.CLAMP,
    );

    return {
      backgroundColor: selectionColors[Math.round(index)],
    };
  });

  // some simple "mask" in order to keep performance
  return (
    <AnimatedSvg
      width={h + ARC}
      height={v + ARC * 2}
      style={[styles.svg, rStyle]}>
      <Path d={path} fill={'#fff'} fillRule={'evenodd'} />
    </AnimatedSvg>
  );
};

const styles = StyleSheet.create({
  svg: {
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default ColorIndicator;
