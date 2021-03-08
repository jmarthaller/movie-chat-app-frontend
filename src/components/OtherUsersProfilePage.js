import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

function OtherUsersProfilePage({ onDeleteFriendship }) {
    const [userToDisplay, setUserToDisplay] = useState(null)
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const { id } = useParams();

    const  history = useHistory()

    function handleUnfollowOtherUser() {
        fetch(`http://localhost:3001/friendships/${userToDisplay.following_users[0].id}`, {
        method: "DELETE", 
        headers: {
        "Content-Type": "application/json",
      },
    })
        history.push("/profile");
        onDeleteFriendship(userToDisplay.following_users[0].id)
    }
    
    useEffect(() => {
        fetch(`http://localhost:3001/users/${id}`)
          .then((r) => r.json())
          .then((user) => {
            setUserToDisplay(user);
            setIsUserLoaded(true);
          });
      }, [id]);

      if (!isUserLoaded) return <h2>Loading...</h2>;

      const { username, avatar } = userToDisplay;


      const allOtherUserReviews = userToDisplay.reviews.map((review) => {
        return (
            <div  key={review.id} className="user-reviews">
                <hr className="profile-hr" />
                <img  src={review.movie_image} alt="author-logo" ></img>
                <div className="movie-review-details">
                <h2>{review.movie_title}</h2>
                <h4>{review.content}</h4>
                <h4> User Rating: {review.personal_rating}</h4>
                </div>
            </div>
        )
    })

    return (
        <div>
            <img className="other-profile-pic" src={avatar} alt="profile-logo"></img>
            <h1 className="other-profile-username">{username}</h1>
            <button className='following-btn' onClick={handleUnfollowOtherUser}>UNFOLLOW</button>
            <div className="alt-user-reviews-container">
                <h2 className="user-reviews-header">{username}'s Reviews</h2>
                {allOtherUserReviews}
            </div>
        </div>
    )
}



export default OtherUsersProfilePage;