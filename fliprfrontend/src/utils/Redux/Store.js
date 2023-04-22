import {configureStore, combineReducers} from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import PodcastSlice from './PodcastSlice';


const rootReducer = combineReducers({
UserSlice,
  PodcastSlice
});

const Store = configureStore({
  reducer: rootReducer,
});



export default Store;
