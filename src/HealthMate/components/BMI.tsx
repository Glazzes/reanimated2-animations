import {Dimensions} from 'react-native';
import React from 'react';
import {Div, Text} from 'react-native-magnus';

type BMIProps = {
  index: number;
};

const {height} = Dimensions.get('window');

const BMI: React.FC<BMIProps> = ({index}) => {
  return (
    <Div
      w={'100%'}
      h={height / 9}
      alignItems={'flex-start'}
      justifyContent={'center'}
      px={'md'}>
      <Text color="#fff">{`BMI ${index}`}</Text>
    </Div>
  );
};

export default BMI;
