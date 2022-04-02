import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableRipple} from 'react-native-paper';
import {Div} from 'react-native-magnus';
import {Navigation} from 'react-native-navigation';

type TestContentProps = {
  translate: Animated.SharedValue<number>;
  infoHeight: Animated.SharedValue<number>;
};

const {height} = Dimensions.get('window');
const PADDING: number = 10;
const IMAGE_MAX_SIZE: number = 80;
const IMAGE_MIN_SIZE: number = 20;

const services = [
  'Anuncios',
  'Autocompletar',
  'Configuracion para apps de Google',
  'Configurar y restaurar',
  'Datos moviles y mensajeria',
  'Dispositivos y uso compartido',
  'Encontrar mi dispositivo',
  'Personalizar mediante datos compartidos',
];

const {statusBarHeight} = Navigation.constantsSync();

const TestContent: React.FC<TestContentProps> = ({
  infoHeight,
  translate: translateY,
}) => {
  const offset = useSharedValue<number>(0);
  const layout = useSharedValue<number>(0);

  const scroll = useDerivedValue<number>(() => {
    const maxScroll = layout.value - statusBarHeight * 3;

    const currentScroll = translateY.value + 200;
    return Math.max(-maxScroll, Math.min(0, currentScroll));
  }, [infoHeight.value, layout.value]);

  const pan = Gesture.Pan()
    .onStart(_ => {
      offset.value = translateY.value;
      cancelAnimation(translateY);
    })
    .onChange(e => {
      translateY.value = e.translationY + offset.value;
      infoHeight.value = interpolate(
        translateY.value,
        [0, -200],
        [200, 0],
        Extrapolate.CLAMP,
      );
    })
    .onEnd(({velocityY}) => {});

  const rStyle = useAnimatedStyle(() => {
    return {elevation: -1, transform: [{translateY: scroll.value}]};
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={rStyle}
        onLayout={e => (layout.value = e.nativeEvent.layout.height)}>
        <Div w={'100%'} h={1} bg={'gray200'} />
        <Div>
          <View style={styles.infoBox}>
            <Text style={styles.info}>Informacion relacionada con El</Text>
          </View>
          <View style={styles.coronaInfo}>
            <View style={styles.corona}>
              <Icon name={'coronavirus'} color={'#DB4437'} size={30} />
            </View>
            <View>
              <Text style={styles.notification}>
                Notificaciones de exposicion al COVID-19
              </Text>
              <Text style={styles.no}>No</Text>
            </View>
          </View>
          <Div w={'100%'} h={1} bg={'gray200'} />
        </Div>
        <View style={styles.infoBox}>
          <Text style={styles.info}>Sericios en este dispositivo</Text>
        </View>
        {services.map((service, index) => (
          <TouchableRipple
            style={styles.serviceBox}
            key={`service-${index}`}
            onPress={() => {}}>
            <Text style={styles.service}>{service}</Text>
          </TouchableRipple>
        ))}
        <Div w={'100%'} h={1} bg={'gray200'} />
        <View style={styles.serviceBox}>
          <Text style={styles.info}>Programador</Text>
        </View>
        <View style={styles.serviceBox}>
          <Text style={styles.service}>Firebase app indexing</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default TestContent;

const styles = StyleSheet.create({
  serviceBox: {
    paddingHorizontal: IMAGE_MAX_SIZE - PADDING / 2,
    paddingRight: IMAGE_MIN_SIZE,
    paddingVertical: PADDING * 2,
  },
  service: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
  },
  infoBox: {
    paddingLeft: IMAGE_MAX_SIZE - PADDING / 2,
    paddingRight: IMAGE_MIN_SIZE,
    paddingVertical: PADDING,
  },
  info: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  coronaInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: IMAGE_MAX_SIZE,
  },
  corona: {
    width: IMAGE_MAX_SIZE,
    height: IMAGE_MAX_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    fontSize: 15,
  },
  no: {color: 'grey'},
});
