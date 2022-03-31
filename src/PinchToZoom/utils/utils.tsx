import {Dimensions} from 'react-native';
import {} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Vector} from 'react-native-redash';

const clamp = (value: number, maxDistance: number): number => {
  'worklet';
  return Math.max(Math.min(value, maxDistance), -maxDistance);
};

const {width, height} = Dimensions.get('window');

const pinch = (
  translateOffset: Vector<Animated.SharedValue<number>>,
  event: {focalX: number; focalY: number; scale: number},
  originAssign: Animated.SharedValue<boolean>,
  origin: Vector<Animated.SharedValue<number>>,
): {translateX: number; translateY: number} => {
  'worklet';
  const adjustedFocalX = event.focalX - width / 2;
  const adjustedFocalY = event.focalY - height / 2;

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

export {clamp, pinch};
