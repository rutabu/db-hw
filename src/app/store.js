import { configureStore } from '@reduxjs/toolkit';
import creditReducer from '../components/Credit/credit.slice';

export default configureStore({
  reducer: {
    credit: creditReducer,
  },
});
