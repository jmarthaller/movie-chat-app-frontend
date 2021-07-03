import React, { useState } from 'react';


function UserReviews({ id, author, authorImage, movieTitle, movieImage, content, onUpdateReview, onDeleteReview, personalRating, canEditAccount}) {
    const [canEditReview, setCanEditReview] = useState(false)
    const [canDeleteReview, setCanDeleteReview] = useState(false)
    const [updatedContent, setUpdatedContent] = useState('')
    const [updatedRating, setUpdatedRating] = useState(null)


    function toggleEditReview() {
        setCanEditReview(!canEditReview)
    }


    function toggleDeleteReview() {
        setCanDeleteReview(!canDeleteReview)
    }


    function handleContentChange(event) {
        setUpdatedContent(event.target.value);
    }


    function handleUpdateRating(event) {
        setUpdatedRating(event.target.value)
    }


    async function handleUpdateReview(e) {
        e.preventDefault()
        
        const formData = {
            content: updatedContent,
            personal_rating: updatedRating
        }

        const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/reviews/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"content": formData.content, personal_rating: parseInt(formData.personal_rating)}),
        })
        const jsonify = await response.json()
        onUpdateReview(jsonify, formData)
        setUpdatedContent("")
        setCanEditReview()
    }


    function handleDeleteReview() {
        fetch(`${process.env.REACT_APP_RAILS_URL}/reviews/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      })
        onDeleteReview(id)
    }

    return (
        <div className="user-reviews">
            <hr className="profile-hr" />
            <img src={movieImage} alt={movieTitle}></img>
            <div className="movie-review-details">
            <h2>{movieTitle}</h2>
            <h4>{content}</h4>
            <h4>Your rating: {personalRating}</h4>
            { canEditReview || canEditAccount ? <button className="edit-review-button" style={{zIndex: "-1"}} onClick={toggleEditReview}>EDIT REVIEW</button> : <button className="edit-review-button" onClick={toggleEditReview}>EDIT REVIEW</button>}
            { canEditReview ?
          
            <div className="review-modal-content">
                <div className="review-modal-header">
                    <span className="review-close" onClick={toggleEditReview}>&times;</span>
                    <h2>Edit Your Review for {movieTitle}</h2>
                </div>    
                <div className="review-modal-body">
                    <form onSubmit={handleUpdateReview}>
                        <textarea 
                            className="edit-review-text" 
                            type="text" 
                            name="content" 
                            value={updatedContent} 
                            onChange={handleContentChange}>
                        </textarea>
                        <br></br>
                        <select className="edit-star-rating" onChange={handleUpdateRating}>
                            <option value=''>Update Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <br></br>
                        <input type="submit" value="Submit" className="submit-edit-review-btn" />
                    </form>
                    <hr className="profile-hr"></hr>
                    <button className="delete-review-button" onClick={toggleDeleteReview}>DELETE REVIEW</button>
                    { canDeleteReview 
                        ?
                            <div className="confirm-delete-review-container">
                                <h2>Are you SURE you want to delete this review?</h2>
                                <button className="delete-review-button" onClick={handleDeleteReview}>Yes, Delete</button>
                            </div>
                        :   null 
                    }
                </div>  
            </div>
            : null
            }
            </div>
        </div>
    )
}


export default UserReviews;