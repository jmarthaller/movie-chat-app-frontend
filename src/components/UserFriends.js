import React from 'react';
import { Link } from 'react-router-dom';



function UserFriends({ followeeName, followeeAvatar, followeeId }) {


    return (
        <div className="other-user-avatar">
            <Link to={`/users/${followeeId}`}>
                <img src={followeeAvatar} alt={followeeName}></img>
            </Link>
        </div>
    )
}

export default UserFriends;