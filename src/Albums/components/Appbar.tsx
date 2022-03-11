import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar as PapperAppbar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const PADDING = 10;

const Appbar = () => {
  return (
    <PapperAppbar.Header style={styles.appbar}>
      <PapperAppbar.Action icon={'menu'} color={'white'} size={20} />
      <View style={styles.container}>
        <Entypo name={'magnifying-glass'} color={'white'} size={20} />
      </View>
    </PapperAppbar.Header>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    elevation: 0,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: PADDING * 1.3,
  },
});
