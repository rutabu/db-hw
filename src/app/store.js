import { configureStore } from '@reduxjs/toolkit';
import creditReducer from '../components/credit/credit.slice';

export default configureStore({
  reducer: {
    credit: creditReducer,
  },
});
