import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';

type CartProps = {
  translateY: Animated.SharedValue<number>;
};

const Cart: React.FC<CartProps> = ({translateY}) => {
  const onSwipeUp = useAnimatedGestureHandler<FlingGestureHandlerGestureEvent>({
    onActive: _ => (translateY.value = withTiming(-height * 0.75)),
  });

  const onSwipeDown =
    useAnimatedGestureHandler<FlingGestureHandlerGestureEvent>({
      onActive: _ => (translateY.value = withTiming(0)),
    });

  return (
    <FlingGestureHandler direction={Directions.UP} onGestureEvent={onSwipeUp}>
      <Animated.View style={styles.root}>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onGestureEvent={onSwipeDown}>
          <Animated.View style={styles.container} />
        </FlingGestureHandler>
      </Animated.View>
    </FlingGestureHandler>
  );
};

export default Cart;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    width,
    height: height * 0.95,
    backgroundColor: '#050505',
  },
  container: {
    flex: 1,
  },
});
