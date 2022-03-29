/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import theContext from './theContext';

const Provider = ({ children }) => {
  const [data, setData] = useState();
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [planets, setPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNum] = useState([]);

  const requestData = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchData = await fetch(endpoint).then((response) => response.json());
    setData(fetchData);
    // console.log(fetchData);
  };

  // requesting and setting the data from the API
  useEffect(() => {
    requestData();
  }, []);

  // first setup of planets
  useEffect(() => {
    if (data) {
      setPlanets(data.results);
    }
  }, [data]);

  const filterByColumn = (arr) => {
    filterByNumericValues.forEach((numFilter) => {
      switch (numFilter.comparison) {
      case 'maior que': {
        const newValue = arr
          .filter((planet) => Number(planet[numFilter.column]) > numFilter.filterValue);
        setPlanets(newValue);
        break;
      }
      case 'menor que': {
        const newValue = arr
          .filter((planet) => Number(planet[numFilter.column]) < numFilter.filterValue);
        setPlanets(newValue);
        break;
      }
      case 'igual a': {
        const newValue = arr
          .filter((planet) => Number(planet[numFilter.column]) === numFilter.filterValue);
        setPlanets(newValue);
        break;
      }
      default: break;
      }
    });
  };

  useEffect(() => {
    filterByColumn(planets);
  }, [filterByNumericValues]);

  const contextValue = {
    data,
    filterByName,
    setData,
    setFilterByName,
    planets,
    setPlanets,
    filterByNumericValues,
    setFilterByNum,
  };

  return (
    <theContext.Provider value={ contextValue }>
      { data && children}
    </theContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
