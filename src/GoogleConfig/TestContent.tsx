import {Dimensions, LayoutChangeEvent, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {Navigation} from 'react-native-navigation';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type Props = {
  infoTY: Animated.SharedValue<number>;
};

const topBarHeight = Navigation.constantsSync().topBarHeight;
const {width, height} = Dimensions.get('window');

const TestContent: React.FC<Props> = ({infoTY}) => {
  const scrollableAreaHeight = useSharedValue<number>(0);
  const scrollY = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);

  const translationY = useDerivedValue<number>(() => {
    const containerHeight = height - infoTY.value - topBarHeight;
    const scrollableArea = Math.min(
      scrollableAreaHeight.value - containerHeight,
      0,
    );

    return Math.min(scrollableArea, Math.max(-scrollableArea, scrollY.value));
  }, [scrollY.value, infoTY]);

  const gesture = Gesture.Pan()
    .onStart(_ => {
      offsetY.value = scrollY.value;
      cancelAnimation(scrollY);
    })
    .onChange(e => {
      scrollY.value = e.translationY + offsetY.value;
    })
    .onEnd(e => {
      infoTY.value = withDecay({velocity: e.velocityY});
    });

  const measureScrollView = (e: LayoutChangeEvent) => {
    scrollableAreaHeight.value = e.nativeEvent.layout.height;
  };

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translationY.value}],
  }));

  return (
    <Animated.View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.root, rStyle]}
          onLayout={measureScrollView}></Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    overflow: 'hidden',
  },
});

export default TestContent;
