import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Drawer as PaperDrawer} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Layout,
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import {toBezierSlider, toCryptoAtom, toGroceryApp} from './screenOptions';

type DrawerProps = {
  parentComponentId: string;
};

const {statusBarHeight} = Navigation.constantsSync();

const Drawer: NavigationFunctionComponent<DrawerProps> = () => {
  const goTo = (options: Layout) => {
    Navigation.push('Center', options);
  };

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
        onPress={() => goTo(toGroceryApp)}
      />
      <PaperDrawer.Item
        label={'Bezier slider'}
        onPress={() => goTo(toBezierSlider)}
      />

      <PaperDrawer.Item
        label={'Cyrpto atom'}
        onPress={() => goTo(toCryptoAtom)}
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
