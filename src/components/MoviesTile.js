import React from 'react';
import { Link } from 'react-router-dom';



function MoviesTile({ id, title, genre, runtime, tagline, release_year, image, setSearch }) {
    function handleResetSearch() {
        setSearch("")
    }

    return (
            <Link style={{textDecoration: "none"}} onClick={handleResetSearch} to={`/movies/${id}`}>
                <div style={{backgroundImage: `url(${image})`}} className="movie-tile">
                    <h1 style={{visibility: "hidden"}}>{title}</h1>
                </div>
            </Link>
    )
}


export default MoviesTile;