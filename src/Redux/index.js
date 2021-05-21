import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import userDataReducer from './reducers/userDataReducer'

const persistConfig = {
  key: 'userDataSodrink',
  storage: AsyncStorage,

};

const rootReducer = persistReducer(persistConfig, userDataReducer)

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);