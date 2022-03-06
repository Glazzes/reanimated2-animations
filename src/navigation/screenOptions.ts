import {Layout, Options} from 'react-native-navigation';

// common options
const options: Options = {
  sideMenu: {
    left: {
      visible: false,
    },
  },
  statusBar: {
    visible: true,
    style: 'dark',
    drawBehind: true,
  },
};

export const toGroceryApp: Layout = {
  component: {
    name: 'GroceryApp',
    options,
  },
};

export const toBezierSlider: Layout = {
  component: {
    name: 'BezierSlider',
    options,
  },
};

export const toCryptoAtom: Layout = {
  component: {
    name: 'CryptoOrbiter',
    options,
  },
};
