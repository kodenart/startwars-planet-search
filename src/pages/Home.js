/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Filter from '../components/Filter';
import FilterList from '../components/FilterList';
import Table from '../components/Table';
import theContext from '../context/theContext';

const Home = () => {
  const {
    data: { results },
    filterByName: { name },
    setPlanets,
  } = useContext(theContext);

  useEffect(() => {
    const regex = new RegExp(name, 'i');
    const newPlanets = results.filter((planet) => regex.test(planet.name));
    setPlanets(newPlanets);
  }, [name]);

  return (
    <>
      <Filter />
      <FilterList />
      <Table />
    </>
  );
};

export default Home;
