import React from 'react';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Fruit} from './utils/data';

type FruitDetailProps = {
  fruit: Fruit;
};

const FruitDetail: NavigationFunctionComponent<FruitDetailProps> = ({
  fruit,
}) => {
  return (
    <View style={styles.root} nativeID={'root'}>
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
      </View>
    </View>
  );
};

export default FruitDetail;

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: height / 2,
    height: height / 2,
    backgroundColor: '#fff',
    borderRadius: height / 2,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  weight: {
    color: '#dadada',
    fontSize: 15,
  },
});
