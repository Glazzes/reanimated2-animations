export type Fruit = {
  name: string;
  price: number;
  image: any;
  weight: string;
};

export type CartFruit = {
  quantity: number;
  fruit: Fruit;
};
