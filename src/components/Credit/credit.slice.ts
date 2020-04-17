import { createSlice } from '@reduxjs/toolkit';
import { fetchCreditData } from './functions';
import { Dispatch } from 'redux';

export const creditSlice = createSlice({
  name: 'credit',
  initialState: {
    isFetching: false,
    hasError: false,
    fetchedData: undefined,
  },
  reducers: {
    setFetchedData: (state, action) => {
      state.fetchedData = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    resetFetchedData: (state) => {
      state.fetchedData = undefined;
    },
  },
});

export const {
  setFetchedData,
  setIsFetching,
  setHasError,
  resetFetchedData,
} = creditSlice.actions;

export const fetchData = (personId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsFetching(true));

    try {
      const fetchedData = await fetchCreditData(personId);
      dispatch(setFetchedData(fetchedData));
      dispatch(setHasError(false));
    } catch(err) {
      dispatch(setHasError(true));
    }

    dispatch(setIsFetching(false))
  }
};

export default creditSlice.reducer;
