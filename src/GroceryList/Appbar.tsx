import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar as PaperAppbar} from 'react-native-paper';

const Appbar = () => {
  return (
    <PaperAppbar.Header style={styles.appbar}>
      <PaperAppbar.Action color={'#42403e'} icon={'chevron-right'} />
      <PaperAppbar.Content
        title={'Fruits and vegetables'}
        titleStyle={styles.title}
      />
      <PaperAppbar.Action icon={'chevron-right'} />
    </PaperAppbar.Header>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#f7f5f1',
    elevation: 0,
  },
  title: {
    fontSize: 18,
  },
});
