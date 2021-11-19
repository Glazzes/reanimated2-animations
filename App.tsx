import React from 'react';
import {Text, View} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {Button} from 'react-native-paper';

const App: NavigationFunctionComponent = ({componentId}) => {
  const goToSecond = () => {
    Navigation.push(componentId, {
      component: {
        name: 'ScreenTwo',
        options: {
          animations: {
            push: {
              sharedElementTransitions: [
                {
                  fromId: 'hello',
                  toId: 'helloDest',
                  interpolation: {
                    type: 'linear',
                  },
                },
              ],
            },
          },
        },
      },
    });
  };

  return (
    <View>
      <Text nativeID={'hello'}>Hello world</Text>
      <Button mode={'contained'} onPress={goToSecond}>
        Go to second
      </Button>
    </View>
  );
};

export default App;
