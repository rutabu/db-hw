import { createSlice } from '@reduxjs/toolkit';
import { fetchCreditData } from './functions';

export const creditSlice = createSlice({
  name: 'credit',
  initialState: {
    isFetching: false,
    hasError: false,
    fetchedData: undefined,
  },
  reducers: {
    setFetchedData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.fetchedData = action.payload;
    },
    setIsFetching: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isFetching = action.payload;
    },
    setHasError: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    resetFetchedData: (state) => {
      // eslint-disable-next-line no-param-reassign
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

export const fetchData = (personId) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const fetchedData = await fetchCreditData(personId);
  dispatch(setFetchedData(fetchedData));
  dispatch(setIsFetching(false));
  dispatch(setHasError(!fetchedData));
};

export default creditSlice.reducer;
