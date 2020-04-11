import React from 'react';
import HomePage from '../HomePage/HomePage'
import LoginPage from '../LoginPage/LoginPage'
import './App.css';
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} render={() => 
        <HomePage />
      }/>
      <Route exact path={"/login"} render={() => 
        <LoginPage />
      }
      />
    </div>
  );
}

export default App;
