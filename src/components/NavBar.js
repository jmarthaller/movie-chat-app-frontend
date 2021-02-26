
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function NavBar({ currentUser, resetCurrentUser }) {

    const history = useHistory();

    function handleLogout() {
      resetCurrentUser(null)
      history.push("/");
    }

    return (
        <div>
          <img style={{height: "100px"}} src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Potat2.png" alt="pp logo"></img>
          <h1>Putrid Potatoes</h1>
          

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        {currentUser ? (
        <>
        <NavLink to="/movies" className="nav-link">
            Browse All Movies
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
          <button className="logout" onClick={handleLogout}>Log Out</button>
        </>
        ) : (
        <>
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
          <NavLink to="/login" className="nav-link">
          Login
          </NavLink>
        </>
           )
         }
          
        </div>
      );
}

export default NavBar;