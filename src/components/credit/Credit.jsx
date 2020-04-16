import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../Form';
import { fetchData } from './credit.slice';
import { selectHasError, selectIsFetching, selectFetchedData } from './credit.selectors';
import { calculateValue } from './functions';

const Credit = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const hasError = useSelector(selectHasError);
  const fetchedData = useSelector(selectFetchedData);
  const onPersonIdSubmitHandler = (personId) => {
    dispatch(fetchData(personId));
  };

  return (
    <div>
      <Form onPersonIdSubmit={onPersonIdSubmitHandler} />
      {isFetching && '...fetching data'}
      {hasError && (
      <div>
        Sorry, error occurred while fetching the data.
        <br />
        Please try again.
      </div>
      )}
      {!hasError && fetchedData && (
        <div>
          Client:
          {fetchedData.person.name}
          {' '}
          {fetchedData.person.lastName}
          <br />
          Affordability range:
          {' '}
          {fetchedData.affordability.min}
          {' '}
          -
          {' '}
          {fetchedData.affordability.max}
          <br />
          Calculated value:
          {' '}
          {calculateValue(fetchedData)}
        </div>
      )}
    </div>
  );
};

export default Credit;
