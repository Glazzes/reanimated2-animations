import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Svg, {Path} from 'react-native-svg';
import {selectionColors} from './data';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Chart from './Chart';
import ColorIndicator from './ColorIndicator';
import {TAU} from 'react-native-redash';
import {buildPath} from './utilts';
import {ShadowView} from '@dimaportenko/react-native-shadow-view';

const {width, height} = Dimensions.get('window');

type Origin = {
  start: {x: number; y: number};
  end: {x: number; y: number};
};

const R = width;
const theta = TAU / selectionColors.length;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ColorRatation: NavigationFunctionComponent = ({}) => {
  const [paths, setPaths] = useState<string[]>([]);

  const rotation = useSharedValue<number>(0);
  const offset = useSharedValue<number>(0);
  const origin = useSharedValue<number>(0);

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

  const rSvgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${-Math.PI / 2 + theta / 2}rad`},
        {rotate: `${-rotation.value}rad`},
      ],
    };
  });

  useEffect(() => {
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

    const ds = buildPath(origins, selectionColors.length, R);
    setPaths(ds);
  }, []);

  return (
    <View style={styles.root}>
      <ShadowView style={[styles.shadow, styles.svg]}>
        <AnimatedSvg
          width={R * 2}
          height={R * 2}
          style={rSvgStyles}
          renderToHardwareTextureAndroid={true}>
          {paths.map((path, index) => {
            return (
              <Path
                d={path}
                key={`path-${index}`}
                fill={selectionColors[index]}
                stroke={'#fff'}
                strokeWidth={2}
              />
            );
          })}
        </AnimatedSvg>
      </ShadowView>
      <Chart rotation={rotation} />
      <ColorIndicator rotation={rotation} theta={theta} />
      <GestureDetector gesture={rotationGesture}>
        <Animated.View style={styles.svg} />
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
  svg: {
    position: 'absolute',
    top: height - width * 1.4,
    left: -width / 2,
    width: R * 2,
    height: R * 2,
    borderRadius: R,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: R,
  },
});

export default ColorRatation;
