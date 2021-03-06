import React from 'react';
import MoviesTile from './MoviesTile';

function MoviesContainer({  updatedMoviesForGenre, selectedGenre, selectedRuntime, updatedMoviesForTime, search, setSearch }) {

        if (!selectedRuntime || selectedRuntime === 'beef') {

            const filteredByGenre = updatedMoviesForGenre.filter((movie) => {
                return movie.genre.includes(selectedGenre)
            })
        
            const allMoviesForGenre = filteredByGenre.map((movie) => {
                return <MoviesTile 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                runtime={movie.runtime}
                image={movie.image}
                genre={movie.genre}
                tagline={movie.tagline}
                rating={movie.rating}
                releaseYear={movie.release_year}
                overview={movie.overview}
                reviews={movie.reviews}
                setSearch={setSearch}
                />
            })

        return (
            <div>
                <h4 className="movies-container-header">POPULAR FILMS THIS WEEK</h4>
                <hr className="movies-container-hr" />
                <div className="movies-container">
                    {allMoviesForGenre}
                </div>
            </div>
        )
    
    } else if (selectedRuntime) {

        const filteredByRuntime = updatedMoviesForTime.filter((movie) => {
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
    
        const allMoviesForRuntime = filteredByRuntime.map((movie) => {
            return <MoviesTile 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            runtime={movie.runtime}
            image={movie.image}
            genre={movie.genre}
            tagline={movie.tagline}
            rating={movie.rating}
            release_year={movie.release_year}
            overview={movie.overview}
            reviews={movie.reviews}
            setSearch={setSearch}
            />
        })

        return (
            <div>
                <h4 className="movies-container-header">POPULAR FILMS THIS WEEK</h4>
                <hr className="movies-container-hr" />
                <div className="movies-container">
                    {allMoviesForRuntime}
                </div>
            </div>
        )
    }

}


export default MoviesContainer;