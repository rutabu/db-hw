import { Store } from '../../app/store'

export const selectIsFetching = (state: Store) => state.credit.isFetching;
export const selectHasError = (state: Store) => state.credit.hasError;
export const selectFetchedData = (state: Store) => state.credit.fetchedData;
