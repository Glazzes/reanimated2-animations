type Creator = {
  username: string;
  profilePicture: string;
};

export type NFT = {
  createdBy: Creator;
  name: string;
  highestBid: number;
  endingDate: string;
  screenshot: any;
};

const cryptidCreations = {
  username: 'Cryptid-creations',
  profilePicture: 'https://randomuser.me/api/portraits/men/62.jpg',
};

export const nfts: NFT[] = [
  {
    createdBy: cryptidCreations,
    name: 'catcus',
    highestBid: 30,
    endingDate: 'Tomorrow',
    screenshot: require('../assets/one.png'),
  },
  {
    createdBy: cryptidCreations,
    name: 'catcus',
    highestBid: 30,
    endingDate: 'Tomorrow',
    screenshot: require('../assets/two.png'),
  },
  {
    createdBy: cryptidCreations,
    name: 'catcus',
    highestBid: 30,
    endingDate: 'Tomorrow',
    screenshot: require('../assets/three.png'),
  },
];
