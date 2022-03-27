import React from 'react';
import './App.css';
// import Table from './components/Table';
// import Filter from './components/Filter';
import Provider from './context/Provider';
import Home from './pages/Home';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
