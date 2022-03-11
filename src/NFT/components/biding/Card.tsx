import {View, Text} from 'react-native';
import React from 'react';
import {Div} from 'react-native-magnus';
import {NFT} from './data';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {snapPoint, useVector} from 'react-native-redash';

type CardProps = {
  nft: NFT;
  elevation: number;
};

const Card: React.FC<CardProps> = ({nft}) => {
  const vec2 = useVector(0, 0);
  const gesture = Gesture.Pan()
    .onChange(({translationX, translationY}) => {
      vec2.x.value = translationX;
      vec2.y.value = translationY;
    })
    .onEnd(({velocityX}) => {
      const snapTo = snapPoint(vec2.x.value, velocityX, [0, 200]);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View>
        <Div bg="#fff" p={'md'} rounded={'sm'} flex={1}>
          <Div
            flex={1}
            bg={'gray900'}
            rounded={'sm'}
            bgImg={nft.screenshot}></Div>
        </Div>
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Card);
