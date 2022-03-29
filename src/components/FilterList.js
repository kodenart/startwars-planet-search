import React, { useContext } from 'react';
import theContext from '../context/theContext';

export default function FilterList() {
  const { filterByNumericValues,
    setFilterByNum, setPlanets,
    data } = useContext(theContext);

  const anyFilter = filterByNumericValues.length > 0;
  return (

    <>
      <h1>Lista de filtros</h1>
      {anyFilter && (

        <>
          <ul>
            {filterByNumericValues.map((numFilter) => (
              <li
                key={ numFilter.column }
                data-testid="filter"
              >
                {`${numFilter.column} ${numFilter.comparison} ${numFilter.filterValue}`}
                <button
                  type="button"
                  onClick={ () => {
                    const newFilterList = filterByNumericValues
                      .filter((elem) => elem.column !== numFilter.column);
                    setFilterByNum(newFilterList);
                    setPlanets(data.results);
                  } }
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setFilterByNum([]);
              setPlanets(data.results);
            } }
          >
            Remover todas filtragens
          </button>
        </>
      )}
    </>
  );
}
