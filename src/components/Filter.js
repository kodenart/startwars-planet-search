import React, { useContext, useEffect, useState } from 'react';
import theContext from '../context/theContext';

const Filter = () => {
  const { setFilterByName } = useContext(theContext);
  const [nameInput, setNameInput] = useState('');
  useEffect(() => setFilterByName({ name: nameInput }), [nameInput, setFilterByName]);

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ nameInput }
      onChange={ ({ target }) => setNameInput(target.value) }
    />
  );
};

export default Filter;
