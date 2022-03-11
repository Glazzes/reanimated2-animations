import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Div} from 'react-native-magnus';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Card from './Card';
import {NFT, nfts} from './data';

function renderItem(nft: ListRenderItemInfo<NFT>): React.ReactElement {
  return <Card nft={nft.item} elevation={nfts.length - nft.index} />;
}

function keyExtractor(nft: NFT): string {
  return nft.name;
}

const {width, height} = Dimensions.get('window');

const Biding: NavigationFunctionComponent = () => {
  return (
    <Div flex={1}>
      <FlatList
        data={nfts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </Div>
  );
};

export default Biding;

const styles = StyleSheet.create({
  flatList: {
    width,
    height: height / 2,
  },
});
