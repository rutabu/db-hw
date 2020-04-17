import { configureStore } from '@reduxjs/toolkit';
import creditReducer from '../components/Credit/credit.slice';

export default configureStore({
  reducer: {
    credit: creditReducer,
  },
});

export interface Store {
  credit: CreditStore,
}

export interface CreditStore {
  isFetching: boolean,
  hasError: boolean,
  fetchedData?: CreditFetchedData,
}

export interface CreditFetchedData {
  person: Person,
  affordability: Affordability,
  exposure: Exposure,
}

export interface Person {
  name: string,
  lastName: string,
}

export interface Affordability {
  min: number,
  max: number,
}

export interface Exposure {
  id: number,
  values: number[],
}
