import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {RNNDrawer} from 'react-native-navigation-drawer-extension';
import {BezierSlider} from './src/BezierSlider';
import {GroceryList, GroceryDetail} from './src/GroceryList';
import Drawer from './src/navigation/Drawer';

Navigation.registerComponent('GroceryApp', () =>
  gestureHandlerRootHOC(GroceryList),
);

Navigation.registerComponent('CustomDrawer', () => RNNDrawer.create(Drawer));
Navigation.registerComponent('GroceryApp.Detail', () => GroceryDetail);

// Bezier slider screens
Navigation.registerComponent('BezierSlider', () =>
  gestureHandlerRootHOC(BezierSlider),
);

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    animate: true,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'GroceryApp',
              options: {
                statusBar: {
                  backgroundColor: '#f7f5f1',
                  style: 'dark',
                },
              },
            },
          },
        ],
      },
    },
  });
});
