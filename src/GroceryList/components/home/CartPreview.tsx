import React from 'react';
import {Image, ListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useGroceryStore} from '../../store/store';
import {CartFruit} from '../../utils/types';

type CartPreviewProps = {
  opacity: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
};

function keyExtractor(cartFruit: CartFruit): string {
  return `fruit-${cartFruit.fruit.name}-cart`;
}

function renderItem({item}: ListRenderItemInfo<CartFruit>): React.ReactElement {
  return (
    <Image
      nativeID={`fruit-${item.fruit.name}-cart`}
      source={item.fruit.image}
      style={styles.image}
    />
  );
}

const CartPreview: React.FC<CartPreviewProps> = ({opacity, height}) => {
  const fruits = useGroceryStore(state => state.cartFruits);
  const quantity = fruits
    .map(f => f.quantity)
    .reduce((prev, next) => prev + next, 0);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
  }));

  return (
    <Animated.View style={[styles.root, rStyle]}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={fruits}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        horizontal
      />
      {quantity > 0 && (
        <View style={styles.counter}>
          <Text style={styles.counterText}>{quantity}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export default CartPreview;

const SIZE = 50;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'SFProDisplayBold',
  },
  flatList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  counter: {
    backgroundColor: '#ffbc44',
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
  counterText: {
    fontFamily: 'SFProDisplayBold',
    fontSize: 20,
  },
});
