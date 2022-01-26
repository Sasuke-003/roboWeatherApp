import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = [];

const slice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentPlace: (state, action) => {
      state.pop();
      state.unshift(action.payload);
    },
    deleteCurrentPlace: (state, action) => {
      if (state.length === 1) state.pop();
    },
  },
});

export default slice.reducer;

// Actions

export const {setCurrentPlace, deleteCurrentPlace} = slice.actions;

export const getCurrentPlace = state => state.currentPlaceReducer;
