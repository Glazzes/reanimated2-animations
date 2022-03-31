import {View, Text} from 'react-native';
import React from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

type HealthCareProps = {};

const HealthCare: React.FC<HealthCareProps> = ({}) => {
  const translateX = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onStart(e => {})
    .onChange(e => {})
    .onEnd(e => {});

  return (
    <View>
      <Text>Welcome to HealthCare</Text>
    </View>
  );
};

export default HealthCare;
