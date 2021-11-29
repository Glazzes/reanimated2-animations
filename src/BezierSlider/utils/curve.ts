import {Vector} from 'react-native-redash';

export const curve = (c1: Vector, c2: Vector, to: Vector) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};
