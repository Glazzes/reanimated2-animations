import {Navigation} from 'react-native-navigation';
import App from './App';
import ScreenTwo from './src/ScreenTwo';

Navigation.registerComponent('Home', () => App);
Navigation.registerComponent('ScreenTwo', () => ScreenTwo);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
