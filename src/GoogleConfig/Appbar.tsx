import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar as PaperAppbar, IconButton} from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
} from 'react-native-reanimated';

const ICON_BOX_WIDTH = 70;
const IMAGE_MIN_SIZE: number = 20;

type AppbarProps = {
  translateY: Animated.SharedValue<number>;
};

const Appbar: React.FC<AppbarProps> = ({translateY}) => {
  const appBarContentWidth = useSharedValue<number>(0);

  const rIconBoxStyles = useAnimatedStyle(() => {
    const width = interpolate(
      translateY.value,
      [0, -ICON_BOX_WIDTH],
      [ICON_BOX_WIDTH, ICON_BOX_WIDTH + IMAGE_MIN_SIZE * 2.3],
      Extrapolate.CLAMP,
    );

    return {width};
  });

  const rTextStyles = useAnimatedStyle(() => {
    const width = interpolate(
      translateY.value,
      [0, -ICON_BOX_WIDTH],
      [0, ICON_BOX_WIDTH],
      Extrapolate.CLAMP,
    );

    const maxWidth = appBarContentWidth.value - ICON_BOX_WIDTH - width;

    return {maxWidth};
  });

  return (
    <PaperAppbar.Header style={styles.appbar}>
      <PaperAppbar.BackAction onPress={() => {}} color={'grey'} />
      <View
        style={styles.appbarContent}
        onLayout={e => {
          appBarContentWidth.value = e.nativeEvent.layout.width;
        }}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[styles.title, rTextStyles]}>
          Config. de Google
        </Animated.Text>
        <Animated.View style={[styles.iconBox, rIconBoxStyles]}>
          <IconButton
            style={styles.icon}
            icon={'information'}
            color={'grey'}
            onPress={() => {}}
          />
          <IconButton
            style={styles.icon}
            icon={'dots-vertical'}
            color={'grey'}
            onPress={() => {}}
          />
        </Animated.View>
      </View>
    </PaperAppbar.Header>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'white',
    elevation: 0,
  },
  appbarContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '400',
    fontSize: 20,
    flexGrow: 1,
  },
  iconBox: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
});
