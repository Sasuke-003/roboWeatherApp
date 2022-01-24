import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = [];

const slice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    addPlace: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
    },
    replaceExistingPlace: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
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
      console.log(state);
    },
    addFavPlace: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
      state[index].isFav = true;
    },
    replaceExistingPlaceWithIsFav: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
      );
      if (index === -1) {
        state.unshift({...action.payload, isFav: false});
        return;
      }
      state[index] = {
        ...action.payload,
        recentlySearched: state[index].recentlySearched,
      };
      console.log(state);
    },

    deleteFavPlace: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload,
      );
      if (state[index].recentlySearched === true) {
        state[index].isFav = false;
        return;
      }
      state.splice(index, 1);
    },
    addRecentlySearched: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
      );
      if (index === -1) {
        state.unshift(action.payload);
        return;
      }
      state[index].recentlySearched = true;
    },
    replaceExistingPlaceWithRecentlySearched: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload.placeName,
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
    deleteRecentlySearched: (state, action) => {
      const index = state.findIndex(
        place => place.placeName === action.payload,
      );
      if (state[index].isFav === true) {
        state[index].recentlySearched = false;
        return;
      }
      state.splice(index, 1);
    },
  },
});

export default slice.reducer;

// Actions

export const {
  addPlace,
  replaceExistingPlace,
  addFavPlace,
  replaceExistingPlaceWithIsFav,
  deleteFavPlace,
  addRecentlySearched,
  replaceExistingPlaceWithRecentlySearched,
  deleteRecentlySearched,
} = slice.actions;

export const checkIsFavPlace = (state, placeName) => {
  const places = state.placeReducer;
  return places.findIndex(
    place => place.placeName === placeName && place.isFav,
  ) === -1
    ? false
    : true;
};

export const getFavPlaces = state =>
  state.placeReducer.filter(place => place.isFav);

export const getRecentlySearchedPlaces = state =>
  state.placeReducer.filter(place => place.recentlySearched);

export const getAllPlaces = state => state.placeReducer;
