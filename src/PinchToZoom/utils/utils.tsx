import {Dimensions} from 'react-native';
import {} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Vector} from 'react-native-redash';

const {width, height} = Dimensions.get('window');

type Styles = {
  height: undefined | number;
  maxHeight: undefined | number;
  width: undefined | number;
  maxWidth: undefined | number;
  aspectRatio: number;
};

const maxScale = (
  dimensions: {width: number; height: number},
  layout: Vector<Animated.SharedValue<number>>,
): number => {
  'worklet';
  return layout.x.value > layout.y.value
    ? dimensions.width / layout.x.value
    : dimensions.height / layout.y.value;
};

const imageStyles = (dimensions: {width: number; height: number}): Styles => {
  const aspectRatio = dimensions.width / dimensions.height;
  const s: Styles = {
    width: undefined,
    maxWidth: width,
    height: undefined,
    maxHeight: height,
    aspectRatio,
  };
  if (aspectRatio >= 1) {
    s.width = width;
  } else {
    s.height = height;
  }

  return s;
};

const clamp = (left: number, value: number, right: number): number => {
  'worklet';
  return Math.max(Math.min(left, value), right);
};

const pinch = (
  layout: Vector<Animated.SharedValue<number>>,
  translateOffset: Vector<Animated.SharedValue<number>>,
  event: {focalX: number; focalY: number; scale: number},
  originAssign: Animated.SharedValue<boolean>,
  origin: Vector<Animated.SharedValue<number>>,
): {translateX: number; translateY: number} => {
  'worklet';
  const adjustedFocalX = event.focalX - layout.x.value / 2;
  const adjustedFocalY = event.focalY - layout.y.value / 2;

  if (originAssign.value) {
    origin.x.value = adjustedFocalX;
    origin.y.value = adjustedFocalY;
    originAssign.value = false;
  }

  const pinchX = adjustedFocalX - origin.x.value;
  const pinchY = adjustedFocalY - origin.y.value;

  const translateX =
    pinchX +
    origin.x.value +
    translateOffset.x.value +
    -1 * event.scale * origin.x.value;

  const translateY =
    pinchY +
    origin.y.value +
    translateOffset.y.value +
    -1 * event.scale * origin.y.value;

  return {translateX, translateY};
};

export {clamp, pinch, imageStyles, maxScale};
