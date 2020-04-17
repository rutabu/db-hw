import React, { FC, FormEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core';

interface FormProps {
  onPersonIdSubmit: (personId: string) => void,
  isFetching: boolean,
}

const Form: FC<FormProps> = ({ onPersonIdSubmit, isFetching }) => {
  const [isValidPersonId, setIsValidPersonId] = useState(false);
  const [personId, setPersonId] = useState('');

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (isValidPersonId) {
      onPersonIdSubmit(personId);
    }
  };

  const validatePersonId = (value: string) => {
    if (/^[a-zA-Z]{1,10}$/.test(value)) {
      setIsValidPersonId(true);
      setPersonId(value);
    } else {
      setIsValidPersonId(false);
      setPersonId('');
    }
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <TextField
        onChange={(event) => validatePersonId(event.target.value)}
        fullWidth
        error={!isValidPersonId}
        variant="outlined"
        color="primary"
        size="small"
        type="text"
        name="personId"
        label="Person identifier"
      />
      <Button
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValidPersonId || isFetching}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
