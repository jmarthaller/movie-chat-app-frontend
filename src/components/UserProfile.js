import React, { useState } from 'react';
import UserReviews from './UserReviews';
import UserFriends from './UserFriends'
import { useHistory } from 'react-router-dom';




function UserProfile({ currentUser, setCurrentUser, reviews, setReviews, onUpdateReview, onDeleteReview, onUpdateUserInfo, friendshipsState }) {
    const [canEditAccount, setCanEditAccount] = useState(false)
    const [canDeleteAccount, setCanDeleteAccount] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')


    const  history = useHistory()


    function toggleEditProfile() {
        setCanEditAccount(!canEditAccount)
    }


    function toggleDeleteProfile() {
        setCanDeleteAccount(!canDeleteAccount)
    }


    const reviewsByCurrentUser = reviews.filter((review) => {
        return review.user_id === currentUser.id
    })


    const allUserFriends = friendshipsState.map((relationship) => {
        return <UserFriends
        key={relationship.id}
        id={relationship.id}
        followeeName={relationship.followee_username}
        followeeId={relationship.followee_id}
        followeeAvatar={relationship.followee_avatar}
        />
    })



    const allReviews = reviewsByCurrentUser.map((review) => {
        return <UserReviews 
        key={review.id}
        id={review.id}
        author={review.author}
        authorImage={review.author_image}
        movieTitle={review.movie_title}
        movieImage={review.movie_image}
        personalRating={review.personal_rating}
        content={review.content}
        onUpdateReview={onUpdateReview}
        onDeleteReview={onDeleteReview}
        />
    })


    function handleNameChange(event) {
        setUsername(event.target.value);
    }
    

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    function handleAvatarChange(event) {
        setAvatar(event.target.value);
    }


    function handleUpdateAccount(e) {
        e.preventDefault()

        const formData = {
            username,
            avatar,
            password
        }

        fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            onUpdateUserInfo(data)
            history.push("/profile");
      })
      setAvatar("")
      setUsername("")
      setPassword("")
      toggleEditProfile()
    }


    function handleDeleteAccount() {
        fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "DELETE", 
        headers: {
        "Content-Type": "application/json",
        },
        })
        setCurrentUser(null)
        history.push("/");
    }
 


    return (
        <div>
            <img className="profile-pic" src={currentUser.avatar} alt="profile-logo"></img>
            <h1 className="profile-username">{currentUser.username}</h1>
            <button className="edit-account-button" onClick={toggleEditProfile}>EDIT PROFILE</button>
            {canEditAccount ?

            <div className="profile-modal-content">
                <div className="profile-modal-header">
                    <span className="profile-close" onClick={toggleEditProfile}>&times;</span>
                    <h2>Edit Your Profile</h2>
                </div>    
                <div className="profile-modal-body">
                        <form onSubmit={handleUpdateAccount}>
                            <input type="text" name="username" value={username} placeholder='New Username...' onChange={handleNameChange} />
                            <br></br>
                             <input type="password" name="password" value={password} placeholder='New Password...' onChange={handlePasswordChange} />
                             <br></br>
                            <input type="text" name="avatar" value={avatar} placeholder='New Avatar...' onChange={handleAvatarChange} />
                             <br></br>
                             <input className="edit-profile-submit" type="submit" value="Submit" />
                         </form>
                         <button className="delete-profile-submit" onClick={toggleDeleteProfile}>{canDeleteAccount ? "I would Never!" : "Delete Account"}</button>
                         {canDeleteAccount ?
                        <div className="confirm-delete">
                            <h2>Are you SURE you want to delete your account???</h2>
                            <button  onClick={handleDeleteAccount}>Yes, I'd like to be banished to the shadow realm</button>
                        </div>
                        :
                        null
                        }
                </div>  
            </div>
            :
            null
            }
            <div className="user-friends-container">
                {friendshipsState.length === 0 ? <h2 className="user-friends-header"> You're Not Following Anyone Yet! </h2> : <h2 className="user-friends-header">Following ({allUserFriends.length})</h2>}
                <hr className="profile-hr" />
                {allUserFriends}
            </div>
            <h1>Your Reviews</h1>
            {allReviews}
        </div>
    );  
}

export default UserProfile;