import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  interpolateColor,
  useAnimatedProps,
} from 'react-native-reanimated';
import {selectionColors} from '../utils/data';

type ColorIndicatorProps = {
  rotation: Animated.SharedValue<number>;
  theta: number;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const {width} = Dimensions.get('window');
const ARC = 15;
const h = width * 0.7 - ARC * 2;
const v = 30;
const R = 10;

const path = [
  'M 0 0',
  `h ${h}`,
  `a ${R} ${R} 0 0 1 ${R} ${R}`,
  `v ${v}`,
  `a ${R} ${R} 0 0 1 ${-R} ${R}`,
  `h ${-h / 2 + ARC}`,
  `a ${R} ${R} 0 0 1 ${R} ${R}`,
  `a ${R} ${R} 0 0 1 ${R} ${-R}`,
  `h ${-h / 2 + ARC}`,
  `a ${R} ${R} 0 0 1 ${-R} ${-R}`,
  `v ${-v}`,
  `a ${R} ${R} 0 0 1 ${R} ${-R}`,
  'z',
].join(' ');

const ColorIndicator: React.FC<ColorIndicatorProps> = ({rotation, theta}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      fill: interpolateColor(
        -rotation.value + Math.PI * 2,
        selectionColors.map((_, i) => i * theta),
        selectionColors,
        'RGB',
      ),
    };
  });

  return (
    <Svg width={h + ARC * 2} height={v * 6} style={styles.svg}>
      <AnimatedPath d={path} animatedProps={animatedProps} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default ColorIndicator;
