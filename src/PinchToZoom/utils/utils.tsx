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

const imageStyles = (
  dimensions: Vector<Animated.SharedValue<number>>,
): Styles => {
  'worklet';
  const aspectRatio = dimensions.x.value / dimensions.y.value;
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

const clamp = (value: number, maxDistance: number): number => {
  'worklet';
  return Math.max(Math.min(value, maxDistance), -maxDistance);
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

const maximunDistance = (
  layout: number,
  scale: number,
  dimension: number,
): number => {
  'worklet';
  return Math.max(0, (layout * scale - dimension) / 2);
};

export {clamp, pinch, maximunDistance, imageStyles};
