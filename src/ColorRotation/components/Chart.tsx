import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {charInfo, Origin} from '../utils/data';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TAU} from 'react-native-redash';
import {ShadowView} from '@dimaportenko/react-native-shadow-view';
import {Canvas, ImageSVG} from '@shopify/react-native-skia';
import {buildSkiaSvgChart} from '../utils/utils';

type ChartProps = {
  rotation: Animated.SharedValue<number>;
};

const {width, height} = Dimensions.get('window');

const STROKE_WIDTH = 2;
const R = width * 0.4;

const buildChartOrigins = (): Origin[] => {
  const origins: Origin[] = [];
  for (let i = 0; i < charInfo.length; i++) {
    const start =
      i === 0
        ? {x: R + R * Math.cos(0), y: R + -(R * Math.sin(0))}
        : origins[i - 1].end;

    let combinedPercentage = 0;
    for (let j = 0; j <= i; j++) {
      combinedPercentage += charInfo[j].percentage;
    }

    const end = {
      x: R + R * Math.cos(TAU * combinedPercentage),
      y: R + -(R * Math.sin(TAU * combinedPercentage)),
    };

    origins.push({start, end});
  }

  return origins;
};

const svg = buildSkiaSvgChart(
  buildChartOrigins(),
  charInfo.length,
  STROKE_WIDTH,
  R,
);

const Chart: React.FC<ChartProps> = ({rotation}) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${-rotation.value}rad`}],
    };
  });

  return (
    <Animated.View style={[styles.canvas, rStyle]}>
      <ShadowView style={[styles.container, styles.shadow]}>
        <Canvas style={styles.container}>
          <ImageSVG svg={svg} x={0} y={0} width={R * 2} height={R * 2} />
        </Canvas>
      </ShadowView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: R * 2,
    height: R * 2,
    position: 'absolute',
    top: height - R * 2,
    borderRadius: R,
    alignSelf: 'center',
  },
  container: {
    width: R * 2,
    height: R * 2,
    borderRadius: R,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: R,
    shadowOpacity: 0.25,
  },
});

export default Chart;
