## Crypto Orbiter

### About
This is a simple onboarding page based in this interesting [dribble shot](https://dribbble.com/shots/16394865-Tradlr-Onboarding-Animation).

### Observations
- Animated components that take styles provided by the hook `useAnimatedStyle` can not have layout animations,therefore they must be wrapped into an animated component that will that will
handle the layout animation for them instead.

### Techniques
- Svg for the ellipsis
- Basic trigonometry for the elliptic movement pattern
- Composed higher order animations provided by awesome reanimated 2
- Layout animations provided by react native reaniamted 2 aswell

### Showcase
[<img style="float: left; margin-right: 10px" width="250px" src="./assets/md/one.png" alt="Untouched slider">]("")
<img style="float: left; margin-right: 10px" width="250px" src="./assets/md/two.png" alt="Touched slider">

https://user-images.githubusercontent.com/52082794/156941577-3bbf9fc7-9141-46e5-b082-0e47f045f3e9.mp4