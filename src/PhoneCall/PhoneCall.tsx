import React from 'react';
import {LogBox} from 'react-native';
import {Avatar, Div, Icon} from 'react-native-magnus';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Wave from './Wave';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const PhoneCall: NavigationFunctionComponent = () => {
  return (
    <Div
      w={'100%'}
      h={'100%'}
      flex={1}
      bg={'gray100'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Avatar size={70} bg={'purple600'}>
        <Icon
          fontFamily="MaterialIcons"
          name={'phone'}
          color={'#fff'}
          fontSize={25}
          shadow={'md'}
        />
      </Avatar>
      <Wave delay={1 * 400} />
      <Wave delay={2 * 400} />
      <Wave delay={3 * 400} />
      <Wave delay={4 * 400} />
    </Div>
  );
};

PhoneCall.options = {
  statusBar: {
    visible: false,
    drawBehind: true,
  },
  topBar: {
    visible: false,
  },
};

export default PhoneCall;
