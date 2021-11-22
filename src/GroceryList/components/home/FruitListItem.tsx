import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Fruit} from '../../utils/types';

type FruitListItemProps = {
  fruit: Fruit;
  onPress: () => void;
};

const {width} = Dimensions.get('window');

const FruitListItem: React.FC<FruitListItemProps> = ({fruit, onPress}) => {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <Image
        nativeID={`fruit-${fruit.name}`}
        source={fruit.image}
        style={styles.image}
        resizeMode={'cover'}
      />
      <Text style={styles.price}>{`$${fruit.price}`}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{fruit.name}</Text>
        <Text style={styles.weight}>{fruit.weight}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(FruitListItem);

const IMAGE_SIZE = (width - 50) / 2;
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: '#fff',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 15,
  },
  info: {
    marginTop: 10,
    paddingLeft: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  weight: {
    fontSize: 17,
    color: '#dadada',
    fontWeight: 'bold',
  },
});
