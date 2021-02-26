import React, { useState, Form } from 'react';
import { useHistory } from "react-router-dom";


function MoviesTileReviews({ currentUser, id, title, genre, runtime, tagline, rating, releaseYear, overview, image, reviews, onAddReview }) {
    const [newContent, setNewContent] = useState("")

    function handleSubmitReview(e) {
        e.preventDefault();

        const newReview = {
            user_id: currentUser.id,
            movie_id: id,
            personal_rating: 1,
            newContent
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
            console.log(data)
            onAddReview(data)
        })
    }


    const allReviews = reviews.map((review) => {
        return (
            <div className="movie-reviews">
                <h3>Review By: {review.author}</h3>
                <p>{review.content}</p>
                <img style={{height: "25px"}} src={review.authorImage} alt="author-logo" ></img>
            </div>
        )
    })

    return (
        <div>
            <h1>{title}</h1>
            <img style={{height: "400px"}} src={image} alt={id}></img>
            <h3>{genre}</h3>
            <h3>{releaseYear}</h3>
            <h3>Runtime: {runtime} minutes</h3>
            <h4>{tagline}</h4>
            <form onSubmit={handleSubmitReview}>
                <textarea name="review"  placeholder="Add a review..." ></textarea>
                <input type="submit" value="Submit" />
            </form>
            <h4>Other Reviews for {title}</h4>
            {allReviews}  
        </div>
    )
}


export default MoviesTileReviews;