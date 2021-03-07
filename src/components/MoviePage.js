import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";


function MoviePage({ currentUser, onAddReview, reviews, onAddNewFollow, setReviews }) {
    const [newContent, setNewContent] = useState("")
    const [newRating, setNewRating] = useState(null)
    const [movieToDisplay, setMovieToDisplay] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieReviews, setMovieReviews] = useState(null)
    const [canLeaveReview, setCanLeaveReview] = useState(false)
    // const [test, setTest] = useState(false)

    function handleCanLeaveReview() {
        setCanLeaveReview(!canLeaveReview)
        console.log(canLeaveReview)
    }

    const { id } = useParams();

    const  history = useHistory()


    function handleRatingChange(e) {
        setNewRating(e.target.value)
    }


    function handleLike(reviewObj){
        const updateObj = {
            likes: reviewObj.likes + 1
        };
          fetch(`http://localhost:3001/reviews/${reviewObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
          })
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            });
    }
    



    useEffect(() => {
        fetch(`http://localhost:3001/movies/${id}`)
          .then((r) => r.json())
          .then((movie) => {
            setMovieToDisplay(movie);
            setMovieReviews(movie.reviews)
            setIsLoaded(true);
          });
      }, [id]);


    if (!isLoaded) return <h2>Loading...</h2>;


    const { title, image, genre, runtime, tagline, release_year, overview } = movieToDisplay;

    function handleSubmitReview(e) {
        e.preventDefault();

        const newReview = {
            user_id: currentUser.id,
            movie_id: id,
            personal_rating: parseInt(newRating),
            content: newContent,
            author: currentUser.username,
            authorImage: currentUser.avatar,
            movieTitle: title,
            movieImage: image,
            likes: 0
        }

        fetch('http://localhost:3001/reviews', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
        .then((r) => r.json())
        .then(data => {
            onAddReview(data)
            history.push("/profile");
        })
        e.target.reset()
    }


    function handleFollowOtherUser(userToFollow) {
        const newFollowerRelationship = {
            follower_id: currentUser.id,
            followee_id: userToFollow.id,
            followee_username: userToFollow.username,
            followee_avatar: userToFollow.avatar
        }

        fetch('http://localhost:3001/friendships', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollowerRelationship)
        })
        .then((r) => r.json())
        .then(data => {
            onAddNewFollow(data)
            history.push("/profile");
        })
    }

    
    const allReviews = movieReviews.map((review) => {
        return (
            <div style={{border: "1px solid black"}} key={review.id} className="movie-reviews">
                <h3>Review By: {review.author}</h3>
                <p>{review.content}</p>
                <img style={{height: "25px"}} src={review.author_image} alt="author-logo" ></img>
                <button onClick={(e) => handleFollowOtherUser(review.author_object)}>Follow User</button>
                <button onClick={(e) => handleLike(review)} className="like-button">❤️ Like Review</button>
                <p>{review.likes} likes</p>
            </div>
        )
    })


    
    return (
        <div className="movie-show-page">
            
            <div className="movie-show-details">
                <img className="movie-show-image" src={image} alt={id}></img>
                <h1 className="movie-show-title">{title}</h1>
                <h4 className="movie-show-year">{release_year}</h4>
                <h3 className="movie-show-genre">{genre}</h3>
                <h3 className="movie-show-runtime">Runtime: {runtime} minutes</h3>
                <p className="movie-show-overview">{overview}</p>
                <h4 className="movie-show-tagline">{tagline}</h4>
            </div>
            <button onClick={handleCanLeaveReview} id="myBtn">Leave Review</button>
            {canLeaveReview ?
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={handleCanLeaveReview}>&times;</span>
                    <h2>Leave A Review Here</h2>
                </div>    
                <div className="modal-body">
                        <form className="new-review-form" onSubmit={handleSubmitReview}>
                            <textarea className="review-text" name="review" value={newContent} onChange={(e) => setNewContent(e.target.value)}  placeholder="Add a review..." ></textarea>
                            <select className="review-star-rating" onChange={handleRatingChange}>
                                <option value=''>RATING</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <input type="submit" className="submit-review-btn" value="Submit" />
                        </form>
                </div>
            </div>
            :
            <div></div>
            }

            {/* <div className="review-form">
                <form className="new-review-form" onSubmit={handleSubmitReview}>
                    <textarea name="review" value={newContent} onChange={(e) => setNewContent(e.target.value)}  placeholder="Add a review..." ></textarea>
                    <select onChange={handleRatingChange}>
                        <option value=''>Give This Movie a Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
            </div> */}
            <h4>Other Reviews for {title}</h4>
              {allReviews}  
        </div>
    )
}


export default MoviePage;