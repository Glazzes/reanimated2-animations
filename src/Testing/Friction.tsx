import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const Friction: React.FC = () => {
  const sharedValue = useSharedValue<number>(width);

  const translateOffset = useSharedValue<number>(0);
  const heighOffset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onStart(_ => {
      heighOffset.value = sharedValue.value;
    })
    .onChange(e => {
      const delta = e.translationY - translateOffset.value;
      const withRatio =
        delta * (0.75 * Math.pow(1 - Math.min(1, e.translationY / 750), 2));

      sharedValue.value = heighOffset.value + withRatio;
      translateOffset.value = e.translationY;
      heighOffset.value = sharedValue.value;
    })
    .onEnd(_ => {
      console.log(sharedValue);
      sharedValue.value = withTiming(0);
      translateOffset.value = 0;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: sharedValue.value}],
    };
  });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={pan}>
        <Animated.Image
          resizeMode={'cover'}
          height={1000}
          width={width}
          source={require('./slug-cat.png')}
          style={[rStyle, styles.box]}
        />
      </GestureDetector>
    </View>
  );
};

export default Friction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: 'tomato',
  },
});
