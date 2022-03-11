import {Navigation, Options} from 'react-native-navigation';

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

export const goTo = (route: string) => {
  Navigation.push('Center', {
    component: {
      name: route,
      options,
    },
  });
};
