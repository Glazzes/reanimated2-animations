import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {BezierSlider} from './src/BezierSlider';
import {GroceryList, GroceryDetail} from './src/GroceryList';
import {CryptoAtom} from './src/CryptoAtom';
import Drawer from './src/navigation/Drawer';
import {Albums} from './src/Albums';
import {Tinder} from './src/Tinder';
import {Pinch2Zoom} from './src/PinchToZoom';
import {PhoneCall} from './src/PhoneCall';
import {HealthMate} from './src/HealthMate';
import Friction from './src/Testing/Friction';
import QrScanerPath from './src/Testing/QrScanerPath';
import {ColorRotation} from './src/ColorRotation';

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

Navigation.registerComponent('HealthMate', () =>
  gestureHandlerRootHOC(HealthMate),
);
Navigation.registerComponent('PhoneCall', () => PhoneCall);
Navigation.registerComponent('CryptoAtom', () => CryptoAtom);
Navigation.registerComponent('Albums', () => gestureHandlerRootHOC(Albums));
Navigation.registerComponent('Tinder', () => gestureHandlerRootHOC(Tinder));

Navigation.registerComponent('Pinch2Zoom', () =>
  gestureHandlerRootHOC(Pinch2Zoom),
);

Navigation.registerComponent('Testing', () =>
  gestureHandlerRootHOC(QrScanerPath),
);

Navigation.registerComponent('ColorRotation', () =>
  gestureHandlerRootHOC(ColorRotation),
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
                  name: 'Testing',
                  options: {
                    statusBar: {
                      drawBehind: true,
                      visible: false,
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
