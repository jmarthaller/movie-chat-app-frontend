import React from 'react';
import MoviesTile from './MoviesTile';



function MoviesContainer({  moviesState }) {



    const allMovies = moviesState.map((movie) => {
        return <MoviesTile 
        key={movie.id}
        title={movie.title}
        runtime={movie.runtime}
        image={movie.image}
        genre={movie.genre}
        tagline={movie.tagline}
        rating={movie.rating}
        releaseYear={movie.release_year}
        overview={movie.overview}
        reviews={movie.reviews}
        />
    })

    return (
        <div>
            <h1>Popular Films This Week</h1>
            {allMovies}
        </div>
    )
}


export default MoviesContainer;