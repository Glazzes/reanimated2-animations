import React, {Dispatch, SetStateAction} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type QuaintitySelectorProps = {
  price: number;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const QuaintitySelector: React.FC<QuaintitySelectorProps> = ({
  price,
  quantity,
  setQuantity,
}) => {
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () =>
    setQuantity(prev => {
      if (prev - 1 < 1) {
        return 1;
      }

      return prev - 1;
    });

  return (
    <View style={styles.root}>
      <View style={styles.selectorContainer}>
        <Pressable onPress={decrease}>
          <CommunityIcons name={'minus'} size={25} color={'black'} />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable onPress={increase}>
          <CommunityIcons name={'plus'} size={25} color={'black'} />
        </Pressable>
      </View>
      <Text style={styles.price}>${quantity * price}</Text>
    </View>
  );
};

export default QuaintitySelector;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorContainer: {
    width: width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
