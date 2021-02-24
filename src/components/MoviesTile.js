import React from 'react';



function MoviesTile({ id, title, genre, runtime, tagline, rating, releaseYear, overview, image, reviews }) {
    return (
        <div>
            <h1>{title}</h1>
            <img style={{height: "200px"}} src={image} alt={title}></img>
            <h4>{genre}</h4>
            <h4>{releaseYear}</h4>
            <h4>Runtime: {Math.floor(runtime / 60)} hours</h4>
            <h5>{tagline}</h5>
        </div>
    )
}


export default MoviesTile;