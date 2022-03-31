import {View, Dimensions, StyleSheet, LogBox, Image} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {useVector} from 'react-native-redash';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp, pinch} from './utils/utils';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const {width, height} = Dimensions.get('window');

const Pinch2Zoom: NavigationFunctionComponent = () => {
  const dimensions = useVector(1, 1);

  const maxScale = useDerivedValue<number>(() => {
    let scale = 1;
    const aspecRatio = dimensions.x.value / dimensions.y.value;
    if (aspecRatio < 1) {
      scale = Math.floor(dimensions.y.value / height);
    }
    if (aspecRatio >= 1) {
      scale = Math.floor(dimensions.x.value / width);
    }

    return scale;
  }, [dimensions.x.value, dimensions.y.value]);

  useEffect(() => {
    Image.getSize('', (w, h) => {
      dimensions.x.value = w;
      dimensions.y.value = h;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const origin = useVector(0, 0);
  const scale = useSharedValue<number>(1);
  const scaleOffset = useSharedValue<number>(1);

  const gestureScale = useSharedValue<number>(1);

  const translate = useVector(0, 0);
  const offset = useVector(0, 0);
  const originAssign = useSharedValue<boolean>(true);

  const maxDistance = useDerivedValue<{x: number; y: number}>(() => {
    const x = (scale.value * width - width) / 2;
    const y = (scale.value * height - height) / 2;

    return {x, y};
  }, [scale.value]);

  const pinchGesture = Gesture.Pinch()
    .onStart(_ => {
      originAssign.value = true;
      offset.x.value = translate.x.value;
      offset.y.value = translate.y.value;
      scaleOffset.value = scale.value;
    })
    .onChange(e => {
      scale.value = scaleOffset.value + e.scale - 1;

      if (scale.value > 1) {
        const {translateX, translateY} = pinch(offset, e, originAssign, origin);
        translate.x.value = clamp(translateX, maxDistance.value.x);
        translate.y.value = clamp(translateY, maxDistance.value.y);
      }
    })
    .onEnd(() => {
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
      translate.x.value = clamp(tx, maxDistance.value.x);
      translate.y.value = clamp(ty, maxDistance.value.y);
    })
    .onEnd(({velocityX, velocityY}) => {
      translate.x.value = withDecay({
        velocity: velocityX,
        clamp: [-maxDistance.value.x, maxDistance.value.x],
      });

      translate.y.value = withDecay({
        velocity: velocityY,
        clamp: [-maxDistance.value.y, maxDistance.value.y],
      });
    });

  const singleTap = Gesture.Tap()
    .maxDelay(200)
    .onStart(_ => {});

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(200)
    .onStart(e => {
      if (maxScale.value < gestureScale.value) {
        gestureScale.value = gestureScale.value + 1;
      } else {
        gestureScale.value = 1;
      }

      const {translateX, translateY} = pinch(
        offset,
        {focalX: e.x, focalY: e.y, scale: gestureScale.value},
        originAssign,
        origin,
      );

      scale.value = withTiming(gestureScale.value);
      translate.x.value = withTiming(translateX);
      translate.y.value = withTiming(translateY);
    });

  const gesture = Gesture.Race(pinchGesture, pan, doubleTap, singleTap);

  const rStyle = useAnimatedStyle(() => {
    const translateX =
      scale.value < 1
        ? translate.x.value
        : clamp(translate.x.value, maxDistance.value.x);

    const translateY =
      scale.value < 1
        ? translate.y.value
        : clamp(translate.y.value, maxDistance.value.y);

    return {
      transform: [{translateX}, {translateY}, {scale: scale.value}],
    };
  });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={require('./assets/pandas.jpg')}
          style={[styles.image, rStyle]}
          resizeMode={'cover'}
        />
      </GestureDetector>
    </View>
  );
};

Pinch2Zoom.options = {
  statusBar: {
    drawBehind: true,
    visible: false,
  },
};

export default Pinch2Zoom;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
  },
});
