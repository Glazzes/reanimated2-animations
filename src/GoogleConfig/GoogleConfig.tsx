import React, {useRef} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import UserInfo from './UserInfo';
import Content from './Content';
import {StyleSheet, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import TestContent from './TestContent';

const GoogleConfig: NavigationFunctionComponent = () => {
  const translateY = useSharedValue<number>(0);
  const scrollY = useSharedValue<number>(0);
  const ref = useRef<Animated.ScrollView>();

  const infoTY = useSharedValue<number>(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => (scrollY.value = e.contentOffset.y),
  });

  const rStyle = useAnimatedStyle(() => {
    const ty = interpolate(
      scrollY.value,
      [0, 200],
      [200, 0],
      Extrapolate.CLAMP,
    );

    return {
      position: 'absolute',
      top: ty,
    };
  });

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          {
            width: 200,
            height: 50,
            backgroundColor: 'pink',
          },
        ]}
      />
      <Animated.View style={rStyle}>
        <Animated.ScrollView
          onScroll={onScroll}
          style={[{flex: 1}]}
          contentContainerStyle={{height: 1000, backgroundColor: 'tomato'}}
        />
      </Animated.View>
    </View>
  );
};

export default GoogleConfig;

GoogleConfig.options = {
  statusBar: {
    backgroundColor: '#fff',
    style: 'dark',
  },
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
