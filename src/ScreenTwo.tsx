import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';

const ScreenTwo: NavigationFunctionComponent = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text} nativeID={'helloDest'}>
        Hello world
      </Text>
    </View>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'orange',
  },
});
