import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {GroceryList} from './src/GroceryList';
import FruitDetail from './src/GroceryList/FruitDetail';

Navigation.registerComponent('GroceryList', () =>
  gestureHandlerRootHOC(GroceryList),
);

Navigation.registerComponent('GroceyList.Detail', () => FruitDetail);

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
              name: 'GroceryList',
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
