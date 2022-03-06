import React from 'react';
import {Dimensions, Image, LogBox, StyleSheet} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Button, Div, Text} from 'react-native-magnus';
import SVG, {Ellipse} from 'react-native-svg';
import {electrons} from './data';
import Particle from './Particle';
import Animated, {BounceIn, FadeInDown} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
export const center = {x: width / 2, y: height / 4};
export const radius = {x: center.x * 0.69, y: center.x * 0.61};
const ellipseRadius = {x: center.x * 0.8, y: center.y * 0.67};

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

const CryptoOrbiter: NavigationFunctionComponent = () => {
  return (
    <Div flex={1} flexDir={'column'} bg={'#181723'}>
      <SVG width={width} height={height / 2}>
        <Ellipse
          rx={ellipseRadius.x}
          ry={ellipseRadius.y}
          cx={center.x}
          cy={center.y}
          stroke={'#36333d'}
          strokeWidth={1}
        />
        <Ellipse
          rx={ellipseRadius.x}
          ry={ellipseRadius.y}
          cx={center.x}
          cy={center.y}
          stroke={'#36333d'}
          strokeWidth={1}
          transform={`rotate(-45, ${center.x}, ${center.y})`}
        />
      </SVG>
      <Div
        flex={1}
        alignItems={'center'}
        pt={'md'}
        justifyContent={'space-between'}
        pb={'lg'}>
        <Div w={'100%'} alignItems={'center'}>
          <Animated.View
            style={{width, alignItems: 'center'}}
            entering={FadeInDown.delay(1200)}>
            <Text
              fontWeight="bold"
              color="gray100"
              fontSize={'4xl'}
              w={'65%'}
              textAlign={'center'}>
              Enjoy the better way on trade just on your phone
            </Text>
          </Animated.View>

          <Animated.View
            style={{width, alignItems: 'center'}}
            entering={FadeInDown.delay(800)}>
            <Text
              w={'80%'}
              fontSize={'md'}
              color={'gray700'}
              mt={'lg'}
              textAlign={'center'}>
              Start trading and save your money with invest on crypto currency
              now
            </Text>
          </Animated.View>
        </Div>
        <Animated.View
          style={{width, alignItems: 'center'}}
          entering={FadeInDown.delay(800)}>
          <Button
            alignSelf="center"
            bg="green200"
            w={'65%'}
            color="gray700"
            rounded={'lg'}
            fontWeight="bold">
            Get started
          </Button>
        </Animated.View>
      </Div>
      {electrons.map(electron => {
        return <Particle key={electron.id} electron={electron} />;
      })}
      <Animated.View entering={BounceIn.delay(800)} style={styles.box}>
        <Image source={require('../assets/bitcoin.png')} style={styles.image} />
      </Animated.View>
    </Div>
  );
};

CryptoOrbiter.options = {
  statusBar: {
    visible: false,
    backgroundColor: '#181723',
    drawBehind: true,
  },
  topBar: {
    visible: false,
  },
};

export default CryptoOrbiter;

const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EBDECF',
    elevation: 2,
    position: 'absolute',
    top: center.y - 30,
    left: center.x - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
});
