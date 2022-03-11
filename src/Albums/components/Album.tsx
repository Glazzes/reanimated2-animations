import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {AlbumData} from './data';

type AlbumProps = {
  album: AlbumData;
  index: number;
  scrollX: Animated.SharedValue<number>;
};

const {width} = Dimensions.get('window');
const PADDING = 10;
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = width * 1.15;

const Album: React.FC<AlbumProps> = ({index, scrollX, album}) => {
  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [index - 1, index, index + 1, index + 2],
      [-width, 0, 50, 90],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      [index, index + 1, index + 2],
      [1, 0.85, 0.75],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(scrollX.value, [index + 3, index + 2], [0, 1]);

    return {transform: [{translateX}, {scale}], opacity}; //{transform: [{translateX}, {scale}]};
  });

  return (
    <Animated.View style={[rStyle, styles.imageContainer]}>
      <ImageBackground
        source={album.image}
        resizeMode={'cover'}
        style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.albumTitle}>{album.title}</Text>
            <Text style={styles.tooltip}>Listen</Text>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default Album;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    maxWidth: ITEM_WIDTH,
    paddingVertical: PADDING * 2,
    paddingHorizontal: PADDING,
  },
  albumTitle: {
    color: 'white',
    fontFamily: 'SFProDisplayBold',
    fontSize: 18,
    paddingBottom: PADDING / 2,
  },
  tooltip: {
    backgroundColor: '#497dc6',
    paddingVertical: PADDING / 2,
    paddingHorizontal: PADDING,
    borderRadius: PADDING * 2,
    color: 'white',
    fontFamily: 'SFProDisplayBold',
    maxWidth: ITEM_WIDTH * 0.4,
    textAlign: 'center',
  },
});
