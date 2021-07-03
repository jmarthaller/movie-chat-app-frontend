import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import emailjs from 'emailjs-com';


function MoviePage({ currentUser, onAddReview, reviews, onAddNewFollow, setReviews }) {
    const [newContent, setNewContent] = useState("")
    const [newRating, setNewRating] = useState(null)
    const [movieToDisplay, setMovieToDisplay] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [movieReviews, setMovieReviews] = useState(null)
    const [canLeaveReview, setCanLeaveReview] = useState(false)


    function handleCanLeaveReview() {
        setCanLeaveReview(!canLeaveReview)
    }

    const { id } = useParams();

    const  history = useHistory()


    function handleRatingChange(e) {
        setNewRating(e.target.value)
    }


    async function handleLike(reviewObj){
        const updateObj = {
            likes: reviewObj.likes + 1
        };
          const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/reviews/${reviewObj.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
          })
            const jsonify = await response.json()
            setMovieReviews(movieReviews.map((review) => {
                if (review.id === jsonify.id) {
                    return jsonify;
                } 
                return review
            }))
    }
    



    useEffect(() => {
        const fetchMovieById = async () => {
            const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/movies/${id}`)
            const jsonify = await response.json()
            setMovieToDisplay(jsonify);
            setMovieReviews(jsonify.reviews)
            setIsLoaded(true);
        }
        fetchMovieById();
      }, [id]);

      

    if (!isLoaded) return <h2>Loading...</h2>;


    const { title, image, genre, runtime, tagline, release_year, overview } = movieToDisplay;

    async function handleSubmitReview(e) {
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

        const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/reviews`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
        const jsonify = await response.json();
        onAddReview(jsonify);
        history.push("/profile");
        e.target.reset()
    }


    async function handleFollowOtherUser(userToFollow) {
        const templateParams = {
            followerName: currentUser.username,
            followeeName: userToFollow.username
        }
        const newFollowerRelationship = {
            follower_id: currentUser.id,
            followee_id: userToFollow.id,
            followee_username: userToFollow.username,
            followee_avatar: userToFollow.avatar
        }
        const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/friendships`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFollowerRelationship)
        })
        const jsonify = await response.json();
        onAddNewFollow(jsonify)
        history.push("/profile");
        emailjs.send('service_6z0h5kv', 'template_bpoyfaf', templateParams, 'user_OgPNXecgtK66tUJbljrqL')         
    }
    

    
    const allReviews = movieReviews.map((review) => {
        return (
            <div key={review.id} className="all-movie-reviews">
                <hr className="profile-hr" />
                <img className="movie-page-author-image" src={review.author_image} alt="author-logo" ></img>
                <div className="all-movie-review-details">
                    <h3>Review By: <span>{review.author}</span></h3>
                    {canLeaveReview 
                    ? 
                        <button style={{zIndex: "-1"}} className="follow-button" onClick={(e) => handleFollowOtherUser(review.author_object)}>Follow User</button> 
                    :  
                        <button className="follow-button" onClick={(e) => handleFollowOtherUser(review.author_object)}>Follow User</button>} 
                    <h5>{review.content}</h5>
                    <button onClick={(e) => handleLike(review)} className="like-button">❤️ Like Review</button>
                    <p className="num-likes">{review.likes} likes</p>
                </div>
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
                    <h2>Leave A Review</h2>
                </div>    
                <div className="modal-body">
                        <form className="new-review-form" onSubmit={handleSubmitReview}>
                            <textarea className="review-text" name="review" value={newContent} onChange={(e) => setNewContent(e.target.value)}  placeholder="..." ></textarea>
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
            <div> 
                <h4 className="movie-show-review-header">POPULAR REVIEWS</h4>

            </div>
              {allReviews}  
        </div>
    )
}


export default MoviePage;