import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {GroceryList, GroceryDetail} from './src/GroceryList';

Navigation.registerComponent('GroceryList', () =>
  gestureHandlerRootHOC(GroceryList),
);

Navigation.registerComponent('GroceyList.Detail', () => GroceryDetail);

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
