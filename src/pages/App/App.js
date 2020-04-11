import React from 'react';
import HomePage from '../HomePage/HomePage'
import './App.css';
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} render={() => 
        <HomePage />
      }/>
    </div>
  );
}

export default App;
