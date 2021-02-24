
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function NavBar() {

    const history = useHistory();

  

    return (
        <div>
            <h1>Hello from Navbar</h1>
        </div>
      );
}

export default NavBar;