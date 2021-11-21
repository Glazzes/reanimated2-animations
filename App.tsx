import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {Button} from 'react-native-paper';

type PassProps = {
  name: string;
};

const App: NavigationFunctionComponent = ({componentId}) => {
  return (
    <View style={{flex: 1}}>
      <Button mode={'contained'} onPress={goToSecond}>
        Go to second
      </Button>
      <View style={styles.container}>
        <Text nativeID={'hello'}>Hello world</Text>
        <Text nativeID={'hello2'}>Hello world</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
