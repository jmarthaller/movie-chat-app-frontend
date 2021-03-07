import React from 'react';
import { Link } from 'react-router-dom';



function MoviesTile({ id, title, genre, runtime, tagline, release_year, image }) {


    return (
        <div>
            <h1>{title}</h1>
            <img style={{height: "200px"}} src={image} alt={id}></img>
            <h4>{genre}</h4>
            <h4>{release_year}</h4>
            <h4>Runtime: {runtime} minutes</h4>
            <h5>{tagline}</h5>
            <Link to={`/movies/${id}`}>
                Review Movie
            </Link>
        </div>
    )
}


export default MoviesTile;