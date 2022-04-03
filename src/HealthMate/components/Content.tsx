import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import WeightIndicator from './WeightIndicator';

type ContentProps = {};

const {width, height} = Dimensions.get('window');

const Content: React.FC<ContentProps> = ({}) => {
  const translateY = useSharedValue<number>(0);

  return (
    <View style={styles.root}>
      <WeightIndicator translateY={translateY} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  root: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
