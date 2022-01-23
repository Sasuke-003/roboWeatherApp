import {configureStore} from '@reduxjs/toolkit';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import placeReducer from './reducers/placeReducer';
import currentPlaceReducer from './reducers/currentPlaceReducer';

import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
  placeReducer,
  currentPlaceReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['currentPlaceReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
