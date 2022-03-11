export type AlbumData = {
  title: string;
  image: any;
};

export const albums: AlbumData[] = [
  {
    title: 'ChillHop Essentials Fall 2021',
    image: require('../assets/image_01.png'),
  },
  {
    title: 'ChillHop Essentials Spring 2020',
    image: require('../assets/image_02.jpg'),
  },
  {
    title: 'Coding lofi beats',
    image: require('../assets/image_03.jpg'),
  },
  {
    title: 'When the bass drops',
    image: require('../assets/image_04.jpg'),
  },
  {
    title: 'ChilHop Essentials Summer 2021',
    image: require('../assets/image_05.png'),
  },
  {
    title: 'Principalites',
    image: require('../assets/image_06.png'),
  },
];
