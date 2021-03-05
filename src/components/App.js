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
    fetch('http://localhost:3001/movies')
    .then(response => response.json())
    .then(data => setMoviesState(data));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/reviews')
    .then(response => response.json())
    .then(data => setReviews(data));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/friendships')
    .then(response => response.json())
    .then(data => {
      setFriendshipsState(data)
    });
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

  // function onUpdateLikes(likedReview) {
  //   console.log(likedReview)
  //   const updatedReviewForLikes = reviews.map((review) => {
  //     if (review.id === likedReview.id) {
  //       return { ...review, likes: likedReview.likes }
  //     } else {
  //       return review
  //     }
  //   })
  //   setReviews(updatedReviewForLikes)
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
            <RuntimeFilter handleRuntimeChange={handleRuntimeChange} />
            <MoviesContainer updatedMoviesForGenre={updatedMoviesForGenre} selectedGenre={selectedGenre} updatedMoviesForTime={updatedMoviesForTime} selectedRuntime={selectedRuntime} search={search}  />
          </>
          )
          :
          <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/profile'>
            {currentUser ? (
              <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} reviews={reviews} setReviews={setReviews} onUpdateReview={onUpdateReview} onDeleteReview={onDeleteReview} onUpdateUserInfo={onUpdateUserInfo} friendshipsState={friendshipsState}  />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/movies/new'>
            {currentUser ? (
              <NewMovieForm onAddMovieToList={onAddMovieToList} />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/movies/:id'>
            {currentUser ? (
              <MoviePage setReviews={setReviews} currentUser={currentUser} reviews={reviews} onAddReview={onAddReview} onAddNewFollow={onAddNewFollow} />
            )
            :
            <h1>Please Login or Signup</h1>
          }
          </Route>
          <Route path='/users/:id'>
            {currentUser ? (
              <OtherUsersProfilePage onDeleteFriendship={onDeleteFriendship} />
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
