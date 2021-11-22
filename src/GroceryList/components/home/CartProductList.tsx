import React from 'react';
import {
  Text,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import MateirlaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProgressBar} from 'react-native-paper';
import {useGroceryStore} from '../../store/store';
import {CartFruit} from '../../utils/types';

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

  const delivery = total === 0 ? 0 : total <= 40 ? 10 : 0;
  const toalPlusDelivery = total + delivery;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={fruits}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
          <ProgressBar
            progress={Math.min(1, (total * 100) / 40 / 100)}
            color={'#4d4d4d'}
            style={styles.progressBar}
          />
        </View>
        <Text style={[styles.baseText, styles.infoPrice]}>${delivery}</Text>
      </View>
      <View style={styles.checkout}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total :</Text>
          <Text style={styles.totalPrice}>
            ${Math.max(0, toalPlusDelivery)}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable>
          <View style={styles.addToCartButton}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </View>
        </Pressable>
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
    height: SIZE * 3 + SPACCING * 6,
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
    marginVertical: SPACCING,
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
    flex: 1,
    paddingVertical: SPACCING,
    paddingHorizontal: SPACCING * 1.5,
    justifyContent: 'flex-start',
  },
  deliveryInfoText: {
    marginTop: 5,
    color: '#4d4d4d',
    fontSize: 18,
  },
  infoPrice: {
    marginTop: SPACCING,
  },
  progressBar: {
    marginTop: SPACCING * 1.5,
  },
  checkout: {
    justifyContent: 'space-between',
  },
  total: {
    flexDirection: 'row',
    marginTop: SPACCING * 2,
    justifyContent: 'space-between',
    paddingHorizontal: SPACCING * 3.5,
  },
  totalText: {
    fontFamily: 'SFProDisplayBold',
    color: '#4d4d4d',
    fontSize: 25,
  },
  totalPrice: {
    fontFamily: 'SFProDisplayBold',
    color: '#fff',
    fontSize: 35,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    height: 60,
    backgroundColor: '#ffba42',
    width: width - SPACCING * 7,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'SFProDisplayBold',
  },
});
