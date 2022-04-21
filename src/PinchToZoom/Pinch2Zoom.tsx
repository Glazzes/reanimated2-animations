import {Dimensions, StyleSheet, LogBox} from 'react-native';
import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {useVector} from 'react-native-redash';
import Animated, {
  cancelAnimation,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp, imageStyles, maxScale, pinch} from './utils/utils';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const {width, height} = Dimensions.get('window');

const Pinch2Zoom: NavigationFunctionComponent = () => {
  const d = {width: 860, height: 860};
  const s = imageStyles(d);

  const layout = useVector(1, 1);

  const scale = useSharedValue<number>(1);
  const scaleOffset = useSharedValue<number>(1);

  const translate = useVector(0, 0);
  const offset = useVector(0, 0);

  const origin = useVector(0, 0);
  const originAssign = useSharedValue<boolean>(true);

  const translation = useDerivedValue<{x: number; y: number}>(() => {
    const offsetX = Math.max((layout.x.value * scale.value - width) / 2, 0);
    const offsetY = Math.max((layout.y.value * scale.value - height) / 2, 0);

    const x = clamp(-offsetX, translate.x.value, offsetX);
    const y = clamp(-offsetY, translate.y.value, offsetY);

    return {x, y};
  }, [translate.x.value, translate.y.value, scale.value]);

  const pinchGesture = Gesture.Pinch()
    .onStart(_ => {
      offset.x.value = translation.value.x;
      offset.y.value = translation.value.y;
      scaleOffset.value = scale.value;
    })
    .onChange(e => {
      const {translateX, translateY} = pinch(
        layout,
        offset,
        e,
        originAssign,
        origin,
      );

      translate.x.value = translateX;
      translate.y.value = translateY;
      scale.value = clamp(0, scaleOffset.value * e.scale, maxScale(d, layout));
    })
    .onEnd(() => {
      originAssign.value = true;
      if (scale.value < 1) {
        scale.value = withSpring(1);
        translate.x.value = withSpring(0);
        translate.y.value = withSpring(0);
      }
    });

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(_ => {
      offset.x.value = translation.value.x;
      offset.y.value = translation.value.y;
      cancelAnimation(translate.x);
      cancelAnimation(translate.y);
    })
    .onChange(e => {
      translate.y.value = offset.x.value + e.translationX;
      translate.x.value = offset.y.value + e.translationY;
    })
    .onEnd(({velocityX, velocityY}) => {
      if (scale.value === 1) {
        translate.y.value = withTiming(0);
        return;
      }

      translate.x.value = withDecay({velocity: velocityX});
      translate.y.value = withDecay({velocity: velocityY});
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(e => {
      const toMaxScale = maxScale(d, layout);

      let toScale = scale.value * 2;
      if (toScale > toMaxScale) {
        toScale = 1;
      }

      const {translateX, translateY} = pinch(
        layout,
        offset,
        {focalX: e.x, focalY: e.y, scale: toScale},
        originAssign,
        origin,
      );

      translate.x.value = withTiming(translateX);
      translate.y.value = withTiming(translateY);
      scale.value = withTiming(toScale);
    })
    .onFinalize(_ => {
      originAssign.value = true;
    });

  const gesture = Gesture.Race(pan, pinchGesture, doubleTap);

  const rStyle = useAnimatedStyle(() => {
    const translateY =
      scale.value === 1 ? translate.y.value : translation.value.y;

    return {
      transform: [
        {translateX: translation.value.x},
        {translateY},
        {scale: scale.value},
      ],
    };
  });

  const reanimatedContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translate.y.value,
        [-height / 3, 0, height / 3],
        ['transparent', '#000', 'transparent'],
        'RGB',
      ),
    };
  });

  return (
    <Animated.View style={[styles.root, reanimatedContainerStyles]}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          onLayout={({nativeEvent}) => {
            layout.x.value = nativeEvent.layout.width;
            layout.y.value = nativeEvent.layout.height;
          }}
          style={[s, rStyle]}
          source={require('./assets/cryptid.jpg')}
          resizeMethod={'scale'}
          resizeMode={'cover'}
        />
      </GestureDetector>
    </Animated.View>
  );
};

Pinch2Zoom.options = {
  statusBar: {
    drawBehind: true,
    visible: false,
  },
  topBar: {
    visible: false,
  },
};

export default Pinch2Zoom;

const styles = StyleSheet.create({
  root: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
