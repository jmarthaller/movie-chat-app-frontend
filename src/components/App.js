// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import UserProfile from './UserProfile';
import RuntimeFilter from "./RuntimeFilter.js";
import GenreFilter from "./GenreFilter.js";
import MoviesContainer from "./MoviesContainer";
import Search from "./Search";
import Login from './Login';
import SignUp from './SignUp';


function App() {
  const [moviesState, setMoviesState] = useState([])
  // const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])

  // console.log(moviesState)


  return (
    <div className="App">
      {/* <h1>Hello</h1> */}
      <Router>
        <Header />
        <Switch>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route exact path='/'>
            <Search />
            <GenreFilter />
            <RuntimeFilter />
            <MoviesContainer moviesState={moviesState} />
          </Route>
          <Route path='/profile'>
            <UserProfile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
