import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  AnimatableValue,
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {snapPoint, useVector} from 'react-native-redash';
import {User} from './data';
import {Div, Icon, Text} from 'react-native-magnus';
import StatusText from './StatusText';
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

const RIGHT_SNAP = width / 2;
const LEFT_SNAP = -width / 2;

const DOWN_SNAP = height / 2;
const UP_SNAP = -height / 1.5;

const MAX_ANGLE = Math.PI / 10;
const ROTATED_CARD_WIDTH =
  height * Math.sin(MAX_ANGLE) + width * Math.cos(MAX_ANGLE) - width / 2;

type CardProps = {
  user: User;
  index: number;
  currentIndex: Animated.SharedValue<number>;
};

const Card: React.FC<CardProps> = ({user, index, currentIndex}) => {
  const translate = useVector(0, 0);
  const scale = useSharedValue<number>(index === currentIndex.value ? 1 : 0.9);

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translate.x.value,
      [-width / 2, 0, width / 2],
      [-MAX_ANGLE, 0, MAX_ANGLE],
      Extrapolate.CLAMP,
    );

    const direction = interpolate(
      translate.y.value,
      [-height / 3, 0, height / 3],
      [-1, 0, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {scale: scale.value},
        {translateX: translate.x.value},
        {translateY: translate.y.value},
        {rotate: `${rotate * direction}rad`},
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onChange(e => {
      translate.y.value = e.translationY;
      translate.x.value = e.translationX;
    })
    .onEnd(({velocityX, velocityY}) => {
      const horizonalSnap = snapPoint(translate.x.value, velocityX, [
        LEFT_SNAP,
        0,
        RIGHT_SNAP,
      ]);

      const verticalSnap = snapPoint(translate.y.value, velocityY, [
        UP_SNAP,
        0,
        DOWN_SNAP,
      ]);

      const callback = (isFinished?: boolean, _?: AnimatableValue): void => {
        if (isFinished) {
          currentIndex.value = currentIndex.value - 1;
        }
      };

      if (horizonalSnap === 0) {
        translate.x.value = withSpring(0);
        translate.y.value = withSpring(0);
      }

      if (horizonalSnap === RIGHT_SNAP) {
        translate.x.value = withTiming(ROTATED_CARD_WIDTH, {}, callback);
        translate.y.value = withTiming(verticalSnap);
      }

      if (horizonalSnap === LEFT_SNAP) {
        translate.x.value = withTiming(-ROTATED_CARD_WIDTH, {}, callback);
        translate.y.value = withTiming(verticalSnap);
      }
    });

  useAnimatedReaction(
    () => currentIndex.value,
    cIndex => {
      if (index === cIndex) {
        scale.value = withSpring(1);
      }
    },
  );

  return (
    <React.Fragment>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[rStyle, styles.uesrContainer]}>
          <Div
            w={'100%'}
            h={'100%'}
            bgImg={user.profilePicture}
            flexDir={'column'}
            justifyContent={'space-between'}>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={[
                'rgba(0, 0, 0, 0.3)',
                'transparent',
                'rgba(0, 0, 0, 0.5)',
              ]}
            />
            <Div flex={1} flexDir={'row'}>
              <StatusText
                status="like"
                color="#38a169"
                inverted={true}
                translateX={translate.x}
              />
              <StatusText
                status="nope"
                color="#e53e3e"
                inverted={false}
                translateX={translate.x}
              />
            </Div>
            <Div w={'100%'} px={'lg'} py={'md'}>
              <Div flexDir="row" alignItems="baseline">
                <Text
                  fontWeight="bold"
                  fontFamily="SFProDisplayBold"
                  color="gray100"
                  mr={'md'}
                  fontSize={'5xl'}>
                  {user.name}
                </Text>
                <Text fontSize={'3xl'} color={'gray100'}>
                  {user.age}
                </Text>
              </Div>

              <Div flexDir="row" alignItems="baseline" w={'100%'}>
                <Icon
                  name="eye"
                  fontFamily="MaterialCommunityIcons"
                  fontSize={'lg'}
                  mr={'md'}
                />
                <Text color="gray100" mr={'md'} fontSize={'lg'} flex={1}>
                  {user.proffession}
                </Text>
                <Icon
                  color={'#fff'}
                  alignSelf={'flex-end'}
                  name="information"
                  fontFamily="MaterialCommunityIcons"
                  fontSize={'4xl'}
                  mr={'md'}
                />
              </Div>

              <Div flexDir="row" alignItems="baseline" w={'100%'}>
                <Icon
                  name="location-on"
                  fontFamily="MaterialIcons"
                  fontSize={'lg'}
                  mr={'md'}
                />
                <Text color="gray100" mr={'md'} fontSize={'lg'}>
                  {`${Math.ceil(Math.random() * 10)} Kilometers away`}
                </Text>
              </Div>
            </Div>
          </Div>
        </Animated.View>
      </GestureDetector>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  uesrContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 15,
  },
});

export default Card;
