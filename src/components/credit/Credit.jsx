import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Form from '../Form';
import { fetchData, resetFetchedData } from './credit.slice';
import { selectHasError, selectIsFetching, selectFetchedData } from './credit.selectors';
import CreditDialog from './CreditDialog';

const Credit = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const hasError = useSelector(selectHasError);
  const fetchedData = useSelector(selectFetchedData);

  const onPersonIdSubmitHandler = (personId) => {
    dispatch(fetchData(personId));
  };

  const onDialogCloseHandler = () => {
    dispatch(resetFetchedData());
  };

  return (
    <>
      <Form onPersonIdSubmit={onPersonIdSubmitHandler} isFetching={isFetching} />
      {isFetching && (
        <Backdrop open>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {hasError && (
        <Alert
          variant="filled"
          severity="error"
          style={{
            position: 'absolute',
            top: 20,
          }}
        >
          Sorry, error occurred while fetching the data.
          <br />
          Please try again.
        </Alert>
      )}
      {!hasError && fetchedData && (
        <CreditDialog fetchedData={fetchedData} onCloseHandler={onDialogCloseHandler} />
      )}
    </>
  );
};

export default Credit;
