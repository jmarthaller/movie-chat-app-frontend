import React from 'react';



function UserFriends({ id, followeeName, followeeAvatar }) {


    return (
        <div style={{border: "1px solid black"}} className="user-friends">
            
            <h4>{followeeName}</h4>
            <img style={{height: "50px"}} src={followeeAvatar} alt={followeeName}></img>
        </div>
    )
}



export default UserFriends;