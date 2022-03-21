import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Card from './Card';
import {users} from './data';
import {Div} from 'react-native-magnus';

const Tinder: NavigationFunctionComponent = () => {
  return (
    <Div flex={1}>
      {users.map(user => {
        return <Card key={`user-${user.name}`} user={user} />;
      })}
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

export default Tinder;
