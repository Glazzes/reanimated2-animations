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
import {clamp, imageStyles, maximunDistance, pinch} from './utils/utils';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const {width, height} = Dimensions.get('window');

const Pinch2Zoom: NavigationFunctionComponent = () => {
  const layout = useVector(1, 1);
  const dimensions = useVector(860, 860);

  const maxScale = useDerivedValue<number>(() => {
    let mScale = 1;
    const aspecRatio = dimensions.x.value / dimensions.y.value;
    if (aspecRatio < 1) {
      mScale = Math.floor(dimensions.y.value / layout.y.value);
    }
    if (aspecRatio >= 1) {
      mScale = Math.floor(dimensions.x.value / layout.x.value);
    }

    return mScale;
  }, [dimensions.x.value, dimensions.y.value, layout.x.value, layout.y.value]);

  const origin = useVector(0, 0);
  const scale = useSharedValue<number>(1);
  const scaleOffset = useSharedValue<number>(1);

  const translate = useVector(0, 0);
  const offset = useVector(0, 0);
  const originAssign = useSharedValue<boolean>(true);

  const iStyles = useDerivedValue(() => {
    return imageStyles(dimensions);
  }, [dimensions.x.value, dimensions.y.value]);

  const maxDistance = useDerivedValue<{x: number; y: number}>(() => {
    const x = maximunDistance(layout.x.value, scale.value, width);
    const y = maximunDistance(layout.y.value, scale.value, height);

    return {x, y};
  }, [scale.value, layout.x.value, layout.y.value]);

  const pinchGesture = Gesture.Pinch()
    .onStart(_ => {
      offset.x.value = translate.x.value;
      offset.y.value = translate.y.value;
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

      translate.x.value = clamp(translateX, maxDistance.value.x);
      translate.y.value = clamp(translateY, maxDistance.value.y);
      scale.value = scaleOffset.value * e.scale;
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
      offset.x.value = translate.x.value;
      offset.y.value = translate.y.value;
      cancelAnimation(translate.x);
      cancelAnimation(translate.y);
    })
    .onChange(e => {
      const tx = offset.x.value + e.translationX;
      const ty = offset.y.value + e.translationY;

      if (scale.value === 1) {
        translate.y.value = ty;
        return;
      }

      translate.y.value = clamp(ty, maxDistance.value.y);
      translate.x.value = clamp(tx, maxDistance.value.x);
    })
    .onEnd(({velocityX, velocityY}) => {
      if (scale.value === 1) {
        translate.y.value = withTiming(0);
        return;
      }

      translate.x.value = withDecay({
        velocity: velocityX,
        clamp: [-maxDistance.value.x, maxDistance.value.x],
      });

      translate.y.value = withDecay({
        velocity: velocityY,
        clamp: [-maxDistance.value.y, maxDistance.value.y],
      });
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(e => {
      let toScale = scale.value;
      if (maxScale.value > toScale) {
        toScale = Math.floor(toScale + 1);
      } else {
        toScale = 1;
      }

      const {translateX, translateY} = pinch(
        layout,
        offset,
        {
          focalX: e.x,
          focalY: e.y,
          scale: toScale,
        },
        originAssign,
        origin,
      );

      if (toScale === 1) {
        translate.x.value = withTiming(0);
        translate.y.value = withTiming(0);
        scale.value = withTiming(toScale);
        offset.x.value = withTiming(0);
        offset.y.value = withTiming(0);
        return;
      }

      translate.x.value = withTiming(translateX);
      translate.y.value = withTiming(translateY);
      scale.value = withTiming(toScale);
    })
    .onFinalize(_ => {
      originAssign.value = true;
    });

  const gesture = Gesture.Race(pan, pinchGesture, doubleTap);

  const reanimatedImageStyles = useAnimatedStyle(() => {
    const translateX = clamp(translate.x.value, maxDistance.value.x);
    const translateY =
      scale.value === 1
        ? translate.y.value
        : clamp(translate.y.value, maxDistance.value.y);

    return {
      ...iStyles.value,
      transform: [{translateX}, {translateY}, {scale: scale.value}],
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
          style={[reanimatedImageStyles]}
          source={require('./assets/cryptid.jpg')}
          resizeMethod={'resize'}
          resizeMode={'contain'}
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
