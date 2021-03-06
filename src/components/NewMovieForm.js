import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function NewMovieForm({ onAddMovieToList }) {
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newMovieRuntime, setNewMovieRuntime] = useState("")
    const [newMovieImage, setNewMovieImage] = useState("")
    const [newMovieGenre, setNewMovieGenre] = useState("")
    const [newMovieReleaseYear, setNewMovieReleaseYear] = useState("")
    const [newMovieTagline, setNewMovieTagline] = useState("")
    const [newMovieOverview, setNewMovieOverview] = useState("")


    const  history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        const newMovieToPost = {
            title: newMovieTitle,
            genre: newMovieGenre,
            runtime: newMovieRuntime,
            tagline: newMovieTagline,
            overview: newMovieOverview,
            release_year: newMovieReleaseYear,
            image: newMovieImage,
            rating: 1
        }

        const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/movies`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovieToPost)
        })
        const jsonify = await response.json()
        onAddMovieToList(jsonify)
        history.push(`/movies/${jsonify.id}`);
        e.target.reset()
    }


    return (    
        <div className='new-movie-form' >
            <h3>Don't See a Movie You Want to Review? Add it below!</h3>
            <form className='new-movie-form-input' onSubmit={handleSubmit}>


            <input className='new-movie-form-input' type="text" id="title" value={newMovieTitle} placeholder="Title" onChange={(e) => setNewMovieTitle(e.target.value)} />
            <br></br>

            <select id="genre" value={newMovieGenre} onChange={(e) => setNewMovieGenre(e.target.value)}>
                <option value=''>Genre</option>
                <option value="drama">Drama</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="adventure">Adventure</option>
                <option value="musical">Musical</option>
                <option value="romance">Romance</option>
                <option value="western">Western</option>
                <option value="documentary">Documentary</option>
                <option value="Animation">Animation</option>
                <option value="sciene-fiction">Sciene-Fiction</option>
                <option value="thriller">Thriller</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
            </select>
            <br></br>

            <input type="text" id="image" value={newMovieImage} placeholder="Poster Image" onChange={(e) => setNewMovieImage(e.target.value)}/>
            <br></br>

            <input type="text" id="runtime" value={newMovieRuntime} placeholder="Runtime (in minutes)" onChange={(e) => setNewMovieRuntime(e.target.value)}/>
            <br></br>

            <input type="text" id="text" value={newMovieReleaseYear} placeholder="Release Year" onChange={(e) => setNewMovieReleaseYear(e.target.value)}/>
            <br></br>

            <input type="text" id="tagline" value={newMovieTagline} placeholder="Tagline" onChange={(e) => setNewMovieTagline(e.target.value)}/>
            <br></br>

            <input type="text" id="overview" value={newMovieOverview} placeholder="Overview" onChange={(e) => setNewMovieOverview(e.target.value)}/>
            <br></br>
            <input className="submit-new-movie-btn" type="submit" value="Submit New Movie" />
        </form>
        <img className="add-movie-pic" src="https://media4.giphy.com/media/42wQXwITfQbDGKqUP7/200.gif" alt="=giffie"/>
    </div>
    )
}


export default NewMovieForm;