import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Appbar from './Appbar';
import Cart from './Cart';
import List from './List';

const GroceryList: NavigationFunctionComponent = ({componentId}) => {
  const translateY = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View style={[styles.rootContainer, rStyle]}>
      <Animated.View style={[styles.container]}>
        <Appbar />
        <List parentComponentId={componentId} />
      </Animated.View>
      <Cart translateY={translateY} />
    </Animated.View>
  );
};

GroceryList.options = {
  topBar: {
    visible: false,
  },
};

export default GroceryList;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    width,
    height: height * 0.8,
  },
  rootContainer: {
    backgroundColor: '#050505',
  },
  container: {
    height: height * 0.8,
    backgroundColor: '#f7f5f1',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
});
