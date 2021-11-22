import {Dimensions} from 'react-native';
import {Layout, Options} from 'react-native-navigation';
import {Fruit} from '../utils/types';

const DURATION = 250;

const {height} = Dimensions.get('window');

export const fromFruitToDetail = (
  destination: string,
  prop: Fruit,
): Layout<{fruit: Fruit}> => {
  return {
    component: {
      passProps: {fruit: prop},
      name: destination,
      options: {
        statusBar: {
          visible: false,
        },
        animations: {
          push: {
            elementTransitions: [
              {
                id: 'appbar',
                alpha: {
                  from: 0,
                  to: 1,
                  duration: DURATION * 4,
                },
                y: {
                  from: height,
                  to: 0,
                  duration: DURATION * 2,
                },
              },
              {
                id: 'info',
                alpha: {
                  from: 0,
                  to: 1,
                  duration: DURATION * 4,
                },
                translationY: {
                  from: height / 2,
                  to: 0,
                  duration: DURATION * 2,
                },
              },
            ],
            sharedElementTransitions: [
              {
                fromId: `fruit-${prop.name}`,
                toId: `fruit-${prop.name}-detail`,
                interpolation: {type: 'linear'},
                duration: DURATION,
              },
            ],
          },
          pop: {
            sharedElementTransitions: [
              {
                fromId: `fruit-${prop.name}-detail`,
                toId: `fruit-${prop.name}`,
                interpolation: {type: 'linear'},
                duration: DURATION,
              },
            ],
          },
        },
      },
    },
  };
};

export const fromDetailToCart = (fruitName: string): Options => {
  return {
    animations: {
      pop: {
        sharedElementTransitions: [
          {
            fromId: `fruit-${fruitName}-detail`,
            toId: `fruit-${fruitName}-cart`,
            duration: DURATION * 1.5,
          },
        ],
      },
    },
  };
};
