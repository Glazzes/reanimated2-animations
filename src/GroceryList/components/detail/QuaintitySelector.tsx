import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const QuaintitySelector = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () =>
    setQuantity(prev => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });

  return (
    <View style={styles.container}>
      <Text>{quantity}</Text>
    </View>
  );
};

export default QuaintitySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
