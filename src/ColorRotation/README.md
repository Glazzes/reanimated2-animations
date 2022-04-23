## Rotation color selection (Work in progress)

### About

Just afer giving a quick look to reddit i found myself clicking [this post](https://www.reddit.com/r/reactnative/comments/u8oz0g/how_to_create_something_like_this_in_rn/).
I'm quite fascinated how some simply trignometry can deliver such awesome user experiences, so i decided to give it a try!

### Techniques

- Pan gesture
- Some trigonometry

### Observations

- Svg shapes are dynamically generated
- Rotation angles range from `0` to `2Pi` to allow a nice color indicator interpolation
- Circle rotation is calculated by first defining which angle user's first toouch is, by using `x` and `y` values (not `translationX` and `translationY`), this first touch generated angle is considered to be the origin of the rotation, with the "origin" defined, as the user moves their fingers around new angles will be calculated, so the difference between the origin and these new angles it's added to rotation offset, then it's normalized to range from `0` to `2Pi` like this:
  `(offset + (newAngle - origin) + 2Pi) % 2Pi` (as angles ended up being negative that's why i used `+ 2Pi`)
- Android seems to be perform quite badly at rendering huge and multiple svg shapes

### Showcase

https://user-images.githubusercontent.com/52082794/164841212-838c9bff-e94a-4f12-9168-81ef3a65e97c.mp4
