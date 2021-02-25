import React from 'react';
import UserReviews from './UserReviews';



function UserProfile({ currentUser }) {
    console.log(currentUser)

    

    return (
        <div>
            <h1>Welcome {currentUser.username}</h1>
            <UserReviews />
        </div>
    );
}

export default UserProfile;