import React from 'react';
import { Link } from 'react-router-dom';



function MoviesTile({ id, title, genre, runtime, tagline, release_year, image, setSearch }) {
    function handleResetSearch() {
        setSearch("")
    }

    return (
        <div className="movie-tile">
            <h1>{title}</h1>
            <img style={{height: "200px"}} src={image} alt={id}></img>
            {/* <h4>{genre}</h4> */}
            <h4>{release_year}</h4>
            {/* <h4>Runtime: {runtime} minutes</h4> */}
            <h5>{tagline}</h5>
            <Link onClick={handleResetSearch} to={`/movies/${id}`}>
                Review {title}
            </Link>
        </div>
    )
}


export default MoviesTile;