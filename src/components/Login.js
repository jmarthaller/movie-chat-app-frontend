import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({username: "", password: ""});

  const  history = useHistory()


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    })
    const jsonify = await response.json()
    setCurrentUser(jsonify);
    history.push("/");  
  }
 
  
    return (
        <div >
          <form className="login" onSubmit={handleSubmit} autoComplete="off">

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <br></br>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <br></br>
            <input className="login-btn" type="submit" value="LOGIN" />
          </form>
          <div className="login-credentials">
            <p>
              To play without creating an account, use the following credentials
              to log in:
            </p>
            <p>Username: markansas</p>  
            <p>Password: 123</p>
          </div>
        </div>
      );
}


export default Login;