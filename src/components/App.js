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
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])



  return (
    <div className="App">
      <Router>
        <Header currentUser={currentUser} resetCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path='/'>
          {currentUser ? (
          <>
            <Search />
            <GenreFilter />
            <RuntimeFilter />
            <MoviesContainer moviesState={moviesState} />
          </>
          )
          :
          <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/profile'>
            {currentUser ? (
              <UserProfile currentUser={currentUser} />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
