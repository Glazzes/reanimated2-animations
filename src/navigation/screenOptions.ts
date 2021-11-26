import {Layout} from 'react-native-navigation';

export const toGroceryApp: Layout = {
  component: {
    options: {
      statusBar: {
        visible: true,
        style: 'dark',
        backgroundColor: '#f7f5f1',
        drawBehind: true,
      },
    },
    name: 'GroceryApp',
  },
};

export const toBezierSlider: Layout = {
  component: {
    options: {
      statusBar: {
        visible: true,
        style: 'dark',
        backgroundColor: '#fff',
        drawBehind: true,
      },
    },
    name: 'BezierSlider',
  },
};
