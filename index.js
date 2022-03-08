import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {BezierSlider} from './src/BezierSlider';
import {GroceryList, GroceryDetail} from './src/GroceryList';
import {CryptoAtom} from './src/CryptoAtom';
import Drawer from './src/navigation/Drawer';

Navigation.registerComponent('Drawer', () => Drawer);

// Grocery list app
Navigation.registerComponent('GroceryApp', () =>
  gestureHandlerRootHOC(GroceryList),
);
Navigation.registerComponent('GroceryApp.Detail', () => GroceryDetail);

// Bezier slider screens
Navigation.registerComponent('BezierSlider', () =>
  gestureHandlerRootHOC(BezierSlider),
);

// Crypto atom
Navigation.registerComponent('CryptoAtom', () => CryptoAtom);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'Drawer',
          },
        },
        center: {
          stack: {
            id: 'Center',
            children: [
              {
                component: {
                  name: 'CryptoAtom',
                  options: {
                    statusBar: {
                      backgroundColor: '#fff',
                      style: 'dark',
                      drawBehind: true,
                    },
                    topBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
});
