import create from 'zustand';
import {Fruit} from '../utils/data';

type GroceryStore = {
  cartFruits: Fruit[];
};

export const groceryStore = create<GroceryStore>(set => ({
  cartFruits: [],
}));
