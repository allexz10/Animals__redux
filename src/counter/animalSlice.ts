/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Animal = {
  name: {
    [key: string]: string;
  },
  imgSrc: string;
  specie: string
  id:number
};

const getAnimalList = () => {
  const saved = localStorage.getItem('Animals') || '';
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

const initialState: Animal[] = getAnimalList();

export const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addNewAnimal: (state, { payload }: PayloadAction<Animal>) => {
      state.push(payload);
    },
    clearAnimals: (state) => {
      state.length = 0;
    },
    deleteItem: (state, action) => state.filter((item) => item.id !== action.payload),
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewAnimal, clearAnimals, deleteItem,
} = animalSlice.actions;

export default animalSlice.reducer;
