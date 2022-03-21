import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Drawer as PaperDrawer} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {goTo} from './screenOptions';

type DrawerProps = {
  parentComponentId: string;
};

const {statusBarHeight} = Navigation.constantsSync();

const Drawer: NavigationFunctionComponent<DrawerProps> = () => {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={require('./assets/react-logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Reanimated 2 animations</Text>
      </View>
      <PaperDrawer.Item
        label={'Grocery store'}
        onPress={() => goTo('GroceryStore')}
      />
      <PaperDrawer.Item
        label={'Bezier slider'}
        onPress={() => goTo('BezierSlider')}
      />

      <PaperDrawer.Item
        label={'Cyrpto atom'}
        onPress={() => goTo('CyrptoAtom')}
      />

      <PaperDrawer.Item label={'Albums'} onPress={() => goTo('Albums')} />

      <PaperDrawer.Item
        label={'Tinder (like app)'}
        onPress={() => goTo('Tinder')}
      />
    </ScrollView>
  );
};

Drawer.options = {
  statusBar: {
    drawBehind: true,
    translucent: true,
  },
};

export default Drawer;

const SIZE = 100;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
  container: {
    width: width * 0.75,
    marginLeft: width * 0.05,
    marginBottom: width * 0.05,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  title: {
    fontFamily: 'SFProDisplayBold',
    fontSize: 18,
  },
});
