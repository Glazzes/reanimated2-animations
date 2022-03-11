import React from 'react';
import {
  LinearGradient,
  Canvas,
  Paint,
  vec,
  Rect,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Directions} from 'react-native-gesture-handler';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import Appbar from './Appbar';
import {albums} from './data';
import Album from './Album';
import Header from './Header';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {View} from 'react-native';

const PADDING = 10;

const {width, height} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = width * 1.15;

const Albums: NavigationFunctionComponent = () => {
  const scrollX = useSharedValue<number>(albums.length - 1);

  const leftSwipe = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      if (scrollX.value > 0) {
        const newValue = Math.floor(scrollX.value - 1);
        scrollX.value = withSpring(newValue);
      }
    });

  const rightSwipe = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      if (scrollX.value < albums.length - 1) {
        const newValue = Math.floor(scrollX.value + 1);
        scrollX.value = withSpring(newValue);
      }
    });

  const gesture = Gesture.Race(leftSwipe, rightSwipe);

  return (
    <View style={styles.root}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Paint>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={['#2d3447', '#1b1e44']}
          />
        </Paint>
        <Rect x={0} y={0} width={width} height={height} />
      </Canvas>
      <Appbar />
      <Header
        title={'Trending'}
        subtitle={'25+ albums'}
        tooltip={'Chillhop essentials'}
        tooltipColor={'#FF6e6e'}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.gestureContainer}>
          {albums.map((album, index) => {
            return (
              <Album
                key={album.title}
                scrollX={scrollX}
                index={index}
                album={album}
              />
            );
          })}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

Albums.options = {
  topBar: {
    visible: false,
  },
  statusBar: {
    translucent: true,
    drawBehind: true,
    blur: true,
  },
};

export default Albums;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gestureContainer: {
    width,
    height: ITEM_HEIGHT + PADDING * 2,
    padding: PADDING,
  },
  lastImage: {
    borderRadius: 20,
    marginHorizontal: PADDING * 1.7,
    marginVertical: PADDING,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH / 1.5,
  },
});
