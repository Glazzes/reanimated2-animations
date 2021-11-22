import React from 'react';
import {
  Text,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MateirlaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar} from 'react-native-paper';
import {useGroceryStore} from './store/store';
import {CartFruit} from './utils/types';

function keyExtractor(cartFruit: CartFruit) {
  return `fruit-${cartFruit.fruit.name}-product`;
}

function renderItem({item}: ListRenderItemInfo<CartFruit>): React.ReactElement {
  return <FruitProduct cartFruit={item} />;
}

const FruitProduct = ({cartFruit}: {cartFruit: CartFruit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Image source={cartFruit.fruit.image} style={styles.image} />
        <Text style={styles.baseText}>{cartFruit.quantity}</Text>
        <Text style={styles.baseText}>x</Text>
        <Text style={[styles.baseText, styles.name]}>
          {cartFruit.fruit.name}
        </Text>
      </View>
      <Text style={styles.baseText}>
        ${cartFruit.quantity * cartFruit.fruit.price}
      </Text>
    </View>
  );
};

const CartProductList = () => {
  const fruits = useGroceryStore(state => state.cartFruits);
  const total = fruits
    .map(f => f.quantity * f.fruit.price)
    .reduce((prev, next) => prev + next, 0);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={fruits}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </View>

      <View style={styles.delivery}>
        <View style={styles.truckContainer}>
          <MateirlaIcons name={'truck-outline'} size={40} color={'#fff'} />
        </View>
        <View style={styles.deliveryInfo}>
          <Text style={styles.baseText}>Delivery</Text>
          <Text style={styles.deliveryInfoText}>
            All orders of $40 or more qualify for free delivery
          </Text>
          <ProgressBar progress={0.5} color={'#4d4d4d'} />
        </View>
        <Text style={styles.baseText}>$10</Text>
      </View>
    </View>
  );
};

export default CartProductList;

const SIZE = 50;
const SPACCING = 10;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'SFProDisplayBold',
    marginHorizontal: SPACCING * 3,
    marginBottom: SPACCING * 2,
  },
  flatListContainer: {
    height: SIZE * 3 + SPACCING * 8,
    width,
  },
  flatList: {
    paddingHorizontal: SPACCING * 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACCING * 1.5,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    marginRight: SPACCING * 2,
  },
  baseText: {
    fontSize: 17,
    fontFamily: 'SFProDisplayBold',
    color: '#fff',
    marginRight: SPACCING,
  },
  name: {
    marginLeft: SPACCING,
  },
  truckContainer: {
    backgroundColor: '#4d4d4d',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  delivery: {
    marginTop: SPACCING * 2,
    paddingHorizontal: SPACCING * 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  deliveryInfo: {
    justifyContent: 'flex-start',
  },
  deliveryInfoText: {
    color: '#4d4d4d',
    fontSize: 15,
  },
});
