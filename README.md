## Reanimated 2 animations

## About

Since the first release candidate of [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/) in late 2020 it has been a game changer the way we create animations today with [React native](https://reactnative.dev/), I fall in love right away with its api, so this project it's a collection of animations made with [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/) from design concepts found on [Dribbble](https://dribbble.com/) or real world apps, all by making use of a lot of different animation techniques I've learnt from the great [William Candillon](https://www.youtube.com/c/wcandillon)

## Known Problems

- React native lists components do not support masorny layout
- Due to limited animation support provided by react navigation and the fact it's mostly js
  based, i've decided to use wix's [react native navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/) because of how great shared transitions are and
  of course performance

#### Build with eas

In case you don't have an Android SDK installed in your machine, you can compile a apk of this project in the cloud by using [Expo application services](https://expo.dev/) or just `eas` for short, install the `eas-cli` package

```npm
npm install -g eas-cli@0.38
```

You'll need an [Expo](https://expo.dev/) account aswell in order to build the project, it just takes a couple of seconds and with that done, run:

```
eas build --profile=dev --platform=android
```

This will build the project for you in the cloud, now all you have to do is wait for the link of the project apk.

## Animations

Each and everyone of the following animations have a `README.md` file showcasing screenshots of the animation, video footage and techniques used to build such animation.

- [Pinch to zoom](https://github.com/Glazzes/reanimated2-animations/tree/main/src/PinchToZoom)
- [Grocery app](https://github.com/Glazzes/reanimated2-animations/tree/main/src/GroceryList)
- [Tinder swipe](https://github.com/Glazzes/reanimated2-animations/tree/main/src/Tinder)
- [Rotation color selection](https://github.com/Glazzes/reanimated2-animations/tree/main/src/ColorRotation)
- [Bezier slider](https://github.com/Glazzes/reanimated2-animations/tree/main/src/BezierSlider)
- [Crypto atom](https://github.com/Glazzes/reanimated2-animations/tree/main/src/CryptoAtom)
- [WiThings (health mate)](https://github.com/Glazzes/reanimated2-animations/tree/main/src/HealthMate)
- [Albums](https://github.com/Glazzes/reanimated2-animations/tree/main/src/Albums)
- [Phone call](https://github.com/Glazzes/reanimated2-animations/tree/main/src/PhoneCall)
