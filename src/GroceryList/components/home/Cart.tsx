import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CartPreview from './CartPreview';
import CartProductList from './CartProductList';

type CartProps = {
  translateY: Animated.SharedValue<number>;
};

const Cart: React.FC<CartProps> = ({translateY}) => {
  const opacity = useSharedValue<number>(1);
  const rHeight = useSharedValue<number>(height * 0.2);

  const onSwipeUp = useAnimatedGestureHandler<FlingGestureHandlerGestureEvent>({
    onActive: _ => {
      translateY.value = withTiming(-height * 0.75);
      opacity.value = withTiming(0);
      rHeight.value = withTiming(height * 0.075);
    },
  });

  const onSwipeDown =
    useAnimatedGestureHandler<FlingGestureHandlerGestureEvent>({
      onActive: _ => {
        translateY.value = withTiming(0, {}, isFinished => {
          if (isFinished) {
            opacity.value = withTiming(1);
          }
        });
        rHeight.value = withTiming(height * 0.2);
      },
    });

  return (
    <FlingGestureHandler direction={Directions.UP} onGestureEvent={onSwipeUp}>
      <Animated.View style={styles.root}>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onGestureEvent={onSwipeDown}>
          <Animated.View style={styles.container}>
            <CartPreview opacity={opacity} height={rHeight} />
            <CartProductList />
          </Animated.View>
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
