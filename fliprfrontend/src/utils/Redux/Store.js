import { configureStore, combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import PodcastSlice from './PodcastSlice';
import PodcastListSlice from './PodcastListSlice';

const rootReducer = combineReducers({
  UserSlice,
  PodcastSlice,
  PodcastListSlice
});

const Store = configureStore({
  reducer: rootReducer,
});



export default Store;
