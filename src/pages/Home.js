import React, { useContext, useEffect } from 'react';
import Filter from '../components/Filter';
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
  }, [name, results, setPlanets]);

  return (
    <>
      <Filter />
      <Table />
    </>
  );
};

export default Home;
