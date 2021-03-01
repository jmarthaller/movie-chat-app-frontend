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
import MoviePage from './MoviePage';
import NewMovieForm from './NewMovieForm';


function App() {
  const [moviesState, setMoviesState] = useState([])
  const [reviews, setReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")




  function onUpdateUserInfo(data) {
    const updatedCurrentUser = {
      id: data.id,
      username: data.username,
      avatar: data.avatar,
      reviews: data.reviews
    }
    setCurrentUser(updatedCurrentUser)
  }


  function onAddReview(newReview) {
    setReviews([...reviews, newReview])
  }

  function onUpdateReview(data, formData) {
    const updatedReviews = reviews.map((review) => {
      if (review.id === data.id) {
        return { ...review, content: formData.content }
      } else {
        return review
      }
    })
    setReviews(updatedReviews)
  }

  function onDeleteReview(id) {
    const filteredReviews = reviews.filter(review => review.id !== id)
    setReviews(filteredReviews)
  }


  function handleGenreChange(e) {
    setSelectedGenre(e.target.value)
  }

  

  useEffect(() => {
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/reviews')
    .then(response => response.json())
    .then(data => setReviews(data));
  }, [])


  const updatedMoviesForGenre = moviesState.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase())
  })

  // if (selectedRuntime) {
  //   moviesState.filter((movie) => {
  //     return movie.runtime
  //   })
  // }



 

  return (
    <div className="App">
      <Router>
        <Header currentUser={currentUser} resetCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/signup'>
            <SignUp setCurrentUser={setCurrentUser} />
          </Route>
          <Route path='/login'>
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path='/'>
          {currentUser ? (
          <>
            <Search search={search} setSearch={setSearch} currentUser={currentUser}  />
            <GenreFilter handleGenreChange={handleGenreChange} selectedGenre={selectedGenre}  />
            <RuntimeFilter  />
            <MoviesContainer updatedMoviesForGenre={updatedMoviesForGenre} selectedGenre={selectedGenre}  />
          </>
          )
          :
          <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/profile'>
            {currentUser ? (
              <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} reviews={reviews} setReviews={setReviews} onUpdateReview={onUpdateReview} onDeleteReview={onDeleteReview} onUpdateUserInfo={onUpdateUserInfo}  />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/movies/new'>
            {currentUser ? (
              <NewMovieForm  />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/movies/:id'>
            {currentUser ? (
              <MoviePage currentUser={currentUser} reviews={reviews} onAddReview={onAddReview} />
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
