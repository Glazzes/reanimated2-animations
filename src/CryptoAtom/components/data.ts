export type Electron = {
  id: string;
  angle: number;
  image: any;
  bgColor: string;
  size: number;
  delay: number;
};

const TAU = Math.PI * 2;
const s = 30;
const m = 40;
const l = 50;

// Ordered by angle
export const electrons: Electron[] = [
  {
    id: 'litecoin',
    angle: 0,
    image: require('../assets/litecoin.png'),
    size: s,
    bgColor: '#CEDAEE',
    delay: 1200,
  },
  {
    id: 'dogecoin',
    angle: (1 / 8) * TAU,
    image: require('../assets/dogecoin.png'),
    size: m,
    bgColor: '#EBDECF',
    delay: 1000,
  },
  {
    id: 'tether',
    angle: (5 / 16) * TAU,
    image: require('../assets/tether.png'),
    size: l,
    bgColor: '#DFFECC',
    delay: 400,
  },
  {
    id: 'helium',
    angle: Math.PI,
    image: require('../assets/helium.png'),
    size: s,
    bgColor: '#ECE4FF',
    delay: 0,
  },
  {
    id: 'candano',
    angle: (5 / 8) * TAU,
    image: require('../assets/candano.png'),
    size: m,
    bgColor: '#e6e9fc',
    delay: 200,
  },
  {
    id: 'ethereum',
    angle: (13 / 16) * TAU,
    image: require('../assets/ethereum.png'),
    size: l,
    bgColor: '#c6c6c6',
    delay: 800,
  },
];
