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
  },
});

export default slice.reducer;

// Actions

export const {setCurrentPlace} = slice.actions;

export const getCurrentPlace = state => state.currentPlaceReducer;
