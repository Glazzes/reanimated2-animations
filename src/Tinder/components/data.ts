export type User = {
  name: string;
  profilePicture: any;
  age: number;
  proffession: string;
};

export const users: User[] = [
  {
    name: 'Sara',
    profilePicture: require('../assets/one.jpg'),
    age: 22,
    proffession: 'Digital artist',
  },
  {
    name: 'Laura',
    profilePicture: require('../assets/two.jpg'),
    age: 25,
    proffession: 'Nurse',
  },
  {
    name: 'Angie',
    profilePicture: require('../assets/three.jpg'),
    age: 24,
    proffession: 'Graphic designer',
  },
  {
    name: 'Sophia',
    profilePicture: require('../assets/four.jpg'),
    age: 27,
    proffession: 'Photograph',
  },
  {
    name: 'Mia',
    profilePicture: require('../assets/five.jpg'),
    age: 30,
    proffession: 'Human resources',
  },
];
