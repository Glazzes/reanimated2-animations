import React from 'react';
import {StyleSheet} from 'react-native';
import {Drawer as PaperDrawer} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {RNNDrawer} from 'react-native-navigation-drawer-extension';

type DrawerProps = {
  parentComponentId: string;
};

const Drawer: React.FC<DrawerProps> = ({parentComponentId}) => {
  const goTo = (componentName: string) => {
    Navigation.push(parentComponentId, {component: {name: componentName}});
    RNNDrawer.dismissDrawer();
  };

  return (
    <ScrollView style={styles.root}>
      <PaperDrawer.Item
        label={'Grocery store'}
        onPress={() => goTo('GroceryApp')}
      />
      <PaperDrawer.Item
        label={'Bezier slider'}
        onPress={() => goTo('BezierSlider')}
      />
    </ScrollView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
