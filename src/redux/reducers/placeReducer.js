import {createSlice} from '@reduxjs/toolkit';
import {SectionList} from 'react-native';
import {utils} from '../../utils';

// Slice

const initialState = [];

const slice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    /////////////////////////////////PLACE///////////////////////////////////////
    addPlace: (state, action) => {
      const deleteIndices = [];
      state.forEach(
        place =>
          !place.isFav &&
          !place.recentlySearched &&
          utils.isDataExpired(place.createdAt),
      );
      deleteIndices.forEach(index => state.splice(index, 1)); // delete all unwanted data
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
    },
    replaceExistingPlace: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift({...action.payload, isFav: false});
        return;
      }
      state[index] = {
        ...action.payload,
        isFav: state[index].isFav,
        recentlySearched: state[index].recentlySearched,
      };
    },
    replaceMultipleExistingPlaces: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const index = state.findIndex(
          place =>
            utils.convertLatinToEng(place.placeName).toUpperCase() ===
            utils.convertLatinToEng(action.payload[i].placeName).toUpperCase(),
        );
        if (index === -1) {
          state.unshift({
            ...action.payload[i],
            isFav: false,
            recentlySearched: false,
          });
          return;
        }
        state[index] = {
          ...action.payload[i],
          isFav: state[index].isFav,
          recentlySearched: state[index].recentlySearched,
        };
      }
    },
    /////////////////////////////////FAVOURITE///////////////////////////////////////
    addFavPlace: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
      state[index].isFav = true;
    },
    replaceExistingPlaceWithIsFav: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift({...action.payload, isFav: false});
        return;
      }
      state[index] = {
        ...action.payload,
        recentlySearched: state[index].recentlySearched,
      };
    },

    deleteFavPlace: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload).toUpperCase(),
      );
      if (
        state[index].recentlySearched ||
        !utils.isDataExpired(state[index].createdAt)
      ) {
        state[index].isFav = false;
        return;
      }
      state.splice(index, 1);
    },
    deleteAllFavPlaces: (state, action) => {
      const deleteIndices = [];
      for (let i = 0; i < state.length; i++) {
        if (
          !state[i].recentlySearched &&
          utils.isDataExpired(state[i].createdAt)
        ) {
          deleteIndices.push(i);
        }
        state[i].isFav = false;
      }
      deleteIndices.forEach(index => state.splice(index, 1));
    },
    /////////////////////////////////RECENTLY SEARCHED///////////////////////////////////////
    addRecentlySearched: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
      state[index].recentlySearched = true;
      console.log(state);
    },
    replaceExistingPlaceWithRecentlySearched: (state, action) => {
      const index = state.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(action.payload.placeName).toUpperCase(),
      );
      if (index === -1) {
        state.unshift({...action.payload, isFav: false});
        return;
      }
      state[index] = {
        ...action.payload,
        isFav: state[index].isFav,
      };
    },
    deleteAllRecentlySearchedPlaces: (state, action) => {
      const deleteIndices = [];
      for (let i = 0; i < state.length; i++) {
        if (!state[i].isFav && utils.isDataExpired(state[i].createdAt)) {
          deleteIndices.push(i);
        }
        state[i].recentlySearched = false;
      }
      deleteIndices.forEach(index => state.splice(index, 1));
    },
  },
});

export default slice.reducer;

// Actions

export const {
  addPlace,
  replaceExistingPlace,
  replaceMultipleExistingPlaces,
  addFavPlace,
  replaceExistingPlaceWithIsFav,
  deleteFavPlace,
  deleteAllFavPlaces,
  addRecentlySearched,
  replaceExistingPlaceWithRecentlySearched,
  deleteAllRecentlySearchedPlaces,
} = slice.actions;

export const checkIsFavPlace = (state, placeName) => {
  const places = state.placeReducer;
  return places.findIndex(
    place => place.placeName === placeName && place.isFav,
  ) === -1
    ? false
    : true;
};

export const getFavPlaces = state => {
  console.log('updated');
  return state.placeReducer.filter(place => place.isFav);
};

export const getRecentlySearchedPlaces = state =>
  state.placeReducer.filter(place => place.recentlySearched);

export const getAllPlaces = state => state.placeReducer;
