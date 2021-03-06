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
import OtherUsersProfilePage from './OtherUsersProfilePage';


function App() {
  const [moviesState, setMoviesState] = useState([])
  const [reviews, setReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedRuntime, setSelectedRuntime] = useState(null)
  const [friendshipsState, setFriendshipsState] = useState([])


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


  function onAddNewFollow(newFollow) {
    setFriendshipsState([...friendshipsState, newFollow])
  }


  function onAddMovieToList(newMovieToAdd) {
    setMoviesState([...moviesState, newMovieToAdd])
  }


  function onUpdateReview(data, formData) {
    const updatedReviews = reviews.map((review) => {
      if (review.id === data.id) {
        return { ...review, content: formData.content, personal_rating: formData.personal_rating }
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


  function onDeleteFriendship(id) {
    const filteredFriendships = friendshipsState.filter(relationship => relationship.id !== id)
    setFriendshipsState(filteredFriendships)
  }


  function handleGenreChange(e) {
    setSelectedGenre(e.target.value)
  }


  function handleRuntimeChange(e) {
    setSelectedRuntime(e.target.value)
  }


  useEffect(() => {
    const fetchMoviesOnLaunch = async () => {
      const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/movies`);
      const jsonify = await response.json();
      setMoviesState(jsonify);
    }
    fetchMoviesOnLaunch();
  }, [])

  useEffect(() => {
    const fetchReviewsOnLaunch = async () => {
      const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/reviews`);
      const jsonify = await response.json();
      setReviews(jsonify);
    }
    fetchReviewsOnLaunch();
  }, [])

  useEffect(() => {
    const fetchFriendshipsOnLaunch = async () => {
      const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/friendships`);
      const jsonify = await response.json();
      setFriendshipsState(jsonify);
    }
    fetchFriendshipsOnLaunch();
  }, [])


  const updatedMoviesForGenre = moviesState.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase())
  })


  const updatedMoviesForTime = moviesState.filter((movie) => {
    if (selectedRuntime === 'short') {
      return movie.runtime < 90 && movie.title.toLowerCase().includes(search.toLowerCase())
    } else if (selectedRuntime === 'medium') {
      return movie.runtime > 90 && movie.runtime < 100 && movie.title.toLowerCase().includes(search.toLowerCase())
    } else if (selectedRuntime === 'mediumish') {
      return movie.runtime > 100 && movie.runtime < 120 && movie.title.toLowerCase().includes(search.toLowerCase())
    } else if (selectedRuntime === 'long') {
      return movie.runtime > 120 && movie.title.toLowerCase().includes(search.toLowerCase())
    } else {
      return movie
    }
  })

 
  return (
    <div className="app">
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
            <RuntimeFilter handleRuntimeChange={handleRuntimeChange} />
            <MoviesContainer setSearch={setSearch} updatedMoviesForGenre={updatedMoviesForGenre} selectedGenre={selectedGenre} updatedMoviesForTime={updatedMoviesForTime} selectedRuntime={selectedRuntime} search={search}  />
          </>
          )
          :
          <div className="login-or-signup-prompt">
            <img className="logsignp" src="https://media1.giphy.com/media/l0ErRtQDgjMtQcjsI/200.gif" alt="=giffie" /> 
            <h3>Write Movie Reviews and Share Them with Friends</h3>
            <h3>Please Login or Signup</h3>
          </div>
          }
          </Route>
          <Route path='/profile'>
            {currentUser ? (
              <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} reviews={reviews} setReviews={setReviews} onUpdateReview={onUpdateReview} onDeleteReview={onDeleteReview} onUpdateUserInfo={onUpdateUserInfo} friendshipsState={friendshipsState}  />
            )
            :
            <div className="login-or-signup-prompt">
            <img className="logsignp" src="https://media1.giphy.com/media/l0ErRtQDgjMtQcjsI/200.gif" alt="=giffie" /> 
            <h3>Write Movie Reviews and Share Them with Friends</h3>
            <h3>Please Login or Signup</h3>
            </div>
          }
          </Route>
          <Route path='/movies/new'>
            {currentUser ? (
              <NewMovieForm onAddMovieToList={onAddMovieToList} />
            )
            :
            <div className="login-or-signup-prompt">
            <img className="logsignp" src="https://media1.giphy.com/media/l0ErRtQDgjMtQcjsI/200.gif" alt="=giffie" /> 
            <h3>Write Movie Reviews and Share Them with Friends</h3>
            <h3>Please Login or Signup</h3>
          </div>
          }
          </Route>
          <Route path='/movies/:id'>
            {currentUser ? (
              <MoviePage setReviews={setReviews} currentUser={currentUser} reviews={reviews} onAddReview={onAddReview} onAddNewFollow={onAddNewFollow} />
            )
            :
            <div className="login-or-signup-prompt">
            <img className="logsignp" src="https://media1.giphy.com/media/l0ErRtQDgjMtQcjsI/200.gif" alt="=giffie" /> 
            <h3>Write Movie Reviews and Share Them with Friends</h3>
            <h3>Please Login or Signup</h3>
          </div>
          }
          </Route>
          <Route path='/users/:id'>
            {currentUser ? (
              <OtherUsersProfilePage onDeleteFriendship={onDeleteFriendship} />
            )
            :
            <div className="login-or-signup-prompt">
            <img className="logsignp" src="https://media1.giphy.com/media/l0ErRtQDgjMtQcjsI/200.gif" alt="=giffie" /> 
            <h3>Write Movie Reviews and Share Them with Friends</h3>
            <h3>Please Login or Signup</h3>
          </div>
          }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
