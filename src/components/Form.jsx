import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Form = ({ onPersonIdSubmit }) => {
  const personIdRef = useRef(null);
  const [isValidPersonId, setIsValidPersonId] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (isValidPersonId) {
      onPersonIdSubmit(personIdRef.current.value);
    }
  };

  const validatePersonId = () => {
    const personId = personIdRef.current.value;

    if (/^[a-zA-Z]{1,10}$/.test(personId)) {
      setIsValidPersonId(true);
    } else {
      setIsValidPersonId(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>Person identificator:</div>
      <input ref={personIdRef} placeholder="Please enter value" onChange={validatePersonId} />
      <button type="submit">
        Submit -
        {isValidPersonId ? 'valid' : 'not valid'}
      </button>
    </form>
  );
};

Form.propTypes = {
  onPersonIdSubmit: PropTypes.func.isRequired,
};

export default Form;
