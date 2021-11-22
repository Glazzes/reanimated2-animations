import create from 'zustand';
import {CartFruit} from '../utils/types';

type GroceryStore = {
  cartFruits: CartFruit[];
  addFruit: (fruit: CartFruit) => void;
};

export const useGroceryStore = create<GroceryStore>(set => ({
  cartFruits: [],
  addFruit: (cartFruit: CartFruit) =>
    set(state => {
      let exists = false;
      for (let f of state.cartFruits) {
        if (f.fruit.name === cartFruit.fruit.name) {
          exists = true;
          break;
        }
      }

      if (exists) {
        const newFruits = state.cartFruits.map(f => {
          if (f.fruit.name === cartFruit.fruit.name) {
            return {...f, quantity: f.quantity + cartFruit.quantity};
          }

          return f;
        });

        return {...state, cartFruits: newFruits};
      } else {
        return {...state, cartFruits: [...state.cartFruits, cartFruit]};
      }
    }),
}));
