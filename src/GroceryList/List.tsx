import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import FruitListItem from './FruitListItem';
import {Fruit, fruits} from './utils/data';
import {fromFruitToDetail} from './navigation/transtitions';
import {Screens} from './navigation/screens';

function keyExtractor(fruit: Fruit): string {
  return `fruit-${fruit.name}`;
}

type ListProps = {
  parentComponentId: string;
};

const List: React.FC<ListProps> = ({parentComponentId}) => {
  return (
    <FlatList
      data={fruits}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.flatList}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({item}: {item: Fruit}) => {
        const onPress = () => {
          Navigation.push(
            parentComponentId,
            fromFruitToDetail(Screens.DetailScreen, item),
          );
        };

        return <FruitListItem fruit={item} onPress={onPress} />;
      }}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  flatList: {
    padding: 5,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
});
