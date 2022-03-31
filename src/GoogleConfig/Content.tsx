import React, {useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
} from 'react-native-gesture-handler';
import {Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Divider} from 'react-native-paper';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

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

const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];

type ContentProps = {
  translateY: Animated.SharedValue<number>;
};

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const wait = (timeout: number) => {
  "worklet";
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Content: React.FC<ContentProps> = ({translateY}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const scrollY = useSharedValue<number>(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {y: number}
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({translationY}, ctx) => {
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({velocityY}) => {
      const snap = snapPoint(translateY.value, velocityY, [-100, 0]);
      translateY.value = withTiming(snap);
    },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y > scrollY.value && translateY.value >= 0) {
        translateY.value = withTiming(-100, {duration: 400});
      }

      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.root}>
        <AnimatedScrollView
          enabled={true}
          pointerEvents={'none'}
          onScroll={onScroll}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={googleColors}
            />
          }>
          <Divider />
          <View>
            <View style={styles.infoBox}>
              <Text style={styles.info}>Informacion relacionada con El</Text>
            </View>
            <View style={styles.coronaInfo}>
              <View style={styles.corona}>
                <Icon name={'coronavirus'} color={googleColors[1]} size={30} />
              </View>
              <View>
                <Text style={styles.notification}>
                  Notificaciones de exposicion al COVID-19
                </Text>
                <Text style={styles.no}>No</Text>
              </View>
            </View>
            <Divider />
          </View>
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
          <Divider />
          <View style={styles.serviceBox}>
            <Text style={styles.info}>Programador</Text>
          </View>
          <View style={styles.serviceBox}>
            <Text style={styles.service}>Firebase app indexing</Text>
          </View>
        </AnimatedScrollView>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Content;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
