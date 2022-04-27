import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {selectionColors} from '../utils/data';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Chart from './Chart';
import ColorIndicator from './ColorIndicator';
import {TAU} from 'react-native-redash';
import {buildSkiaSvgPath} from '../utils/utils';
import {ShadowView} from '@dimaportenko/react-native-shadow-view';
import {Canvas, ImageSVG} from '@shopify/react-native-skia';

const {width, height} = Dimensions.get('window');

type Origin = {
  start: {x: number; y: number};
  end: {x: number; y: number};
};

const R = width;
const theta = TAU / selectionColors.length;

const buildColorOrigins = (): Origin[] => {
  const origins: Origin[] = [];
  for (let i = 0; i < selectionColors.length; i++) {
    const start =
      i === 0
        ? {x: R + R * Math.cos(0), y: R + -1 * (R * Math.sin(0))}
        : origins[i - 1].end;

    const end = {
      x: R + R * Math.cos(theta * (i + 1)),
      y: R + -1 * (R * Math.sin(theta * (i + 1))),
    };

    origins.push({start, end});
  }

  return origins;
};

const svg = buildSkiaSvgPath(buildColorOrigins(), selectionColors.length, R);

const ColorRatation: NavigationFunctionComponent = ({}) => {
  const rotation = useSharedValue<number>(0);
  const offset = useSharedValue<number>(0);
  const origin = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${-Math.PI / 2 + theta / 2}rad`},
        {rotate: `${-rotation.value}rad`},
      ],
    };
  });

  const rotationGesture = Gesture.Pan()
    .onBegin(e => {
      const angle = Math.atan2(-(e.y - R), e.x - R);
      const normalized = angle < 0 ? (angle + TAU) % TAU : angle % TAU;

      origin.value = normalized;
      offset.value = rotation.value;
    })
    .onChange(e => {
      const angle = Math.atan2(-(e.y - R), e.x - R);
      const normalized = (angle + TAU) % TAU;
      rotation.value = (offset.value + (normalized - origin.value) + TAU) % TAU;
    })
    .onEnd(() => {
      const index = rotation.value / theta;
      rotation.value = withSpring(Math.round(index) * theta);
    });

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.canvas, rStyle]}>
        <ShadowView style={styles.container}>
          <Canvas style={styles.container}>
            <ImageSVG svg={svg} x={0} y={0} width={R * 2} height={R * 2} />
          </Canvas>
        </ShadowView>
      </Animated.View>
      <Chart rotation={rotation} />
      <ColorIndicator rotation={rotation} theta={theta} />
      <GestureDetector gesture={rotationGesture}>
        <Animated.View style={styles.canvas} />
      </GestureDetector>
    </View>
  );
};

ColorRatation.options = {
  statusBar: {
    visible: false,
  },
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    position: 'absolute',
    top: height - width * 1.4,
    left: -width / 2,
    width: R * 2,
    height: R * 2,
    borderRadius: R,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: R * 2,
    height: R * 2,
    borderRadius: R,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: R,
    backgroundColor: '#fff',
  },
});

export default ColorRatation;
