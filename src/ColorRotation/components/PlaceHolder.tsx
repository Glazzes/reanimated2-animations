import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';

type PlaceHolderProps = {};

const {width, height} = Dimensions.get('window');
const R = width / 5;

const PlaceHolder: React.FC<PlaceHolderProps> = ({}) => {
  return <View style={styles.svg} />;
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: height - R * 2.95,
    alignSelf: 'center',
    width: R * 2,
    height: R * 2,
    borderRadius: R * 2,
    backgroundColor: '#fff',
  },
});

export default PlaceHolder;
