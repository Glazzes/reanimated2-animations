import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import QuaintitySelector from './QuaintitySelector';
import {Appbar, IconButton} from 'react-native-paper';
import {useGroceryStore} from '../../store/store';
import {fromDetailToCart} from '../../navigation/transtitions';
import {Fruit} from '../../utils/types';

type FruitDetailProps = {
  fruit: Fruit;
};

/*
Native code is way too fast for Js to catch up, if no delay is provided the backwards shared transition
wont have a matching id on the other side
*/
function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

const GroceryDetail: NavigationFunctionComponent<FruitDetailProps> = ({
  componentId,
  fruit,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const addFruit = useGroceryStore(state => state.addFruit);

  const addToCart = async () => {
    addFruit({quantity, fruit});
    await timeout(30);
    Navigation.pop(componentId, fromDetailToCart(fruit.name));
  };

  return (
    <View style={styles.root} nativeID={'root'}>
      <Appbar.Header nativeID={'appbar'} style={styles.appbar}>
        <Appbar.Action icon={'chevron-left'} size={30} />
      </Appbar.Header>
      <View style={styles.imageContainer}>
        <Image
          nativeID={`fruit-${fruit.name}-detail`}
          style={styles.image}
          source={fruit.image}
          resizeMode={'cover'}
        />
      </View>
      <View nativeID={'info'} style={styles.info}>
        <Text style={styles.name}>{fruit.name}</Text>
        <Text style={styles.weight}>{fruit.weight}</Text>
        <QuaintitySelector
          price={fruit.price}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About this product</Text>
          <Text style={styles.aboutDescription}>
            The information presented on this site may differ from the goods on
            the trading floor, For more accurate
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton icon={'heart-outline'} size={30} onPress={() => {}} />
          <Pressable onPress={addToCart}>
            <View style={styles.addToCartButton}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GroceryDetail;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbar: {
    backgroundColor: '#fff',
    elevation: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: height * 0.5,
    height: height * 0.5,
    backgroundColor: '#fff',
    borderRadius: (height * 0.5) / 2,
  },
  info: {
    paddingBottom: 15,
    paddingHorizontal: 30,
    flex: 1,
  },
  name: {
    fontFamily: 'SFProDisplayBold',
    fontSize: 30,
  },
  weight: {
    color: '#cdcdcd',
    fontSize: 20,
  },
  aboutContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 23,
    fontFamily: 'SFProDisplayBold',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 19,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    height: 60,
    backgroundColor: '#ffba42',
    width: width * 0.75,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'SFProDisplayBold',
  },
});
