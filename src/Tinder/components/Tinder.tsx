import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Card from './Card';
import {users} from './data';
import {Div, Header, Icon} from 'react-native-magnus';
import {StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

const Tinder: NavigationFunctionComponent = () => {
  const currentIndex = useSharedValue<number>(users.length - 1);

  return (
    <Div flex={1} style={styles.root}>
      <Header
        style={styles.header}
        prefix={
          <Icon
            name="person"
            fontFamily="MaterialIcons"
            fontSize={'5xl'}
            color={'gray400'}
          />
        }
        suffix={
          <Icon
            name="chat-bubble"
            fontFamily="MaterialIcons"
            fontSize={'5xl'}
            color={'gray400'}
          />
        }
      />
      <Div my={'sm'} style={styles.container}>
        {users.map((user, index) => {
          return (
            <Card
              key={`user-${user.name}`}
              user={user}
              index={index}
              currentIndex={currentIndex}
            />
          );
        })}
      </Div>
    </Div>
  );
};

Tinder.options = {
  statusBar: {
    drawBehind: true,
    visible: false,
  },
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
  container: {
    width: '90%',
    height: '75%',
    marginHorizontal: '5%',
    borderRadius: 15,
  },
  header: {
    elevation: 0,
  },
});

export default Tinder;
