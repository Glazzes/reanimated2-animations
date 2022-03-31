import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {BezierSlider} from './src/BezierSlider';
import {GroceryList, GroceryDetail} from './src/GroceryList';
import {CryptoAtom} from './src/CryptoAtom';
import Drawer from './src/navigation/Drawer';
import {Albums} from './src/Albums';
import {Tinder} from './src/Tinder';
import {GoogleConfig} from './src/GoogleConfig';
import {Pinch2Zoom} from './src/PinchToZoom';

Navigation.registerComponent('Drawer', () => Drawer);

// Grocery list app
Navigation.registerComponent('GroceryStore', () =>
  gestureHandlerRootHOC(GroceryList),
);

Navigation.registerComponent('GroceryStore.Detail', () => GroceryDetail);

// Single screen animations
Navigation.registerComponent('BezierSlider', () =>
  gestureHandlerRootHOC(BezierSlider),
);

Navigation.registerComponent('CryptoAtom', () => CryptoAtom);
Navigation.registerComponent('Albums', () => gestureHandlerRootHOC(Albums));
Navigation.registerComponent('Tinder', () => gestureHandlerRootHOC(Tinder));
Navigation.registerComponent('GoogleConfig', () =>
  gestureHandlerRootHOC(GoogleConfig),
);

Navigation.registerComponent('Pinch2Zoom', () =>
  gestureHandlerRootHOC(Pinch2Zoom),
);

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
                  name: 'Pinch2Zoom',
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
