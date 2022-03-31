## Pinch to zoom

### About
Pinch to zoom feature it's a must have user interaction for every single app that pretends to display images to users, although it's a very intuitive interaction for a user how to get this to work it's more complicated that it seems.

This small project is an enhnaced "translation" of [William candillon's](https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/the-10-min/src/PinchGesture/PinchGesture.tsx) pinch to zoom as it was origanlly written in reanimated 1 and gesture handler 1.

### Observations
Williams candillon implemnetation only comes with pinch to zoom and offset other capabilities have been added by myself taking telegram images as inspiration.


### Additions
- Pan: the ability to drag the image around while keeping it within screen boundaries
- Double tap: on double tap it counts as a pinch to zoom for +1 scale
-  Single tap: this is useful for stuff like hiding elements from the screen

### Techniques
- Tap gesture
- Pinch gesture
- Pan gesture