import React, {useEffect} from 'react';
import {Dimensions, ListRenderItemInfo, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import BMI from './BMI';

type BMIScrollviewProps = {
  scrollRef: React.RefObject<Animated.FlatList<number>>;
};

const {width, height} = Dimensions.get('window');
const bmis = new Array(50).fill(0).map((_, index) => index + 1);

function keyExtractor(item: number) {
  return `BMI ${item}`;
}

function renderItem(itemInfo: ListRenderItemInfo<number>): React.ReactElement {
  return <BMI index={itemInfo.item} />;
}

const BMIScrollview: React.FC<BMIScrollviewProps> = ({scrollRef}) => {
  useEffect(() => {
    scrollRef.current
      ?.getNode()
      .scrollToOffset({offset: 20 * (height / 9), animated: true});
  });

  return (
    <Animated.FlatList
      ref={scrollRef}
      data={bmis}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={styles.root}
      scrollEnabled={false}
      contentContainerStyle={{backgroundColor: '#37caff'}}
    />
  );
};

export default BMIScrollview;

const styles = StyleSheet.create({
  root: {
    width,
    height,
    position: 'absolute',
  },
});
