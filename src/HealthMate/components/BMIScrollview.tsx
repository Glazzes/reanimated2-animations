import React from 'react';
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
} from 'react-native';
import BMI from './BMI';

const {width, height} = Dimensions.get('window');
const bmis = new Array(50).fill(0).map((_, index) => index + 1);

function keyExtractor(item: number) {
  return `BMI ${item}`;
}

function renderItem(itemInfo: ListRenderItemInfo<number>): React.ReactElement {
  return <BMI index={itemInfo.item} />;
}

const BMIScrollView = React.forwardRef<FlatList<number>>((_, ref) => {
  return (
    <FlatList
      ref={ref}
      data={bmis}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialScrollIndex={20}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      style={styles.root}
      contentContainerStyle={{backgroundColor: '#37caff'}}
    />
  );
});

export default BMIScrollView;

const styles = StyleSheet.create({
  root: {
    width,
    height,
    position: 'absolute',
  },
});
