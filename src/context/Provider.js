import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import theContext from './theContext';

const Provider = ({ children }) => {
  const [data, setData] = useState();
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [planets, setPlanets] = useState([]);

  const requestData = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchData = await fetch(endpoint).then((response) => response.json());
    setData(fetchData);
    // console.log(fetchData);
  };

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (data) {
      setPlanets(data.results);
    }
  }, [data]);

  const contextValue = {
    data,
    filterByName,
    setData,
    setFilterByName,
    planets,
    setPlanets,
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
