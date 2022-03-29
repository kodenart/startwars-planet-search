/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import theContext from '../context/theContext';

const Filter = () => {
  // Search input

  const { setFilterByName,
    filterByNumericValues,
    setFilterByNum } = useContext(theContext);

  const [nameInput, setNameInput] = useState('');
  useEffect(() => setFilterByName({ name: nameInput }), [nameInput, setFilterByName]);

  // Filter select
  const DEFAULT_OPTIONS = {
    column: 'population',
    comparison: 'maior que',
    filterValue: 0,
  };
  const [selectOptions, setSelectOptions] = useState(DEFAULT_OPTIONS);

  const { column, comparison, filterValue } = selectOptions;

  // initial values to populate the options
  const initialColumns = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const columnsChosen = filterByNumericValues.map((chosen) => chosen.column);
  const possibleColumns = initialColumns.filter((item) => !columnsChosen.includes(item));

  // useEffect(() => {
  //   setSelectOptions({ ...DEFAULT_OPTIONS, column: possibleColumns[0] });
  // }, [filterByNumericValues]);
  // when a new filter is added, this should update the select as intended

  return (
    <>

      <input
        data-testid="name-filter"
        type="text"
        value={ nameInput }
        onChange={ ({ target }) => setNameInput(target.value) }
      />

      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setSelectOptions({
          ...selectOptions,
          column: target.value,
        }) }
      >
        {possibleColumns.map((selOp) => (
          <option key={ selOp } value={ selOp }>{selOp}</option>))}
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setSelectOptions({
          ...selectOptions,
          comparison: target.value,
        }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        value={ filterValue }
        data-testid="value-filter"
        onChange={ ({ target }) => setSelectOptions({
          ...selectOptions,
          filterValue: Number(target.value),
        }) }
      />

      <button
        disabled={ selectOptions.column === undefined }
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilterByNum([
            ...filterByNumericValues,
            selectOptions,
          ]);
          const newColumn = possibleColumns
            .filter((item) => item !== selectOptions.column);
          setSelectOptions({ ...DEFAULT_OPTIONS, column: newColumn[0] });
        } }
      >
        Filtrar
      </button>
    </>
  );
};

export default Filter;
