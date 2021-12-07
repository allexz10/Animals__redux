import { configureStore } from '@reduxjs/toolkit';
import animalSlice from '../counter/animalSlice';

const store = configureStore({
  reducer: {
    animals: animalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
