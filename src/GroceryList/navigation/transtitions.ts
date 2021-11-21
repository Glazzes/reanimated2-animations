import {Dimensions} from 'react-native';
import {Layout} from 'react-native-navigation';
import {Fruit} from '../utils/data';

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
          backgroundColor: '#fff',
          style: 'dark',
        },
        animations: {
          push: {
            elementTransitions: [
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
