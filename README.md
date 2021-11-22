## Reanimated 2 animations

### About
Since the first release candidate of [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/) in late 2020 it has been a change gamer the way we create animations today with [React native](https://reactnative.dev/), I fall in love right away with its api, so this project it's a collection of animations made with [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/) from design concepts found on [Dribbble](https://dribbble.com/) or real world apps, all by making use of a lot of different animation techniques I've learnt from the great [William Candillon](https://www.youtube.com/c/wcandillon)

## Known Problems
- React native lists components do not support masorny layout
- Shared element transitions with React navigation are very limited, therefore a native navigation library is prefered due to its perfomance and ability to customize transitions
- Resuming previous point, [wix/react-native-navigation](https://github.com/wix/react-native-navigation)'s installation process conflicts with the expo package, so custom development clients are not an option, react-native-unimodules are the way to go for now

## Animations
[Grocery app animation](https://github.com/Glazzes/reanimated2-animations/tree/main/src/GroceryList)