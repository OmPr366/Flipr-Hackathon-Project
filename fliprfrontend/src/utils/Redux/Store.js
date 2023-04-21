import {configureStore, combineReducers} from '@reduxjs/toolkit';
import UserSlice from './UserSlice';


const rootReducer = combineReducers({
UserSlice,
  
});

const Store = configureStore({
  reducer: rootReducer,
});



export default Store;
