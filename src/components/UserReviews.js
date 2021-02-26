import React, { useState } from 'react';


function UserReviews({ author, authorImage, movieTitle, movieImage, content }) {
    const [canEditReview, setCanEditReview] = useState(false)
    const [canDeleteReview, setCanDeleteReview] = useState(false)
    const [updatedContent, setUpdatedContent] = useState('')


    function toggleEditReview() {
        setCanEditReview(!canEditReview)
    }

    function toggleDeleteReview() {
        setCanDeleteReview(!canDeleteReview)
    }

    function handleContentChange(event) {
        setUpdatedContent(event.target.value);
      }


    function handleUpdateReview(e) {
        e.preventDefault()
    //   resetCurrentUser(null)
    //   history.push("/login");
        const formData = {
            updatedContent
        }
        console.log(formData.updatedContent)
    //     fetch(`http://localhost:3001/users/1`, {
    //   method: "PATCH", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({formData}),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    }

    function handleDeleteReview(e) {
        e.preventDefault()
        console.log('hi from the delete review')
    }

    
    return (
        <div style={{border: "1px solid black"}} className="user-reviews">
            <h2>{movieTitle}</h2>
            <img style={{height: "50px"}} src={movieImage} alt={movieTitle}></img>
            <h4>{content}</h4>
            <button onClick={toggleEditReview}>{canEditReview ? "Nevermind" : "Edit Review"}</button>
            {canEditReview ?
            <div>
            <form onSubmit={handleUpdateReview}>
                <label>
                Edit Your Review
                    <input type="text" name="content" value={updatedContent} onChange={handleContentChange} />
                </label>
                
                <input type="submit" value="Submit" />
            </form>
            </div>
            :
            null
            }
            <button onClick={toggleDeleteReview}>{canDeleteReview ? "I would Never!" : "Delete Review"}</button>
            {canDeleteReview ?
            <div>
                <h2>Are you SURE you want to delete your review?</h2>
                <button onSubmit={e => handleDeleteReview(e)}>Yes, Delete</button>
            </div>
            :
            null
            }
        </div>
    )
}



export default UserReviews;