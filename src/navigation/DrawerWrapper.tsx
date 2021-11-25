import React from 'react';
import {StyleSheet} from 'react-native';
import {SideMenuView} from 'react-native-navigation-drawer-extension';

type DrawerWrapperProps = {
  parentComponentId: string;
};

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  children,
  parentComponentId,
}) => {
  return (
    <SideMenuView
      style={styles.root}
      drawerName={'CustomDrawer'}
      direction={'left'}
      passProps={{
        animationOpenTime: 300,
        animationCloseTime: 300,
        dismissWhenTouchOutside: true,
        fadeOpacity: 0.7,
        drawerScreenWidth: '75%',
        drawerScreenHeight: '100%',
        parentComponentId,
      }}
      options={{
        statusBar: {
          backgroundColor: 'transparent',
          style: 'dark',
          animated: true,
        },
        layout: {
          componentBackgroundColor: 'transparent',
        },
      }}>
      {children}
    </SideMenuView>
  );
};

export default DrawerWrapper;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
